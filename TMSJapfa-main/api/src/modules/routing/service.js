const supabase = require('../../config/supabase');
const axios = require('axios');

/**
 * Vehicle Routing Problem with Time Windows (VRPTW) Service
 * Supports Google Maps (Paid) or OpenRouteService/OSRM (Free Alternatives)
 */
class VRPService {
    constructor() {
        this.googleMapsApiKey = process.env.GOOGLE_MAPS_API_KEY;
        this.orsApiKey = process.env.ORS_API_KEY;
        this.routingMode = process.env.ROUTING_MODE || 'ors';
        this.warehouseLocation = { lat: -6.1928, lng: 106.8189, name: 'Main Warehouse' }; // Jakarta default
    }

    /**
     * Main entry point to optimize routes for a specific day
     */
    async optimizeDailyRoutes(date, region) {
        try {
            console.log(`🚀 Starting VRP Optimization for ${date} in ${region}...`);

            const unassignedOrders = await this.getUnassignedOrders(date, region);
            const availableTrucks = await this.getAvailableTrucks(region);

            if (unassignedOrders.length === 0 || availableTrucks.length === 0) {
                return { status: 'skipped', message: 'No orders or trucks available.' };
            }

            // 1. Fetch Distances/Durations (Optional for now, using Euclidean for logic verification if API not set)
            // In production, we'd call this.fetchDistanceMatrix(locations)

            // 2. Run VRPTW Algorithm (Greedy Heuristic)
            const optimizedTrips = this.solveVRPTW(unassignedOrders, availableTrucks);

            // 3. Save to Supabase (Creating Trips and TripStops)
            const results = await this.saveOptimizedTrips(optimizedTrips, date);

            return { status: 'success', tripsCount: results.length, data: results };
        } catch (error) {
            console.error('VRP Logic Error:', error);
            throw error;
        }
    }

    /**
     * Greedy VRPTW Solver
     */
    solveVRPTW(orders, trucks) {
        let unassigned = [...orders];
        let finalizedTrips = [];

        for (const truck of trucks) {
            if (unassigned.length === 0) break;

            let trip = {
                truck_id: truck.id,
                driver_id: truck.driver_id,
                stops: [],
                total_weight: 0
            };

            while (unassigned.length > 0) {
                let bestIdx = -1;
                let minDist = Infinity;

                const lastPos = trip.stops.length === 0
                    ? this.warehouseLocation
                    : { lat: trip.stops[trip.stops.length - 1].latitude, lng: trip.stops[trip.stops.length - 1].longitude };

                for (let i = 0; i < unassigned.length; i++) {
                    const order = unassigned[i];
                    if (trip.total_weight + (order.total_kg || 0) > (truck.max_capacity_kg || 10000)) continue;

                    const d = Math.sqrt(Math.pow(order.latitude - lastPos.lat, 2) + Math.pow(order.longitude - lastPos.lng, 2));
                    if (d < minDist) {
                        minDist = d;
                        bestIdx = i;
                    }
                }

                if (bestIdx === -1) break; // Truck full

                const winner = unassigned.splice(bestIdx, 1)[0];
                trip.stops.push(winner);
                trip.total_weight += (winner.total_kg || 0);
            }

            if (trip.stops.length > 0) {
                finalizedTrips.push(trip);
            }
        }
        return finalizedTrips;
    }

    /**
     * Database Operations
     */
    async getUnassignedOrders(date, region) {
        const { data, error } = await supabase
            .from('sales_orders')
            .select(`
                *,
                customer:customers(location)
            `)
            .eq('status', 'PENDING')
            .eq('delivery_date', date);

        if (error) throw error;

        return (data || []).map(o => {
            const loc = o.customer?.location;
            // Handle PostGIS geography type (point)
            let lat = -6.2000;
            let lng = 106.8166;

            if (loc) {
                // If Supabase returns point as {lat, lng} or similar
                lat = loc.lat || lat;
                lng = loc.lng || lng;
            }

            return {
                ...o,
                latitude: lat,
                longitude: lng
            };
        });
    }

    async getAvailableTrucks(region) {
        const { data, error } = await supabase
            .from('trucks')
            .select('*')
            .eq('status', 'AVAILABLE'); // Filter by status 'AVAILABLE' (master status should be handled)

        if (error) throw error;
        return data || [];
    }

    async saveOptimizedTrips(trips, date) {
        const savedTrips = [];
        for (const t of trips) {
            const { data: trip, error } = await supabase
                .from('trips')
                .insert({
                    truck_id: t.truck_id,
                    driver_id: t.driver_id,
                    status: 'SCHEDULED',
                    scheduled_start: date
                })
                .select()
                .single();

            if (trip) {
                const stops = t.stops.map((s, idx) => ({
                    trip_id: trip.id,
                    so_id: s.id, // Fixed: use so_id as per schema
                    stop_order: idx + 1,
                    status: 'PENDING',
                    target_arrival_time: new Date(new Date(date).setHours(8 + idx, 0, 0)) // Placeholder ETA
                }));

                await supabase.from('trip_stops').insert(stops);

                // Update Sales Order Status
                await supabase.from('sales_orders')
                    .update({ status: 'PROCESSED' })
                    .in('id', t.stops.map(s => s.id));

                savedTrips.push(trip);
            }
        }
        return savedTrips;
    }

    async getTripsByDate(date) {
        const { data, error } = await supabase
            .from('trips')
            .select(`
                *,
                truck:trucks(*),
                driver:profiles(*),
                stops:trip_stops(
                    *,
                    order:sales_orders(
                        *,
                        customer:customers(*)
                    )
                )
            `)
            .eq('scheduled_start', date);

        if (error) throw error;
        return data || [];
    }
}

module.exports = new VRPService();
