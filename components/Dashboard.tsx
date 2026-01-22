
import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  UploadCloud, 
  BarChart3, 
  Wallet, 
  Settings, 
  TrendingUp, 
  Users, 
  Music, 
  DollarSign, 
  MoreHorizontal,
  Bell,
  Search,
  MoreVertical,
  Edit2,
  Trash2,
  FileAudio,
  CheckCircle,
  CreditCard,
  LogOut,
  ChevronRight,
  ChevronDown,
  Clock,
  X,
  MessageSquare,
  Menu,
  FileText,
  BadgeCheck,
  Send,
  Globe,
  Smartphone,
  ExternalLink,
  Download,
  Lock,
  Mail,
  Save,
  AlertCircle
} from 'lucide-react';
import { useNavigate, Routes, Route, Link, useLocation } from 'react-router-dom';
import { MOCK_BEATS, GENRES, MUSICAL_KEYS } from '../constants';
import { Messages } from './Messages';

// --- HELPER COMPONENTS ---

const StatCard: React.FC<{
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
  isPositive: boolean;
}> = ({ title, value, change, icon, isPositive }) => (
  <div className="bg-[#0F0F11] border border-white/5 rounded-2xl p-6 relative overflow-hidden group hover:border-white/10 transition-colors">
    <div className="flex justify-between items-start mb-4">
      <div className="p-3 bg-white/5 rounded-xl group-hover:bg-white/10 transition-colors">
        {icon}
      </div>
      <span className={`text-xs font-mono py-1 px-2 rounded-lg ${isPositive ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
        {change}
      </span>
    </div>
    <h3 className="text-gray-400 text-sm font-medium mb-1">{title}</h3>
    <p className="text-2xl font-bold text-white tracking-tight">{value}</p>
  </div>
);

const TopTrackRow: React.FC<{
  rank: number;
  title: string;
  plays: string;
  revenue: string;
  change: 'up' | 'down';
}> = ({ rank, title, plays, revenue, change }) => (
  <div className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors group">
    <div className="flex items-center gap-4">
      <span className={`font-mono text-sm font-bold w-6 text-center ${rank === 1 ? 'text-yellow-500' : rank === 2 ? 'text-gray-400' : rank === 3 ? 'text-orange-700' : 'text-gray-600'}`}>
        {rank}
      </span>
      <div>
        <h4 className="font-bold text-sm text-white">{title}</h4>
        <p className="text-xs text-gray-500">{plays} plays</p>
      </div>
    </div>
    <div className="text-right">
      <p className="font-mono text-sm font-bold text-white">{revenue}</p>
      <span className={`text-[10px] ${change === 'up' ? 'text-green-500' : 'text-red-500'} flex items-center justify-end gap-0.5`}>
        {change === 'up' ? <TrendingUp size={10} /> : <TrendingUp size={10} className="rotate-180" />} 
        {change === 'up' ? 'Trending' : 'Falling'}
      </span>
    </div>
  </div>
);

const TransactionRow: React.FC<{
  track: string;
  customer: string;
  license: string;
  date: string;
  amount: string;
  status: string;
}> = ({ track, customer, license, date, amount, status }) => (
  <tr className="hover:bg-white/[0.02] transition-colors group">
    <td className="px-6 py-4 font-medium text-white">{track}</td>
    <td className="px-6 py-4 text-gray-400">{customer}</td>
    <td className="px-6 py-4">
      <span className="bg-white/5 border border-white/10 px-2 py-1 rounded text-xs text-gray-300">
        {license}
      </span>
    </td>
    <td className="px-6 py-4 font-mono text-xs text-gray-500">{date}</td>
    <td className="px-6 py-4 font-bold text-white">{amount}</td>
    <td className="px-6 py-4 text-right">
      <span className={`text-xs px-2 py-1 rounded-full border ${
        status === 'Completed' 
          ? 'bg-green-500/10 text-green-500 border-green-500/20' 
          : 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
      }`}>
        {status}
      </span>
    </td>
  </tr>
);

// --- SUB-PAGES COMPONENTS ---

const Overview: React.FC = () => (
  <div className="animate-in fade-in duration-500">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatCard 
          title="Total Revenue" 
          value="$12,450.00" 
          change="+14.5%" 
          icon={<DollarSign className="text-neon" size={24} />} 
          isPositive 
        />
        <StatCard 
          title="Total Plays" 
          value="854.2k" 
          change="+2.1%" 
          icon={<Music className="text-blue-400" size={24} />} 
          isPositive 
        />
        <StatCard 
          title="Beats Sold" 
          value="342" 
          change="+8.4%" 
          icon={<TrendingUp className="text-purple-400" size={24} />} 
          isPositive 
        />
        <StatCard 
          title="Followers" 
          value="12.5k" 
          change="-0.5%" 
          icon={<Users className="text-gray-400" size={24} />} 
          isPositive={false} 
        />
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
        <div className="lg:col-span-2 bg-[#0F0F11] border border-white/5 rounded-2xl p-6 relative overflow-hidden group">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none"></div>
          
          <div className="flex items-center justify-between mb-8 relative z-10">
              <h3 className="font-bold text-white">Revenue Analytics</h3>
              <select className="bg-white/5 border border-white/10 text-xs text-gray-300 rounded-lg px-3 py-1.5 focus:outline-none font-mono">
                <option>Last 30 Days</option>
                <option>Last 6 Months</option>
                <option>This Year</option>
              </select>
          </div>

          <div className="h-64 w-full flex items-end gap-1 md:gap-2 relative z-10">
              {[40, 65, 45, 80, 55, 70, 45, 90, 60, 75, 50, 85, 95, 60, 70, 80, 50, 65, 85, 100].map((h, i) => (
                <div key={i} className="flex-1 flex flex-col justify-end group/bar relative">
                    <div 
                      className="w-full bg-gradient-to-t from-neon/10 to-neon/60 rounded-t-sm transition-all duration-500 hover:to-neon"
                      style={{ height: `${h}%` }}
                    ></div>
                </div>
              ))}
          </div>
          <div className="flex justify-between mt-4 text-[10px] font-mono text-gray-500 relative z-10">
              <span>01 NOV</span>
              <span>15 NOV</span>
              <span>29 NOV</span>
          </div>
        </div>

        <div className="bg-[#0F0F11] border border-white/5 rounded-2xl p-6 flex flex-col">
          <h3 className="font-bold text-white mb-6">Top Performers</h3>
          <div className="space-y-4 flex-1 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-800">
              <TopTrackRow rank={1} title="Neon Nights" plays="245k" revenue="$3,200" change="up" />
              <TopTrackRow rank={2} title="Drill Sergeant" plays="180k" revenue="$2,100" change="up" />
              <TopTrackRow rank={3} title="Midnight Rain" plays="120k" revenue="$1,850" change="down" />
              <TopTrackRow rank={4} title="Cyber Soul" plays="95k" revenue="$900" change="up" />
          </div>
        </div>
    </div>

    <div className="bg-[#0F0F11] border border-white/5 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-white/5 flex items-center justify-between">
          <h3 className="font-bold text-white">Recent Transactions</h3>
          <button className="text-neon text-xs font-mono hover:underline">Export CSV</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
              <thead className="bg-white/5 text-[10px] uppercase font-mono text-gray-400">
                <tr>
                    <th className="px-6 py-4 font-medium">Track</th>
                    <th className="px-6 py-4 font-medium">Customer</th>
                    <th className="px-6 py-4 font-medium">License</th>
                    <th className="px-6 py-4 font-medium">Date</th>
                    <th className="px-6 py-4 font-medium">Amount</th>
                    <th className="px-6 py-4 font-medium text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-sm text-gray-300">
                <TransactionRow 
                    track="Neon Nights" 
                    customer="kanye_west@gmail.com" 
                    license="Unlimited" 
                    date="Just now" 
                    amount="$79.99" 
                    status="Completed" 
                />
                <TransactionRow 
                    track="Drill Sergeant" 
                    customer="drake_fan_22" 
                    license="MP3 Lease" 
                    date="2 hours ago" 
                    amount="$19.99" 
                    status="Completed" 
                />
                <TransactionRow 
                    track="Midnight Rain" 
                    customer="lofi_girl" 
                    license="WAV Lease" 
                    date="5 hours ago" 
                    amount="$34.99" 
                    status="Processing" 
                />
              </tbody>
          </table>
        </div>
    </div>
  </div>
);

const AnalyticsPage: React.FC = () => (
    <div className="animate-in fade-in duration-500">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Extended Sales Chart */}
            <div className="bg-[#0F0F11] border border-white/5 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h3 className="font-bold text-white">Sales Performance</h3>
                        <p className="text-xs text-gray-400 mt-1">Gross revenue breakdown</p>
                    </div>
                    <div className="flex gap-2">
                        <button className="text-[10px] bg-white/10 text-white px-3 py-1 rounded-md">Week</button>
                        <button className="text-[10px] bg-transparent text-gray-500 hover:text-white px-3 py-1 rounded-md">Month</button>
                    </div>
                </div>
                 <div className="h-64 w-full flex items-end gap-3 relative z-10">
                    {[30, 45, 35, 60, 50, 75, 55, 80, 70, 90, 65, 85].map((h, i) => (
                        <div key={i} className="flex-1 flex flex-col justify-end group/bar relative cursor-pointer">
                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-black text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover/bar:opacity-100 transition-opacity whitespace-nowrap z-20">
                                ${h * 24}
                            </div>
                            <div 
                                className="w-full bg-gradient-to-t from-blue-500/10 to-blue-500 rounded-t-sm transition-all duration-300 hover:to-neon"
                                style={{ height: `${h}%` }}
                            ></div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Geography */}
            <div className="bg-[#0F0F11] border border-white/5 rounded-2xl p-6">
                <h3 className="font-bold text-white mb-6 flex items-center gap-2">
                    <Globe className="w-4 h-4 text-neon" /> Top Countries
                </h3>
                <div className="space-y-4">
                    {[
                        { country: "United States", percent: 45, plays: "342k" },
                        { country: "United Kingdom", percent: 20, plays: "156k" },
                        { country: "Germany", percent: 12, plays: "89k" },
                        { country: "Canada", percent: 10, plays: "78k" },
                        { country: "Japan", percent: 8, plays: "65k" },
                    ].map((item, i) => (
                        <div key={i} className="flex items-center gap-4">
                            <div className="w-8 font-mono text-gray-500 text-xs">0{i+1}</div>
                            <div className="flex-1">
                                <div className="flex justify-between mb-1">
                                    <span className="text-sm text-gray-300">{item.country}</span>
                                    <span className="text-xs text-gray-500">{item.plays}</span>
                                </div>
                                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                    <div className="h-full bg-neon rounded-full" style={{ width: `${item.percent}%` }}></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#0F0F11] border border-white/5 rounded-2xl p-6">
                <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                    <Smartphone className="w-4 h-4 text-gray-400" /> Device Type
                </h3>
                <div className="flex items-center justify-center py-8 relative">
                     {/* Pseudo donut chart */}
                    <div className="w-32 h-32 rounded-full border-8 border-white/5 relative flex items-center justify-center">
                        <div className="absolute inset-0 border-8 border-neon rounded-full border-t-transparent border-l-transparent rotate-45"></div>
                        <span className="text-2xl font-bold text-white">65%</span>
                    </div>
                </div>
                <div className="flex justify-center gap-6 text-xs text-gray-400">
                    <span className="flex items-center gap-1"><div className="w-2 h-2 bg-neon rounded-full"></div> Mobile</span>
                    <span className="flex items-center gap-1"><div className="w-2 h-2 bg-white/20 rounded-full"></div> Desktop</span>
                </div>
            </div>

            <div className="bg-[#0F0F11] border border-white/5 rounded-2xl p-6 md:col-span-2">
                 <div className="flex items-center justify-between mb-6">
                    <h3 className="font-bold text-white">Traffic Sources</h3>
                    <button className="text-xs text-neon flex items-center gap-1">View Details <ExternalLink className="w-3 h-3" /></button>
                 </div>
                 <div className="space-y-4">
                    {[
                        { source: "Direct / Link", visitors: "12,450", bounce: "24%" },
                        { source: "Instagram Bio", visitors: "8,320", bounce: "32%" },
                        { source: "YouTube (Type Beats)", visitors: "6,100", bounce: "15%" },
                        { source: "BeatStars Marketplace", visitors: "2,400", bounce: "45%" },
                    ].map((row, i) => (
                        <div key={i} className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/5">
                            <span className="text-sm font-medium text-white">{row.source}</span>
                            <div className="flex gap-8 text-right">
                                <div>
                                    <p className="text-xs text-gray-500">Visitors</p>
                                    <p className="text-sm text-gray-300 font-mono">{row.visitors}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500">Bounce Rate</p>
                                    <p className="text-sm text-neon font-mono">{row.bounce}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                 </div>
            </div>
        </div>
    </div>
);

const Payouts: React.FC = () => (
    <div className="animate-in fade-in duration-500 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="md:col-span-2 bg-gradient-to-br from-[#1a1a1c] to-[#0A0A0B] border border-white/10 rounded-2xl p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5"><Wallet size={120} /></div>
                <div className="relative z-10">
                    <p className="text-gray-400 text-sm font-mono uppercase tracking-wider mb-2">Available Balance</p>
                    <h2 className="text-5xl font-bold text-white mb-6 tracking-tight">$3,240.50</h2>
                    <div className="flex gap-4">
                        <button className="bg-neon text-black font-bold px-6 py-3 rounded-xl hover:bg-white transition-colors shadow-[0_0_20px_rgba(118,100,221,0.3)]">
                            Request Payout
                        </button>
                        <button className="bg-white/10 text-white font-bold px-6 py-3 rounded-xl hover:bg-white/20 transition-colors border border-white/5">
                            Auto-Withdraw Settings
                        </button>
                    </div>
                </div>
            </div>

            <div className="bg-[#0F0F11] border border-white/5 rounded-2xl p-6 flex flex-col justify-center">
                <h3 className="font-bold text-white mb-4">Payout Method</h3>
                <div className="flex items-center gap-4 mb-6 p-4 bg-white/5 rounded-xl border border-white/5">
                    <div className="w-10 h-10 bg-[#635BFF] rounded-lg flex items-center justify-center text-white font-bold">S</div>
                    <div>
                        <p className="font-bold text-white text-sm">Stripe</p>
                        <p className="text-xs text-green-400 flex items-center gap-1"><CheckCircle className="w-3 h-3" /> Connected</p>
                    </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/5 opacity-50">
                    <div className="w-10 h-10 bg-[#003087] rounded-lg flex items-center justify-center text-white font-bold text-xs">PP</div>
                    <div>
                        <p className="font-bold text-white text-sm">PayPal</p>
                        <p className="text-xs text-gray-500">Not connected</p>
                    </div>
                </div>
            </div>
        </div>

        <div className="bg-[#0F0F11] border border-white/5 rounded-2xl overflow-hidden">
             <div className="p-6 border-b border-white/5 flex justify-between items-center">
                <h3 className="font-bold text-white">Withdrawal History</h3>
                <button className="text-xs text-gray-400 hover:text-white flex items-center gap-1"><Download className="w-3 h-3" /> Statement</button>
             </div>
             <table className="w-full text-left">
                  <thead className="bg-white/5 text-[10px] uppercase font-mono text-gray-400">
                    <tr>
                        <th className="px-6 py-4">ID</th>
                        <th className="px-6 py-4">Date</th>
                        <th className="px-6 py-4">Method</th>
                        <th className="px-6 py-4">Amount</th>
                        <th className="px-6 py-4 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-sm text-gray-300">
                    {[
                        { id: "#WD-9923", date: "Oct 24, 2023", method: "Stripe", amount: "$1,250.00", status: "Completed" },
                        { id: "#WD-9844", date: "Sep 30, 2023", method: "Stripe", amount: "$980.00", status: "Completed" },
                        { id: "#WD-9120", date: "Aug 28, 2023", method: "PayPal", amount: "$450.00", status: "Completed" },
                    ].map((row, i) => (
                        <tr key={i} className="hover:bg-white/5 transition-colors">
                            <td className="px-6 py-4 font-mono text-xs text-gray-500">{row.id}</td>
                            <td className="px-6 py-4">{row.date}</td>
                            <td className="px-6 py-4">{row.method}</td>
                            <td className="px-6 py-4 font-bold text-white">{row.amount}</td>
                            <td className="px-6 py-4 text-right">
                                <span className="text-xs bg-green-500/10 text-green-500 px-2 py-1 rounded border border-green-500/20">{row.status}</span>
                            </td>
                        </tr>
                    ))}
                  </tbody>
             </table>
        </div>
    </div>
);

const Customers: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const customers = [
        { id: 1, name: "Kanye West", email: "ye@yeezy.com", spent: "$4,500", orders: 12, lastActive: "2 hrs ago", location: "Chicago, US" },
        { id: 2, name: "Drake Fan 22", email: "drizzy_lover@gmail.com", spent: "$120", orders: 3, lastActive: "1 day ago", location: "Toronto, CA" },
        { id: 3, name: "Travis Scott", email: "laflame@cactus.jack", spent: "$2,800", orders: 8, lastActive: "3 days ago", location: "Houston, US" },
        { id: 4, name: "Unknown User", email: "buyer99@temp.mail", spent: "$30", orders: 1, lastActive: "1 week ago", location: "London, UK" },
        { id: 5, name: "Future Hendrix", email: "pluto@freebandz.com", spent: "$1,500", orders: 5, lastActive: "2 weeks ago", location: "Atlanta, US" },
    ];

    const filteredCustomers = customers.filter(c => 
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        c.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input 
                        type="text" 
                        placeholder="Search by name or email..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-[#0F0F11] border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-sm text-white focus:border-neon outline-none" 
                    />
                </div>
                <div className="flex gap-2">
                    <button className="bg-[#0F0F11] border border-white/10 text-gray-300 px-4 py-2 rounded-lg text-sm hover:text-white flex items-center gap-2">
                         <Download className="w-4 h-4" /> Export CSV
                    </button>
                </div>
            </div>

            <div className="bg-[#0F0F11] border border-white/5 rounded-2xl overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-white/5 text-[10px] uppercase font-mono text-gray-400">
                    <tr>
                        <th className="px-6 py-4">Customer</th>
                        <th className="px-6 py-4">Location</th>
                        <th className="px-6 py-4">Total Spent</th>
                        <th className="px-6 py-4">Orders</th>
                        <th className="px-6 py-4">Last Active</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-sm text-gray-300">
                    {filteredCustomers.map((c) => (
                        <tr key={c.id} className="hover:bg-white/[0.02] transition-colors group">
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-gray-700 to-gray-900 flex items-center justify-center font-bold text-xs text-white">
                                        {c.name.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="font-bold text-white">{c.name}</p>
                                        <p className="text-xs text-gray-500">{c.email}</p>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4 text-xs text-gray-400 flex items-center gap-1">
                                <MapPinIcon className="w-3 h-3" /> {c.location}
                            </td>
                            <td className="px-6 py-4 font-mono text-neon">{c.spent}</td>
                            <td className="px-6 py-4">{c.orders}</td>
                            <td className="px-6 py-4 text-xs text-gray-500">{c.lastActive}</td>
                            <td className="px-6 py-4 text-right">
                                <button className="text-gray-400 hover:text-white p-2 bg-white/5 rounded-lg border border-white/5 hover:bg-white/10 transition-colors">
                                    <MessageSquare className="w-4 h-4" />
                                </button>
                            </td>
                        </tr>
                    ))}
                  </tbody>
                </table>
            </div>
        </div>
    );
};

// Internal icon for map pin
const MapPinIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
        <circle cx="12" cy="10" r="3"/>
    </svg>
);

const SettingsPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'profile' | 'payment' | 'security'>('profile');

    return (
        <div className="animate-in fade-in duration-500 max-w-4xl mx-auto">
             <div className="flex gap-6 mb-8 border-b border-white/10">
                 {['profile', 'payment', 'security'].map((tab) => (
                     <button 
                        key={tab}
                        onClick={() => setActiveTab(tab as any)}
                        className={`pb-4 text-sm font-bold uppercase tracking-wider transition-all relative ${activeTab === tab ? 'text-neon' : 'text-gray-500 hover:text-white'}`}
                     >
                        {tab}
                        {activeTab === tab && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-neon shadow-[0_0_10px_rgba(118,100,221,0.5)]"></div>}
                     </button>
                 ))}
             </div>

             {activeTab === 'profile' && (
                 <div className="space-y-6 animate-in slide-in-from-bottom-2 duration-300">
                     <div className="bg-[#0F0F11] border border-white/5 rounded-2xl p-6 md:p-8">
                         <div className="flex flex-col md:flex-row gap-8 items-start">
                             <div className="flex-shrink-0 relative group cursor-pointer">
                                 <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-white/10 group-hover:border-neon transition-colors">
                                     <img src="https://picsum.photos/seed/producer_avatar/200/200" alt="Avatar" className="w-full h-full object-cover" />
                                 </div>
                                 <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                     <UploadCloud className="w-6 h-6 text-white" />
                                 </div>
                             </div>
                             <div className="flex-grow w-full space-y-4">
                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                     <div>
                                         <label className="text-[10px] font-mono text-gray-500 uppercase font-bold mb-1 block">Display Name</label>
                                         <input type="text" defaultValue="Metro Boomin" className="w-full bg-black border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:border-neon outline-none" />
                                     </div>
                                     <div>
                                         <label className="text-[10px] font-mono text-gray-500 uppercase font-bold mb-1 block">Username</label>
                                         <input type="text" defaultValue="metro_boomin" className="w-full bg-black border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:border-neon outline-none" />
                                     </div>
                                 </div>
                                 <div>
                                     <label className="text-[10px] font-mono text-gray-500 uppercase font-bold mb-1 block">Bio</label>
                                     <textarea className="w-full h-24 bg-black border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:border-neon outline-none resize-none" defaultValue="Sound Architect. Creating sonic landscapes for the next generation."></textarea>
                                 </div>
                                 <div>
                                     <label className="text-[10px] font-mono text-gray-500 uppercase font-bold mb-1 block">Location</label>
                                     <input type="text" defaultValue="Atlanta, GA" className="w-full bg-black border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:border-neon outline-none" />
                                 </div>
                             </div>
                         </div>
                     </div>
                     <div className="flex justify-end">
                         <button className="bg-neon text-black font-bold px-6 py-2.5 rounded-lg flex items-center gap-2 hover:bg-white transition-colors">
                             <Save className="w-4 h-4" /> Save Changes
                         </button>
                     </div>
                 </div>
             )}

             {activeTab === 'payment' && (
                 <div className="space-y-6 animate-in slide-in-from-bottom-2 duration-300">
                      <div className="bg-[#0F0F11] border border-white/5 rounded-2xl p-6">
                          <h3 className="font-bold text-white mb-4">Payout Methods</h3>
                          <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5 mb-4">
                             <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-[#635BFF] rounded-lg flex items-center justify-center text-white font-bold">S</div>
                                <div>
                                    <p className="font-bold text-white">Stripe</p>
                                    <p className="text-xs text-gray-400">Accept credit cards directly</p>
                                </div>
                             </div>
                             <button className="text-xs border border-red-500/30 text-red-500 px-3 py-1.5 rounded hover:bg-red-500 hover:text-white transition-colors">Disconnect</button>
                          </div>
                           <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                             <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-[#003087] rounded-lg flex items-center justify-center text-white font-bold text-sm">PP</div>
                                <div>
                                    <p className="font-bold text-white">PayPal</p>
                                    <p className="text-xs text-gray-400">Accept payments via PayPal</p>
                                </div>
                             </div>
                             <button className="text-xs border border-white/20 text-white px-3 py-1.5 rounded hover:bg-white hover:text-black transition-colors">Connect</button>
                          </div>
                      </div>

                      <div className="bg-[#0F0F11] border border-white/5 rounded-2xl p-6">
                           <h3 className="font-bold text-white mb-4">Currency & Tax</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-[10px] font-mono text-gray-500 uppercase font-bold mb-1 block">Store Currency</label>
                                    <select className="w-full bg-black border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:border-neon outline-none">
                                        <option>USD ($)</option>
                                        <option>EUR (€)</option>
                                        <option>GBP (£)</option>
                                    </select>
                                </div>
                                 <div>
                                    <label className="text-[10px] font-mono text-gray-500 uppercase font-bold mb-1 block">Tax Info (VAT/EIN)</label>
                                    <input type="text" placeholder="Optional" className="w-full bg-black border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:border-neon outline-none" />
                                </div>
                            </div>
                      </div>
                 </div>
             )}

             {activeTab === 'security' && (
                 <div className="space-y-6 animate-in slide-in-from-bottom-2 duration-300">
                     <div className="bg-[#0F0F11] border border-white/5 rounded-2xl p-6">
                         <h3 className="font-bold text-white mb-4 flex items-center gap-2"><Lock className="w-4 h-4 text-neon" /> Change Password</h3>
                         <div className="space-y-4 max-w-md">
                             <input type="password" placeholder="Current Password" className="w-full bg-black border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:border-neon outline-none" />
                             <input type="password" placeholder="New Password" className="w-full bg-black border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:border-neon outline-none" />
                             <input type="password" placeholder="Confirm New Password" className="w-full bg-black border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:border-neon outline-none" />
                             <button className="bg-white/10 text-white font-bold px-4 py-2 rounded-lg text-sm hover:bg-white/20 transition-colors">Update Password</button>
                         </div>
                     </div>
                     
                     <div className="bg-[#0F0F11] border border-white/5 rounded-2xl p-6">
                         <h3 className="font-bold text-white mb-4 flex items-center gap-2"><AlertCircle className="w-4 h-4 text-red-500" /> Danger Zone</h3>
                         <div className="flex items-center justify-between p-4 bg-red-500/5 border border-red-500/20 rounded-xl">
                             <div>
                                 <p className="font-bold text-white text-sm">Deactivate Account</p>
                                 <p className="text-xs text-gray-500">Temporarily disable your store and profile.</p>
                             </div>
                             <button className="text-xs bg-red-500/10 text-red-500 border border-red-500/20 px-3 py-1.5 rounded hover:bg-red-500 hover:text-black transition-colors">Deactivate</button>
                         </div>
                     </div>
                 </div>
             )}
        </div>
    );
};

const MyBeats: React.FC = () => {
  return (
    <div className="animate-in fade-in duration-500">
      <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">My Beats</h2>
          <div className="flex gap-2">
             <button className="bg-white/5 border border-white/10 text-white px-4 py-2 rounded-lg text-sm hover:bg-white/10">Filter</button>
             <button className="bg-neon text-black px-4 py-2 rounded-lg text-sm font-bold hover:bg-white transition-colors">New Upload</button>
          </div>
      </div>
      
      <div className="bg-[#0F0F11] border border-white/5 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-white/5 text-[10px] uppercase font-mono text-gray-400">
            <tr>
                <th className="px-6 py-4">Track</th>
                <th className="px-6 py-4">Stats</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-sm text-gray-300">
            {MOCK_BEATS.map((beat) => (
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
                        <div className="flex flex-col gap-1 text-xs">
                           <span className="flex items-center gap-1 text-gray-400"><Music size={10} /> {beat.plays}</span>
                           <span className="flex items-center gap-1 text-green-500"><TrendingUp size={10} /> {beat.purchases} sold</span>
                        </div>
                    </td>
                    <td className="px-6 py-4 font-mono font-bold text-white">${beat.price}</td>
                    <td className="px-6 py-4">
                        <span className="bg-green-500/10 text-green-500 border border-green-500/20 px-2 py-0.5 rounded text-[10px] uppercase font-bold">Public</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                        <button className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors">
                            <MoreHorizontal size={16} />
                        </button>
                    </td>
                </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  );
};

const Uploads: React.FC = () => {
    return (
        <div className="animate-in fade-in duration-500 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-6">Upload New Track</h2>
            <div className="bg-[#0F0F11] border border-white/5 rounded-2xl p-6 md:p-8">
                <div className="border-2 border-dashed border-white/10 rounded-xl p-10 flex flex-col items-center justify-center mb-8 hover:border-neon/50 hover:bg-white/[0.02] transition-all cursor-pointer group">
                    <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <UploadCloud className="w-8 h-8 text-neon" />
                    </div>
                    <p className="text-white font-bold mb-2">Drag and drop audio files</p>
                    <p className="text-gray-500 text-xs">WAV, MP3, STEMS (Max 500MB)</p>
                    <button className="mt-6 bg-white/10 text-white px-6 py-2 rounded-lg text-sm font-bold hover:bg-white hover:text-black transition-colors">Browse Files</button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="space-y-4">
                        <div>
                            <label className="text-[10px] font-mono text-gray-500 uppercase font-bold mb-1 block">Title</label>
                            <input type="text" placeholder="e.g. Midnight City" className="w-full bg-black border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:border-neon outline-none" />
                        </div>
                        <div>
                            <label className="text-[10px] font-mono text-gray-500 uppercase font-bold mb-1 block">BPM</label>
                            <input type="number" placeholder="140" className="w-full bg-black border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:border-neon outline-none" />
                        </div>
                        <div>
                            <label className="text-[10px] font-mono text-gray-500 uppercase font-bold mb-1 block">Key</label>
                            <select className="w-full bg-black border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:border-neon outline-none">
                                {MUSICAL_KEYS.map(k => <option key={k} value={k}>{k}</option>)}
                            </select>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div>
                             <label className="text-[10px] font-mono text-gray-500 uppercase font-bold mb-1 block">Cover Art</label>
                             <div className="w-full aspect-square bg-black border border-white/10 rounded-lg flex items-center justify-center relative overflow-hidden group cursor-pointer">
                                 <div className="text-center p-4">
                                     <p className="text-xs text-gray-500">Upload Image</p>
                                     <p className="text-[10px] text-gray-600 mt-1">1000x1000px</p>
                                 </div>
                             </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-4 mb-8">
                     <div>
                        <label className="text-[10px] font-mono text-gray-500 uppercase font-bold mb-1 block">Tags (comma separated)</label>
                        <input type="text" placeholder="Trap, Dark, Hard..." className="w-full bg-black border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:border-neon outline-none" />
                    </div>
                     <div>
                        <label className="text-[10px] font-mono text-gray-500 uppercase font-bold mb-1 block">Pricing (Basic License)</label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                            <input type="number" placeholder="29.99" className="w-full bg-black border border-white/10 rounded-lg pl-8 pr-4 py-2.5 text-sm text-white focus:border-neon outline-none" />
                        </div>
                    </div>
                </div>

                <div className="flex justify-end gap-4">
                    <button className="text-gray-400 hover:text-white text-sm font-bold px-4">Save Draft</button>
                    <button className="bg-neon text-black px-8 py-3 rounded-xl font-bold hover:bg-white transition-colors shadow-[0_0_20px_rgba(118,100,221,0.3)]">Publish Beat</button>
                </div>
            </div>
        </div>
    );
};

const Verification: React.FC = () => {
    return (
        <div className="animate-in fade-in duration-500 max-w-2xl mx-auto">
             <div className="text-center mb-10">
                 <div className="w-16 h-16 bg-neon/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-neon/20 shadow-[0_0_30px_rgba(118,100,221,0.2)]">
                     <BadgeCheck className="w-8 h-8 text-neon" />
                 </div>
                 <h2 className="text-2xl font-bold text-white mb-2">Get Verified</h2>
                 <p className="text-gray-400 text-sm max-w-md mx-auto">Verified producers get a badge on their profile, higher visibility in search results, and instant payouts.</p>
             </div>

             <div className="bg-[#0F0F11] border border-white/5 rounded-2xl p-6 md:p-8 relative overflow-hidden">
                 {/* Status Banner */}
                 <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 flex items-start gap-3 mb-8">
                     <div className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                         <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                     </div>
                     <div>
                         <h4 className="text-blue-400 font-bold text-sm">Application Status: Not Submitted</h4>
                         <p className="text-xs text-gray-400 mt-1">Complete the requirements below to submit your application.</p>
                     </div>
                 </div>

                 <div className="space-y-6">
                     <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                         <div className="flex items-center gap-3">
                             <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                                 <CheckCircle className="w-4 h-4 text-green-500" />
                             </div>
                             <div>
                                 <p className="text-sm font-bold text-white">Profile Completion</p>
                                 <p className="text-xs text-gray-500">Avatar, Banner, Bio</p>
                             </div>
                         </div>
                         <span className="text-xs font-bold text-green-500">100%</span>
                     </div>

                     <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                         <div className="flex items-center gap-3">
                             <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                                 <UploadCloud className="w-4 h-4 text-gray-400" />
                             </div>
                             <div>
                                 <p className="text-sm font-bold text-white">Uploads</p>
                                 <p className="text-xs text-gray-500">Min. 5 beats required</p>
                             </div>
                         </div>
                         <span className="text-xs font-bold text-white">7 / 5</span>
                     </div>

                     <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                         <div className="flex items-center gap-3">
                             <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                                 <Users className="w-4 h-4 text-gray-400" />
                             </div>
                             <div>
                                 <p className="text-sm font-bold text-white">Sales / Plays</p>
                                 <p className="text-xs text-gray-500">10 Sales or 10k Plays</p>
                             </div>
                         </div>
                         <span className="text-xs font-bold text-white">3 / 10 Sales</span>
                     </div>
                 </div>

                 <div className="mt-8 pt-8 border-t border-white/5">
                     <label className="text-[10px] font-mono text-gray-500 uppercase font-bold mb-2 block">Social Proof (Instagram / Twitter)</label>
                     <div className="flex gap-2 mb-6">
                         <input type="text" placeholder="https://instagram.com/yourprofile" className="flex-grow bg-black border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:border-neon outline-none" />
                     </div>

                     <button className="w-full bg-white/5 text-gray-500 font-bold py-3 rounded-xl border border-white/5 cursor-not-allowed">
                         Submit Application
                     </button>
                     <p className="text-center text-[10px] text-gray-600 mt-2">Requirements not met yet.</p>
                 </div>
             </div>
        </div>
    );
};


// --- MAIN LAYOUT COMPONENT ---

export const Dashboard: React.FC<{notifications?: string[]}> = ({notifications = []}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const getPageTitle = () => {
      const path = location.pathname.split('/').pop();
      switch(path) {
          case 'beats': return 'My Beat Catalog';
          case 'uploads': return 'Upload Center';
          case 'verification': return 'Producer Verification';
          case 'analytics': return 'Performance Analytics';
          case 'payouts': return 'Financial Overview';
          case 'customers': return 'Customer Database';
          case 'settings': return 'System Configurations';
          case 'messages': return 'Messages';
          default: return 'Studio Command';
      }
  };

  const getPageSubtitle = () => {
      const path = location.pathname.split('/').pop();
      switch(path) {
          case 'verification': return 'Apply for verified status and badge.';
          default: return "Here's what's happening with your sound today.";
      }
  };

  return (
    <div className="min-h-screen w-full bg-[#0A0A0B] flex pt-16">
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#0A0A0B]/95 backdrop-blur-xl md:hidden flex flex-col p-6 animate-in slide-in-from-left duration-300 overflow-y-auto">
             <div className="flex items-center justify-between mb-8 shrink-0">
                 <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-neon to-purple-600 p-[1px]">
                        <div className="w-full h-full rounded-full bg-black flex items-center justify-center overflow-hidden">
                            <img src="https://picsum.photos/seed/producer_avatar/100/100" alt="Profile" className="w-full h-full object-cover opacity-80" />
                        </div>
                    </div>
                    <div>
                        <h3 className="text-white font-bold text-sm">Metro Boomin</h3>
                        <p className="text-neon text-[10px] font-mono uppercase tracking-wider">Pro Account</p>
                    </div>
                </div>
                 <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-gray-400 hover:text-white">
                    <X className="w-6 h-6" />
                </button>
            </div>
            
            <nav className="space-y-1 pb-6">
                 <div onClick={() => setIsMobileMenuOpen(false)}><NavItem to="/dash" icon={<LayoutDashboard size={18} />} label="Overview" /></div>
                 <div onClick={() => setIsMobileMenuOpen(false)}><NavItem to="/dash/beats" icon={<Music size={18} />} label="My Beats" /></div>
                 <div onClick={() => setIsMobileMenuOpen(false)}><NavItem to="/dash/uploads" icon={<UploadCloud size={18} />} label="Uploads" /></div>
                 <div onClick={() => setIsMobileMenuOpen(false)}><NavItem to="/dash/verification" icon={<BadgeCheck size={18} />} label="Verification" /></div>
                 <div onClick={() => setIsMobileMenuOpen(false)}><NavItem to="/dash/analytics" icon={<BarChart3 size={18} />} label="Analytics" /></div>
                 <div onClick={() => setIsMobileMenuOpen(false)}><NavItem to="/dash/payouts" icon={<Wallet size={18} />} label="Payouts" /></div>
                 <div onClick={() => setIsMobileMenuOpen(false)}><NavItem to="/dash/customers" icon={<Users size={18} />} label="Customers" /></div>
                 <div onClick={() => setIsMobileMenuOpen(false)}><NavItem to="/dash/messages" icon={<MessageSquare size={18} />} label="Messages" /></div>
                 
                 <div className="pt-4 pb-2">
                    <p className="px-4 text-[10px] font-mono text-gray-600 uppercase tracking-widest">System</p>
                 </div>
                 
                 <div onClick={() => setIsMobileMenuOpen(false)}><NavItem to="/dash/settings" icon={<Settings size={18} />} label="Settings" /></div>
                 
                 <button onClick={() => navigate('/')} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-500 hover:text-red-400 hover:bg-red-500/5 transition-all mt-4">
                    <LogOut size={18} />
                    <span className="font-medium text-sm">Exit Studio</span>
                </button>
            </nav>
        </div>
      )}

      {/* Desktop Sidebar Navigation */}
      <aside className="hidden md:flex flex-col w-64 border-r border-white/5 bg-[#0A0A0B] fixed h-[calc(100vh-64px)] overflow-y-auto z-20">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8 cursor-pointer hover:bg-white/5 p-2 rounded-lg transition-colors" onClick={() => navigate('/@metro_boomin')}>
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-neon to-purple-600 p-[1px]">
              <div className="w-full h-full rounded-full bg-black flex items-center justify-center overflow-hidden">
                <img src="https://picsum.photos/seed/producer_avatar/100/100" alt="Profile" className="w-full h-full object-cover opacity-80" />
              </div>
            </div>
            <div>
              <h3 className="text-white font-bold text-sm">Metro Boomin</h3>
              <p className="text-neon text-[10px] font-mono uppercase tracking-wider">Pro Account</p>
            </div>
          </div>

          <nav className="space-y-1">
            <NavItem to="/dash" icon={<LayoutDashboard size={18} />} label="Overview" />
            <NavItem to="/dash/beats" icon={<Music size={18} />} label="My Beats" />
            <NavItem to="/dash/uploads" icon={<UploadCloud size={18} />} label="Uploads" />
            <NavItem to="/dash/verification" icon={<BadgeCheck size={18} />} label="Verification" />
            <NavItem to="/dash/analytics" icon={<BarChart3 size={18} />} label="Analytics" />
            <NavItem to="/dash/payouts" icon={<Wallet size={18} />} label="Payouts" />
            <NavItem to="/dash/customers" icon={<Users size={18} />} label="Customers" />
            <NavItem to="/dash/messages" icon={<MessageSquare size={18} />} label="Messages" />
            <div className="pt-4 pb-2">
              <p className="px-4 text-[10px] font-mono text-gray-600 uppercase tracking-widest">System</p>
            </div>
            <NavItem to="/dash/settings" icon={<Settings size={18} />} label="Settings" />
            <button onClick={() => navigate('/')} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-500 hover:text-red-400 hover:bg-red-500/5 transition-all mt-2">
                <LogOut size={18} />
                <span className="font-medium text-sm">Exit Studio</span>
            </button>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 p-6 md:p-10 overflow-x-hidden min-h-[calc(100vh-64px)] pb-24 md:pb-10">
        {/* Top Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 animate-in fade-in slide-in-from-top-4 duration-500">
           <div className="flex items-center gap-4">
              <button 
                  onClick={() => setIsMobileMenuOpen(true)}
                  className="md:hidden p-2 bg-white/5 border border-white/10 rounded-lg text-gray-300 hover:text-white"
              >
                  <Menu size={24} />
              </button>
              <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-white mb-1">{getPageTitle()}</h1>
                  <p className="text-gray-400 text-sm font-mono hidden md:block">{getPageSubtitle()}</p>
              </div>
           </div>
           
           <div className="flex items-center gap-4 self-end md:self-auto">
              <button className="relative p-2 text-gray-400 hover:text-white transition-colors">
                 <Bell size={20} />
                 {notifications.length > 0 && (
                     <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-neon rounded-full shadow-[0_0_5px_rgba(118,100,221,0.8)]"></span>
                 )}
                 {notifications.length > 0 && (
                     <div className="absolute right-0 top-full mt-2 w-64 bg-[#0A0A0B] border border-white/10 rounded-xl p-2 shadow-2xl z-50">
                         {notifications.map((note, i) => (
                             <div key={i} className="text-xs p-2 text-white border-b border-white/5 last:border-0">{note}</div>
                         ))}
                     </div>
                 )}
              </button>
              <button onClick={() => navigate('/dash/uploads')} className="bg-neon text-black font-bold px-4 py-2 md:px-6 md:py-2.5 rounded-lg flex items-center gap-2 hover:bg-white transition-colors shadow-[0_0_20px_rgba(118,100,221,0.3)] text-xs md:text-sm">
                 <UploadCloud size={16} className="md:w-[18px] md:h-[18px]" />
                 <span>Upload Beat</span>
              </button>
           </div>
        </div>

        {/* Dynamic Routes */}
        <Routes>
            <Route path="/" element={<Overview />} />
            <Route path="/beats" element={<MyBeats />} />
            <Route path="/uploads" element={<Uploads />} />
            <Route path="/verification" element={<Verification />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/payouts" element={<Payouts />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/messages" element={<Messages />} />
        </Routes>

      </main>
    </div>
  );
};

// --- Helper Components ---
const NavItem = ({ icon, label, to }: { icon: React.ReactNode, label: string, to: string }) => {
  const location = useLocation();
  const active = to === '/dash' 
    ? location.pathname === '/dash' 
    : location.pathname.startsWith(to);

  return (
    <Link to={to} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
       active 
       ? 'bg-neon/10 text-neon border border-neon/20 shadow-[0_0_15px_rgba(118,100,221,0.1)]' 
       : 'text-gray-400 hover:text-white hover:bg-white/5'
    }`}>
       <span className={`${active ? 'text-neon' : 'text-gray-500 group-hover:text-white'}`}>{icon}</span>
       <span className="font-medium text-sm">{label}</span>
    </Link>
  );
};
