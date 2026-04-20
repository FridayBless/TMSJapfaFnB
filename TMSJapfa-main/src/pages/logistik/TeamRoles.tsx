import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Member {
    id: number;
    name: string;
    email: string;
    role: string;
    status: 'Active' | 'Inactive';
    lastLogin: string;
    avatar: string;
}

const members: Member[] = [
    {
        id: 1,
        name: 'Alex Thompson',
        email: 'alex.t@japfalogix.com',
        role: 'Logistics Admin',
        status: 'Active',
        lastLogin: '2 mins ago',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDzBK1dj32GiR9dVI74_Jt3_gZ25myA61Mdr9ICIpMe_so3EJlxwSj1wg1SDZjJGl3oERSn2udSprfTxz7qEiu5Cs9ty1DnK138Cwl4OoeL9NJdhH882Lqs6CN9VR1_xlmYZ763QpPLFHJ6b9aeErS5BQR_E5XC70pwYIURGoCt36IWWPVDvQyFfHHUArfAd16E_-1nIqfGK63VGY35_DCF8KD9E-rP-BRi4Wbe1Ef--igNpLHxhB5tpNhrxi6xukI4OgMhYsTtQp8',
    },
    {
        id: 2,
        name: 'Sarah Jenkins',
        email: 's.jenkins@japfalogix.com',
        role: 'POD Admin',
        status: 'Active',
        lastLogin: 'Yesterday, 4:20 PM',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAUflcqMWXvJHd7uV7aHWjzjSEaW-Vo9xLTtZWmL6G4GSXcdXDPzZF3_eQ-xS0o8jOk2OKY9idN7UkU7f8OR2RyIKV9t0LgV3LMb9YwuKcvGp5QGTA3VxGW9pb6zAqpc_yIdnDKzs1mteLPLVrfG60GUlSrAYIDyebGGpEdxinDuAxnlmvw5vL-OGbwDJEoFdX40JXwE2Eu4aPdRnoDn2KqnVEDR73IuRvBDSlWLPdsGv2jQ0PHnistNsVYBQgbGS6mnas0kxZlCU8',
    },
    {
        id: 3,
        name: 'Marcus Vane',
        email: 'm.vane@japfalogix.com',
        role: 'Driver (Tier 1)',
        status: 'Inactive',
        lastLogin: '3 days ago',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAMwAHSiqJbN0qfk_cUudQboUcoEoCS--lH4nwHF99BF8FSDB2CWvtt6kFyqyss3jzpUfeLImsB8sGbI1YLpYN3vQE58Xwr13dqbvtfzJLzpRn_CNHgvsE90pIp-atvTjfT8EtdhQ2TamakwX26nWsTMGG0Dwt6IZeeNfGqRvzDTrJv2kD5957FAHZEBpijfOz7K76xn6OeSQ9131xjJqWmx4mMnq_bz-BqXaRT83JdyijiTghHdzZlUyFME',
    },
    {
        id: 4,
        name: 'David Chen',
        email: 'd.chen@japfalogix.com',
        role: 'Dispatcher',
        status: 'Active',
        lastLogin: '1 hour ago',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDtOelL6SnN4mx0F3pELrOqyhCIUl8BIPEt1cKnSpyr_CMo3Wp6XMu2CVD5j29k-SHjuE6S-ppL-BDHIy1gMxMYkj98-LZGpTlkYLl611HmNJPIElDXJ5SUdrzfJLUDfpgnBwyfUQOvKW_ntYxpUspQEWbY43qk2n9QYgXe24cqE3YfG6B7T9Tjw6FvxXCyOj9W8YdNB7jA8hBM9SGgX3Hvu_l88UHpAOXMcaElqV4ixY9JiMqLbm0-0t9h75bdjZTqzd3dBR9IB_E',
    },
];

export default function TeamRoles() {
    const navigate = useNavigate();
    const [openMenuId, setOpenMenuId] = useState<number | null>(null);

    return (
        <>
            {/* Header */}
            <header className="sticky top-0 z-10 bg-white dark:bg-[#111111] border-b border-slate-200 dark:border-[#333] px-4 md:px-8 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <h1 className="text-xl font-bold">Settings</h1>
                    <div className="h-4 w-px bg-slate-300 dark:bg-slate-700"></div>
                    <span className="text-sm font-medium text-slate-500">Team Roles</span>
                </div>
                <div className="flex items-center gap-6">
                    <div className="relative hidden md:block">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 text-xl">search</span>
                        <input className="pl-10 pr-4 py-2 bg-slate-100 dark:bg-[#1A1A1A] border-none rounded-lg text-sm focus:ring-2 focus:ring-primary w-64 outline-none" placeholder="Search members..." type="text" />
                    </div>
                    <button className="p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-[#1A1A1A] rounded-lg relative transition-colors">
                        <span className="material-symbols-outlined">notifications</span>
                        <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                    </button>
                    <div className="h-8 w-px bg-slate-200 dark:bg-slate-800"></div>
                    <div className="flex items-center gap-3">
                        <div className="text-right hidden sm:block">
                            <p className="text-xs font-bold">Alex Admin</p>
                            <p className="text-[10px] text-slate-500 dark:text-slate-400">Fleet Operations</p>
                        </div>
                        <img className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800 object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDJm3w9qzIOpWbkRQ7IwPeE7Y0osx-07ft_FirScRWyQVK6d7ex5JpefkWS6wg0kiUKuKhoTHYa-LewuqDlMB460iO-Lhp7i5NGcvSVlmILFyIJhhrURyp4mJJ0S7Q5lezKQa-ZdzM5MVlt1EfeJdm41FiRMyCoQv2wXlzobHx2HpkHkzqdRDr7cU-kXJBDnyOFg4mQ5jD6nFbjXnl1lH2BcobozPr8a4qiNlC9MAHAXrZPVe1m40_R71CCc-g4dHXS-8SR6vkLHdU" alt="user" />
                    </div>
                </div>
            </header>

            {/* Content Area */}
            <div className="p-4 md:p-8 md:p-10 space-y-8">
                {/* Sub-Tabs */}
                <div className="flex gap-8 border-b border-slate-200 dark:border-[#333]">
                    <button
                        onClick={() => navigate('/logistik/settings')}
                        className="pb-4 text-sm font-semibold text-slate-400 hover:text-on-surface transition-colors"
                    >
                        Delivery Zones
                    </button>
                    <button
                        onClick={() => navigate('/logistik/settings/cost-configuration')}
                        className="pb-4 text-sm font-semibold text-slate-400 hover:text-on-surface transition-colors"
                    >
                        Cost Configuration
                    </button>
                    <button className="pb-4 text-sm font-bold text-primary border-b-2 border-primary">
                        Team Roles
                    </button>
                </div>

                {/* Page Header */}
                <div className="flex items-end justify-between">
                    <div>
                        <h3 className="text-3xl md:text-4xl font-black tracking-tighter text-on-surface">Manage Team</h3>
                        <p className="text-slate-500 dark:text-slate-400 mt-1 max-w-lg text-sm">
                            Control access levels and manage permissions for all logistics personnel across the global supply chain.
                        </p>
                    </div>
                    <button className="flex items-center gap-2 bg-gradient-to-r from-[#994700] to-[#FF7A00] text-white px-6 py-3 rounded-lg font-bold text-sm tracking-tight shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all">
                        <span className="material-symbols-outlined">person_add</span>
                        Add Member
                    </button>
                </div>

                {/* Stats Bento */}
                <div className="grid grid-cols-12 gap-6">
                    <div className="col-span-12 md:col-span-4 bg-slate-50 dark:bg-[#1A1A1A] p-6 rounded-xl">
                        <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2">Total Personnel</p>
                        <div className="flex items-baseline gap-3">
                            <span className="text-4xl font-black text-on-surface">128</span>
                            <span className="text-xs font-bold text-blue-500 flex items-center gap-0.5">
                                <span className="material-symbols-outlined text-sm">trending_up</span>
                                +4 this month
                            </span>
                        </div>
                    </div>
                    <div className="col-span-12 md:col-span-4 bg-slate-50 dark:bg-[#1A1A1A] p-6 rounded-xl">
                        <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2">Active Drivers</p>
                        <div className="flex items-baseline gap-3">
                            <span className="text-4xl font-black text-on-surface">84</span>
                            <div className="w-24 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden self-center">
                                <div className="w-3/4 h-full bg-primary rounded-full"></div>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-12 md:col-span-4 bg-slate-50 dark:bg-[#1A1A1A] p-6 rounded-xl">
                        <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2">System Roles</p>
                        <div className="flex gap-1.5 mt-2">
                            {['LA', 'DR', 'PA'].map((label) => (
                                <span key={label} className="w-8 h-8 rounded-full bg-slate-300 dark:bg-slate-600 border-2 border-slate-50 dark:border-[#1A1A1A] flex items-center justify-center text-[10px] font-bold text-slate-700 dark:text-white">
                                    {label}
                                </span>
                            ))}
                            <span className="w-8 h-8 rounded-full bg-primary text-white border-2 border-slate-50 dark:border-[#1A1A1A] flex items-center justify-center text-[10px] font-bold">
                                +5
                            </span>
                        </div>
                    </div>
                </div>

                {/* Members Table */}
                <div className="bg-white dark:bg-[#111111] rounded-2xl overflow-hidden border border-slate-200 dark:border-[#333]">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse min-w-[640px]">
                            <thead className="bg-slate-50 dark:bg-[#0a0a0a] border-b border-slate-200 dark:border-[#333]">
                                <tr>
                                    <th className="px-8 py-5 text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-[0.2em]">Name</th>
                                    <th className="px-8 py-5 text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-[0.2em]">Role</th>
                                    <th className="px-8 py-5 text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-[0.2em]">Status</th>
                                    <th className="px-8 py-5 text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-[0.2em]">Last Login</th>
                                    <th className="px-8 py-5 text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-[0.2em] text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-[#222]">
                                {members.map((member, idx) => (
                                    <tr
                                        key={member.id}
                                        className={`hover:bg-slate-50/50 dark:hover:bg-white/5 transition-colors ${idx % 2 !== 0 ? 'bg-slate-50/30 dark:bg-white/[0.02]' : ''}`}
                                    >
                                        <td className="px-8 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-lg bg-slate-200 dark:bg-slate-700 overflow-hidden shrink-0">
                                                    <img className="w-full h-full object-cover" src={member.avatar} alt={member.name} />
                                                </div>
                                                <div>
                                                    <p className="font-bold text-on-surface">{member.name}</p>
                                                    <p className="text-xs text-slate-500 dark:text-slate-400">{member.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-4">
                                            <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">{member.role}</span>
                                        </td>
                                        <td className="px-8 py-4">
                                            {member.status === 'Active' ? (
                                                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 text-[10px] font-bold uppercase rounded-full tracking-wider">
                                                    Active
                                                </span>
                                            ) : (
                                                <span className="px-3 py-1 bg-red-100 dark:bg-red-500/10 text-red-700 dark:text-red-400 text-[10px] font-bold uppercase rounded-full tracking-wider">
                                                    Inactive
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-8 py-4 text-sm text-slate-500 dark:text-slate-400">
                                            {member.lastLogin}
                                        </td>
                                        <td className="px-8 py-4 text-right relative">
                                            <button
                                                onClick={() => setOpenMenuId(openMenuId === member.id ? null : member.id)}
                                                className="text-slate-400 hover:text-primary transition-colors p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-white/5"
                                            >
                                                <span className="material-symbols-outlined">more_horiz</span>
                                            </button>
                                            {openMenuId === member.id && (
                                                <div className="absolute right-8 top-full mt-1 bg-white dark:bg-[#1F1F1F] border border-slate-200 dark:border-[#333] rounded-xl shadow-xl z-20 w-44 overflow-hidden">
                                                    <button className="w-full flex items-center gap-2 px-4 py-3 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                                                        <span className="material-symbols-outlined text-sm">edit</span>
                                                        Edit Member
                                                    </button>
                                                    <button className="w-full flex items-center gap-2 px-4 py-3 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                                                        <span className="material-symbols-outlined text-sm">manage_accounts</span>
                                                        Change Role
                                                    </button>
                                                    <div className="border-t border-slate-100 dark:border-[#333]"></div>
                                                    <button className="w-full flex items-center gap-2 px-4 py-3 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors">
                                                        <span className="material-symbols-outlined text-sm">person_remove</span>
                                                        Remove
                                                    </button>
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="px-8 py-6 flex items-center justify-between border-t border-slate-100 dark:border-[#222]">
                        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                            Showing <span className="text-on-surface font-bold">1–4</span> of 128 members
                        </p>
                        <div className="flex gap-2">
                            <button className="p-2 rounded-lg border border-slate-200 dark:border-[#333] text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5 transition-all">
                                <span className="material-symbols-outlined text-sm">chevron_left</span>
                            </button>
                            <button className="p-2 rounded-lg border border-primary text-primary hover:bg-primary/5 dark:hover:bg-primary/10 transition-all">
                                <span className="material-symbols-outlined text-sm">chevron_right</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
