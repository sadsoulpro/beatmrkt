
import React, { useState } from 'react';
import { 
    Users, 
    Music, 
    Bell, 
    CheckCircle, 
    X, 
    Shield, 
    LogOut,
    Search,
    BadgeCheck,
    Menu,
    Trash2,
    Edit,
    Ban,
    MoreHorizontal,
    Play
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { VerificationRequest, Beat } from '../types';
import { MOCK_BEATS } from '../constants';

interface AdminDashboardProps {
    onApproveVerification: (producerName: string, requestId: string) => void;
    onSendNotification: (target: 'producers' | 'artists', message: string) => void;
}

// Mock Verification Requests
const MOCK_REQUESTS: VerificationRequest[] = [
    {
        id: 'v1',
        producerName: 'CyberSound',
        email: 'cyber@sound.com',
        socialLink: 'instagram.com/cybersound',
        status: 'pending',
        date: '2023-10-26'
    },
    {
        id: 'v2',
        producerName: 'NewBeatMaker',
        email: 'maker@beats.com',
        socialLink: 'twitter.com/newbeat',
        status: 'pending',
        date: '2023-10-25'
    }
];

// Mock Users Data
const MOCK_USERS_DB = [
    { id: 'u1', name: 'Metro Boomin', email: 'metro@boomin.com', role: 'producer', status: 'active', joined: '2023-01-15', earnings: '$124,000' },
    { id: 'u2', name: 'Lil Sky', email: 'sky@gmail.com', role: 'artist', status: 'active', joined: '2023-03-10', spent: '$450' },
    { id: 'u3', name: 'Drake Fan', email: 'drake@fan.com', role: 'artist', status: 'banned', joined: '2023-05-22', spent: '$0' },
    { id: 'u4', name: 'CyberSound', email: 'cyber@sound.com', role: 'producer', status: 'active', joined: '2023-02-01', earnings: '$5,200' },
    { id: 'u5', name: 'LoFi Girl', email: 'lofi@study.com', role: 'artist', status: 'active', joined: '2023-06-12', spent: '$1,200' },
];

type AdminTab = 'overview' | 'verifications' | 'notifications' | 'users' | 'beats';

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ 
    onApproveVerification,
    onSendNotification
}) => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<AdminTab>('overview');
    const [requests, setRequests] = useState<VerificationRequest[]>(MOCK_REQUESTS);
    const [notifMessage, setNotifMessage] = useState('');
    const [notifTarget, setNotifTarget] = useState<'producers' | 'artists'>('producers');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    
    // Management State
    const [users, setUsers] = useState(MOCK_USERS_DB);
    const [beats, setBeats] = useState<Beat[]>(MOCK_BEATS);
    const [userTypeFilter, setUserTypeFilter] = useState<'producer' | 'artist'>('producer');

    // --- Actions ---

    const handleApprove = (req: VerificationRequest) => {
        onApproveVerification(req.producerName, req.id);
        setRequests(requests.filter(r => r.id !== req.id));
    };

    const handleReject = (id: string) => {
        setRequests(requests.filter(r => r.id !== id));
    };

    const handleNotificationSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSendNotification(notifTarget, notifMessage);
        setNotifMessage('');
        alert(`Notification sent to ${notifTarget}`);
    };

    const handleDeleteBeat = (id: string) => {
        if (window.confirm('Are you sure you want to delete this beat? This cannot be undone.')) {
            setBeats(beats.filter(b => b.id !== id));
        }
    };

    const handleBanUser = (id: string) => {
        setUsers(users.map(u => u.id === id ? { ...u, status: u.status === 'active' ? 'banned' : 'active' } : u));
    };

    // --- Stats Calculations ---
    const totalPlays = beats.reduce((acc, curr) => acc + curr.plays, 0);
    const totalSales = beats.reduce((acc, curr) => acc + curr.purchases, 0);
    // Rough estimate of revenue based on purchases * average price (simplified)
    const totalRevenue = beats.reduce((acc, curr) => acc + (curr.purchases * curr.price), 0);

    const filteredUsers = users.filter(u => u.role === userTypeFilter);

    // --- Navigation Component ---
    const SidebarItem = ({ id, label, icon: Icon, badge }: { id: AdminTab, label: string, icon: any, badge?: number }) => (
        <button 
            onClick={() => { setActiveTab(id); setIsMobileMenuOpen(false); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === id 
                ? 'bg-red-500/10 text-red-500 border border-red-500/20' 
                : 'text-gray-400 hover:bg-white/5 hover:text-white'
            }`}
        >
            <Icon size={18} /> 
            <span className="font-medium text-sm">{label}</span>
            {badge !== undefined && badge > 0 && (
                <span className="ml-auto bg-red-500 text-black text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[20px] text-center">
                    {badge}
                </span>
            )}
        </button>
    );

    return (
        <div className="min-h-screen bg-[#0A0A0B] flex text-white font-sans pt-16 md:pt-0">
            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-50 bg-[#0A0A0B]/95 backdrop-blur-xl md:hidden flex flex-col p-6 animate-in slide-in-from-left duration-300 overflow-y-auto">
                    <div className="flex items-center justify-between mb-8">
                         <h1 className="text-xl font-bold flex items-center gap-2">
                            <Shield className="text-red-500" /> Admin Panel
                        </h1>
                        <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-gray-400 hover:text-white">
                            <X className="w-6 h-6" />
                        </button>
                    </div>
                    <nav className="space-y-2">
                        <SidebarItem id="overview" label="Overview" icon={Shield} />
                        <SidebarItem id="users" label="Users" icon={Users} />
                        <SidebarItem id="beats" label="All Beats" icon={Music} />
                        <SidebarItem id="verifications" label="Verifications" icon={BadgeCheck} badge={requests.length} />
                        <SidebarItem id="notifications" label="Broadcast" icon={Bell} />
                        
                        <div className="pt-8">
                             <button onClick={() => navigate('/')} className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white border border-white/10 rounded-lg">
                                <LogOut size={18} /> Exit Admin Mode
                            </button>
                        </div>
                    </nav>
                </div>
            )}

            {/* Desktop Sidebar */}
            <aside className="hidden md:flex w-64 border-r border-white/5 bg-[#0F0F11] flex-col fixed h-full z-20 top-0">
                <div className="p-6 border-b border-white/5">
                    <h1 className="text-xl font-bold flex items-center gap-2">
                        <Shield className="text-red-500" /> Admin
                    </h1>
                </div>
                <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                    <SidebarItem id="overview" label="Overview" icon={Shield} />
                    <SidebarItem id="users" label="Users" icon={Users} />
                    <SidebarItem id="beats" label="All Beats" icon={Music} />
                    <SidebarItem id="verifications" label="Verifications" icon={BadgeCheck} badge={requests.length} />
                    <SidebarItem id="notifications" label="Broadcast" icon={Bell} />
                </nav>
                <div className="p-4 border-t border-white/5">
                    <button onClick={() => navigate('/')} className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                        <LogOut size={18} /> Exit Admin
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 md:ml-64 p-6 md:p-10 w-full overflow-x-hidden">
                {/* Mobile Header Button */}
                <div className="md:hidden flex items-center justify-between mb-8">
                    <div className="flex items-center gap-2">
                        <Shield className="text-red-500 w-6 h-6" />
                        <h1 className="text-xl font-bold">Admin Panel</h1>
                    </div>
                    <button 
                        onClick={() => setIsMobileMenuOpen(true)}
                        className="p-2 bg-white/5 border border-white/10 rounded-lg text-gray-300 hover:text-white"
                    >
                        <Menu size={24} />
                    </button>
                </div>

                {/* --- CONTENT VIEWS --- */}

                {activeTab === 'overview' && (
                    <div className="animate-in fade-in duration-300">
                        <h2 className="text-2xl md:text-3xl font-bold mb-8">System Overview</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                            <div className="bg-[#0F0F11] p-6 rounded-2xl border border-white/5 relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-4 opacity-5"><Users size={64} /></div>
                                <h3 className="text-gray-500 font-mono text-xs uppercase font-bold mb-2">Total Users</h3>
                                <div className="text-4xl font-bold text-white">{users.length}</div>
                                <div className="text-xs text-green-500 mt-2">+12% this month</div>
                            </div>
                            <div className="bg-[#0F0F11] p-6 rounded-2xl border border-white/5 relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-4 opacity-5"><Music size={64} /></div>
                                <h3 className="text-gray-500 font-mono text-xs uppercase font-bold mb-2">Total Beats</h3>
                                <div className="text-4xl font-bold text-neon">{beats.length}</div>
                                <div className="text-xs text-neon mt-2">+5 new today</div>
                            </div>
                            <div className="bg-[#0F0F11] p-6 rounded-2xl border border-white/5 relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-4 opacity-5"><CheckCircle size={64} /></div>
                                <h3 className="text-gray-500 font-mono text-xs uppercase font-bold mb-2">Total Volume</h3>
                                <div className="text-4xl font-bold text-green-500">${totalRevenue.toLocaleString()}</div>
                                <div className="text-xs text-green-500 mt-2">+8.4% growth</div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'users' && (
                    <div className="animate-in fade-in duration-300">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                             <h2 className="text-2xl md:text-3xl font-bold">User Management</h2>
                             
                             <div className="bg-[#0F0F11] border border-white/10 p-1 rounded-lg flex items-center">
                                 <button 
                                    onClick={() => setUserTypeFilter('producer')}
                                    className={`px-4 py-2 rounded-md text-sm font-bold transition-all ${userTypeFilter === 'producer' ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-gray-300'}`}
                                 >
                                    Producers
                                 </button>
                                 <button 
                                    onClick={() => setUserTypeFilter('artist')}
                                    className={`px-4 py-2 rounded-md text-sm font-bold transition-all ${userTypeFilter === 'artist' ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-gray-300'}`}
                                 >
                                    Artists
                                 </button>
                             </div>
                        </div>

                        <div className="bg-[#0F0F11] border border-white/5 rounded-2xl overflow-hidden">
                             <div className="overflow-x-auto">
                                 <table className="w-full text-left">
                                     <thead className="bg-white/5 text-gray-400 text-xs font-mono uppercase">
                                         <tr>
                                             <th className="px-6 py-4">User</th>
                                             <th className="px-6 py-4">Role</th>
                                             <th className="px-6 py-4">Status</th>
                                             <th className="px-6 py-4">Financials</th>
                                             <th className="px-6 py-4 text-right">Actions</th>
                                         </tr>
                                     </thead>
                                     <tbody className="divide-y divide-white/5 text-sm text-gray-300">
                                         {filteredUsers.map(user => (
                                             <tr key={user.id} className="hover:bg-white/[0.02] transition-colors">
                                                 <td className="px-6 py-4">
                                                     <div className="flex items-center gap-3">
                                                         <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center font-bold text-xs text-white">
                                                             {user.name.charAt(0)}
                                                         </div>
                                                         <div>
                                                             <div className="font-bold text-white">{user.name}</div>
                                                             <div className="text-xs text-gray-500">{user.email}</div>
                                                         </div>
                                                     </div>
                                                 </td>
                                                 <td className="px-6 py-4">
                                                     <span className={`text-[10px] uppercase font-bold px-2 py-1 rounded border ${user.role === 'producer' ? 'bg-neon/10 text-neon border-neon/20' : 'bg-blue-500/10 text-blue-500 border-blue-500/20'}`}>
                                                         {user.role}
                                                     </span>
                                                 </td>
                                                 <td className="px-6 py-4">
                                                     <span className={`flex items-center gap-1.5 text-xs ${user.status === 'active' ? 'text-green-500' : 'text-red-500'}`}>
                                                         <span className={`w-1.5 h-1.5 rounded-full ${user.status === 'active' ? 'bg-green-500' : 'bg-red-500'}`}></span>
                                                         {user.status === 'active' ? 'Active' : 'Banned'}
                                                     </span>
                                                 </td>
                                                 <td className="px-6 py-4 font-mono text-xs">
                                                     {user.role === 'producer' ? (
                                                         <span className="text-green-400">Earned: {user.earnings}</span>
                                                     ) : (
                                                         <span className="text-gray-400">Spent: {user.spent}</span>
                                                     )}
                                                 </td>
                                                 <td className="px-6 py-4 text-right">
                                                     <div className="flex items-center justify-end gap-2">
                                                         <button className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white" title="Edit User">
                                                             <Edit size={14} />
                                                         </button>
                                                         <button 
                                                            onClick={() => handleBanUser(user.id)}
                                                            className={`p-2 rounded-lg transition-colors ${user.status === 'active' ? 'hover:bg-red-500/10 text-gray-400 hover:text-red-500' : 'bg-red-500/20 text-red-500'}`}
                                                            title={user.status === 'active' ? "Ban User" : "Unban User"}
                                                         >
                                                             <Ban size={14} />
                                                         </button>
                                                     </div>
                                                 </td>
                                             </tr>
                                         ))}
                                     </tbody>
                                 </table>
                             </div>
                        </div>
                    </div>
                )}

                {activeTab === 'beats' && (
                    <div className="animate-in fade-in duration-300">
                        <h2 className="text-2xl md:text-3xl font-bold mb-8">Beat Management</h2>
                        
                        {/* Beats Stats Cards */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                             <div className="bg-[#0F0F11] border border-white/5 p-4 rounded-xl">
                                 <p className="text-gray-500 text-[10px] font-mono uppercase">Catalog Size</p>
                                 <p className="text-xl font-bold text-white mt-1">{beats.length}</p>
                             </div>
                             <div className="bg-[#0F0F11] border border-white/5 p-4 rounded-xl">
                                 <p className="text-gray-500 text-[10px] font-mono uppercase">Total Plays</p>
                                 <p className="text-xl font-bold text-neon mt-1">{(totalPlays / 1000).toFixed(1)}k</p>
                             </div>
                             <div className="bg-[#0F0F11] border border-white/5 p-4 rounded-xl">
                                 <p className="text-gray-500 text-[10px] font-mono uppercase">Total Sales</p>
                                 <p className="text-xl font-bold text-green-500 mt-1">{totalSales}</p>
                             </div>
                             <div className="bg-[#0F0F11] border border-white/5 p-4 rounded-xl">
                                 <p className="text-gray-500 text-[10px] font-mono uppercase">Est. Value</p>
                                 <p className="text-xl font-bold text-white mt-1">${totalRevenue.toLocaleString()}</p>
                             </div>
                        </div>

                        <div className="bg-[#0F0F11] border border-white/5 rounded-2xl overflow-hidden">
                             <div className="overflow-x-auto">
                                 <table className="w-full text-left">
                                     <thead className="bg-white/5 text-gray-400 text-xs font-mono uppercase">
                                         <tr>
                                             <th className="px-6 py-4">Track Details</th>
                                             <th className="px-6 py-4">Producer</th>
                                             <th className="px-6 py-4">Stats</th>
                                             <th className="px-6 py-4">Price</th>
                                             <th className="px-6 py-4 text-right">Actions</th>
                                         </tr>
                                     </thead>
                                     <tbody className="divide-y divide-white/5 text-sm text-gray-300">
                                         {beats.map(beat => (
                                             <tr key={beat.id} className="hover:bg-white/[0.02] transition-colors group">
                                                 <td className="px-6 py-4">
                                                     <div className="flex items-center gap-3">
                                                         <img src={beat.cover} alt={beat.title} className="w-10 h-10 rounded object-cover bg-gray-800" />
                                                         <div>
                                                             <div className="font-bold text-white">{beat.title}</div>
                                                             <div className="text-[10px] text-gray-500 font-mono">{beat.bpm} BPM • {beat.key}</div>
                                                         </div>
                                                     </div>
                                                 </td>
                                                 <td className="px-6 py-4">
                                                     <span className="text-neon hover:underline cursor-pointer">{beat.producer}</span>
                                                 </td>
                                                 <td className="px-6 py-4">
                                                     <div className="flex flex-col gap-1 text-xs">
                                                         <span className="flex items-center gap-1 text-gray-400"><Play size={10} /> {beat.plays}</span>
                                                         <span className="flex items-center gap-1 text-green-500"><CheckCircle size={10} /> {beat.purchases} sold</span>
                                                     </div>
                                                 </td>
                                                 <td className="px-6 py-4 font-bold text-white font-mono">
                                                     ${beat.price}
                                                 </td>
                                                 <td className="px-6 py-4 text-right">
                                                     <div className="flex items-center justify-end gap-2 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity">
                                                         <button className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white" title="Edit Beat">
                                                             <Edit size={14} />
                                                         </button>
                                                         <button 
                                                            onClick={() => handleDeleteBeat(beat.id)}
                                                            className="p-2 hover:bg-red-500/10 rounded-lg text-gray-400 hover:text-red-500" 
                                                            title="Delete Beat"
                                                        >
                                                             <Trash2 size={14} />
                                                         </button>
                                                     </div>
                                                 </td>
                                             </tr>
                                         ))}
                                     </tbody>
                                 </table>
                             </div>
                        </div>
                    </div>
                )}

                {activeTab === 'verifications' && (
                    <div className="animate-in fade-in duration-300">
                        <h2 className="text-2xl md:text-3xl font-bold mb-8">Pending Verifications</h2>
                        <div className="bg-[#0F0F11] border border-white/5 rounded-2xl overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="bg-white/5 text-gray-400 text-xs font-mono uppercase">
                                        <tr>
                                            <th className="px-6 py-4">Producer</th>
                                            <th className="px-6 py-4">Social</th>
                                            <th className="px-6 py-4">Date</th>
                                            <th className="px-6 py-4 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5 text-gray-300 text-sm">
                                        {requests.length === 0 ? (
                                            <tr>
                                                <td colSpan={4} className="px-6 py-8 text-center text-gray-500">No pending requests.</td>
                                            </tr>
                                        ) : (
                                            requests.map(req => (
                                                <tr key={req.id}>
                                                    <td className="px-6 py-4">
                                                        <div className="font-bold text-white">{req.producerName}</div>
                                                        <div className="text-xs text-gray-500">{req.email}</div>
                                                    </td>
                                                    <td className="px-6 py-4 text-neon font-mono text-xs">{req.socialLink}</td>
                                                    <td className="px-6 py-4 font-mono text-xs">{req.date}</td>
                                                    <td className="px-6 py-4 text-right">
                                                        <div className="flex items-center justify-end gap-2">
                                                            <button 
                                                                onClick={() => handleApprove(req)}
                                                                className="bg-green-500/10 text-green-500 px-3 py-1.5 rounded hover:bg-green-500 hover:text-black transition-colors text-xs font-bold"
                                                            >
                                                                Approve
                                                            </button>
                                                            <button 
                                                                onClick={() => handleReject(req.id)}
                                                                className="bg-red-500/10 text-red-500 px-3 py-1.5 rounded hover:bg-red-500 hover:text-black transition-colors text-xs font-bold"
                                                            >
                                                                Reject
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'notifications' && (
                    <div className="animate-in fade-in duration-300 max-w-2xl">
                        <h2 className="text-2xl md:text-3xl font-bold mb-8">Broadcast Center</h2>
                        <div className="bg-[#0F0F11] border border-white/5 rounded-2xl p-6 md:p-8">
                            <form onSubmit={handleNotificationSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-xs font-mono text-gray-500 uppercase font-bold mb-2">Target Audience</label>
                                    <div className="flex bg-black p-1 rounded-lg border border-white/10">
                                        <button 
                                            type="button"
                                            onClick={() => setNotifTarget('producers')}
                                            className={`flex-1 py-2 text-sm rounded-md transition-colors ${notifTarget === 'producers' ? 'bg-white/10 text-white' : 'text-gray-500'}`}
                                        >
                                            Producers
                                        </button>
                                        <button 
                                            type="button"
                                            onClick={() => setNotifTarget('artists')}
                                            className={`flex-1 py-2 text-sm rounded-md transition-colors ${notifTarget === 'artists' ? 'bg-white/10 text-white' : 'text-gray-500'}`}
                                        >
                                            Artists (Buyers)
                                        </button>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-mono text-gray-500 uppercase font-bold mb-2">Message</label>
                                    <textarea 
                                        required
                                        value={notifMessage}
                                        onChange={(e) => setNotifMessage(e.target.value)}
                                        placeholder="Type your announcement here..." 
                                        className="w-full bg-black border border-white/10 rounded-lg p-4 text-white focus:border-red-500 outline-none h-32" 
                                    />
                                </div>
                                <button type="submit" className="w-full bg-red-500 text-black font-bold py-3 rounded-xl hover:bg-white transition-colors">
                                    Send Broadcast
                                </button>
                            </form>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};
