from ortools.constraint_solver import routing_enums_pb2
from ortools.constraint_solver import pywrapcp

def solve_vrp(distance_matrix, time_matrix, demands, num_vehicles, vehicle_capacities, is_mall_list, time_windows):
    """
    Mesin AI VRP dengan Kapasitas, Jendela Waktu, dan SMART BALANCING.
    """
    data = {}
    data['distance_matrix'] = distance_matrix
    data['time_matrix'] = time_matrix 
    data['demands'] = demands
    data['vehicle_capacities'] = vehicle_capacities
    data['num_vehicles'] = num_vehicles
    data['time_windows'] = time_windows 
    data['depot'] = 0 
    
    manager = pywrapcp.RoutingIndexManager(len(data['distance_matrix']), data['num_vehicles'], data['depot'])
    routing = pywrapcp.RoutingModel(manager)

    # 1. OBJEKTIF UTAMA: JARAK (Ini harus diutamakan!)
    def distance_callback(from_index, to_index):
        from_node = manager.IndexToNode(from_index)
        to_node = manager.IndexToNode(to_index)
        return data['distance_matrix'][from_node][to_node]

    transit_callback_index = routing.RegisterTransitCallback(distance_callback)
    routing.SetArcCostEvaluatorOfAllVehicles(transit_callback_index)

    # Dimensi Jarak (Buat Hukuman Balancing)
    dimension_name = 'Distance'
    routing.AddDimension(
        transit_callback_index,
        0, 
        300000, 
        True, 
        dimension_name)
    distance_dimension = routing.GetDimensionOrDie(dimension_name)
    
    # 🌟 OBAT NYA DISINI: Denda dikurangin drastis dari 100 ke 10. Biar AI tetep nyari jarak terdekat, tapi ngga 1 truk doang yang borongan.
    distance_dimension.SetGlobalSpanCostCoefficient(10) 

    # 2. KAPASITAS MUATAN
    def demand_callback(from_index):
        from_node = manager.IndexToNode(from_index)
        return data['demands'][from_node]

    demand_callback_index = routing.RegisterUnaryTransitCallback(demand_callback)
    routing.AddDimensionWithVehicleCapacity(
        demand_callback_index, 
        0,  
        data['vehicle_capacities'], 
        True, 
        'Capacity'
    )
    # Hukuman Muatan juga dikecilin
    capacity_dimension = routing.GetDimensionOrDie('Capacity')
    capacity_dimension.SetGlobalSpanCostCoefficient(5) 

    # 3. WAKTU & JAM BUKA TOKO
    def time_callback(from_index, to_index):
        from_node = manager.IndexToNode(from_index)
        to_node = manager.IndexToNode(to_index)
        travel_time = data['time_matrix'][from_node][to_node]
        if to_node == 0: return int(travel_time)
        qty = data['demands'][to_node]
        tambahan_waktu_qty = qty / 10.0
        if is_mall_list[to_node]: service_time = 60 + tambahan_waktu_qty
        else: service_time = 15 + tambahan_waktu_qty
        return int(travel_time + service_time)

    time_callback_index = routing.RegisterTransitCallback(time_callback)
    
    routing.AddDimension(
        time_callback_index,
        60,  
        1200, 
        False, 
        'Time'
    )
    time_dimension = routing.GetDimensionOrDie('Time')

    for location_idx, time_window in enumerate(data['time_windows']):
        if location_idx == data['depot']: continue
        index = manager.NodeToIndex(location_idx)
        time_dimension.CumulVar(index).SetRange(time_window[0], time_window[1])

    for vehicle_id in range(data['num_vehicles']):
        index = routing.Start(vehicle_id)
        time_dimension.CumulVar(index).SetRange(data['time_windows'][0][0], data['time_windows'][0][1])
        index = routing.End(vehicle_id)
        time_dimension.CumulVar(index).SetRange(data['time_windows'][0][0], data['time_windows'][0][1])

    for i in range(data['num_vehicles']):
        routing.AddVariableMinimizedByFinalizer(time_dimension.CumulVar(routing.Start(i)))
        routing.AddVariableMinimizedByFinalizer(time_dimension.CumulVar(routing.End(i)))

    # 🌟 NEW: DENDA BIAYA TRUK (Vehicle Fixed Cost)
    # Kalau AI memutuskan truk ini KELUAR dari gudang (bukan jarak 0), dia kena denda gede!
    # Jadi AI males ngeluarin truk banyak-banyak kalau ngga kepaksa (menghindari 5 truk keluar buat 21 toko).
    for i in range(data['num_vehicles']):
        routing.SetFixedCostOfVehicle(5000, i) # Denda 5000 unit biaya kalau truk dipake

    penalty = 100000 
    for node in range(1, len(data['distance_matrix'])):
        routing.AddDisjunction([manager.NodeToIndex(node)], penalty)

    search_parameters = pywrapcp.DefaultRoutingSearchParameters()
    search_parameters.first_solution_strategy = (routing_enums_pb2.FirstSolutionStrategy.PATH_CHEAPEST_ARC)
    search_parameters.local_search_metaheuristic = (routing_enums_pb2.LocalSearchMetaheuristic.GUIDED_LOCAL_SEARCH)
    search_parameters.time_limit.seconds = 60

    print("OR-Tools: Memulai kalkulasi VRP Smart Balancing...")
    solution = routing.SolveWithParameters(search_parameters)

    if solution:
        results = {'routes': [], 'dropped_nodes': []}
        for vehicle_id in range(data['num_vehicles']):
            index = routing.Start(vehicle_id)
            route = []
            while not routing.IsEnd(index):
                node_index = manager.IndexToNode(index)
                route.append(node_index)
                index = solution.Value(routing.NextVar(index))
            route.append(manager.IndexToNode(index))
            results['routes'].append(route)
        for node in range(1, len(data['distance_matrix'])):
            if solution.Value(routing.NextVar(manager.NodeToIndex(node))) == manager.NodeToIndex(node):
                results['dropped_nodes'].append(node)
        return results
    else:
        print("OR-Tools: GAGAL MENEMUKAN SOLUSI!")
        return None