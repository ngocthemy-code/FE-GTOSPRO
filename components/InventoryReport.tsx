
import React, { useState } from 'react';
import { 
  Database, 
  Filter, 
  Download, 
  Search, 
  RefreshCw, 
  MapPin, 
  Box, 
  Calendar,
  ArrowUpRight, 
  ArrowDownRight, 
  PieChart as PieChartIcon,
  BarChart3, 
  Layers,
  MoreHorizontal,
  FileSpreadsheet,
  Printer,
  X,
  Ship
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, AreaChart, Area
} from 'recharts';

// --- MOCK DATA ---

const INVENTORY_DATA = [
  { id: 1, zone: 'Khu A (Hàng Rời)', location: 'Bãi A1', commodity: 'Than đá (Coal)', vessel: 'MV. GLORY STAR', customer: 'Nhiệt điện TB', date: '2023-10-01', weight: 4500, capacity: 5000, status: 'Safe' },
  { id: 2, zone: 'Khu A (Hàng Rời)', location: 'Bãi A2', commodity: 'Than đá (Coal)', vessel: 'MV. GLORY STAR', customer: 'Xi măng HP', date: '2023-10-05', weight: 1200, capacity: 5000, status: 'Safe' },
  { id: 3, zone: 'Khu B (Tổng Hợp)', location: 'Kho K1', commodity: 'Thép cuộn (Coils)', vessel: 'MV. OCEAN DRAGON', customer: 'Hòa Phát', date: '2023-10-10', weight: 2800, capacity: 4000, status: 'High' },
  { id: 4, zone: 'Khu B (Tổng Hợp)', location: 'Kho K2', commodity: 'Phân bón (Fert)', vessel: 'MV. PACIFIC GRACE', customer: 'Đạm Phú Mỹ', date: '2023-10-12', weight: 800, capacity: 3000, status: 'Safe' },
  { id: 5, zone: 'Khu C (Container)', location: 'Bãi C1', commodity: 'Container 20ft', vessel: 'MV. VIET SUN', customer: 'Vận tải Biển Đông', date: '2023-10-15', weight: 1500, capacity: 8000, status: 'Safe' },
  { id: 6, zone: 'Khu A (Hàng Rời)', location: 'Bãi A3', commodity: 'Quặng sắt', vessel: 'MV. GLORY STAR', customer: 'Thép Việt Nhật', date: '2023-10-18', weight: 4900, capacity: 5000, status: 'Critical' },
  { id: 7, zone: 'Khu B (Tổng Hợp)', location: 'Kho K3', commodity: 'Gỗ dăm', vessel: 'MV. OCEAN DRAGON', customer: 'MDF VRG', date: '2023-10-20', weight: 3200, capacity: 6000, status: 'Safe' },
];

const CHART_DATA_COMMODITY = [
  { name: 'Than đá', weight: 5700 },
  { name: 'Thép', weight: 2800 },
  { name: 'Phân bón', weight: 800 },
  { name: 'Quặng', weight: 4900 },
  { name: 'Gỗ dăm', weight: 3200 },
  { name: 'Khác', weight: 1500 },
];

const CHART_DATA_ZONE = [
  { name: 'Khu A (Rời)', value: 10600 },
  { name: 'Khu B (TH)', value: 6800 },
  { name: 'Khu C (Cont)', value: 1500 },
];

// Extract unique vessels for filter
const VESSELS = Array.from(new Set(INVENTORY_DATA.map(item => item.vessel)));

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#64748B'];

export const InventoryReport: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedZone, setSelectedZone] = useState('All');
  const [selectedVessel, setSelectedVessel] = useState('All');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // Calculations
  const totalWeight = INVENTORY_DATA.reduce((acc, curr) => acc + curr.weight, 0);
  const totalCapacity = INVENTORY_DATA.reduce((acc, curr) => acc + curr.capacity, 0);
  const occupancyRate = Math.round((totalWeight / totalCapacity) * 100);

  const filteredData = INVENTORY_DATA.filter(item => {
    const matchesSearch = item.commodity.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.customer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesZone = selectedZone === 'All' || item.zone === selectedZone;
    const matchesVessel = selectedVessel === 'All' || item.vessel === selectedVessel;

    // Date filtering
    const itemDate = new Date(item.date);
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;
    
    // Normalize time to start of day for comparison
    if (start) start.setHours(0,0,0,0);
    if (end) end.setHours(23,59,59,999);
    
    const matchesStartDate = start ? itemDate >= start : true;
    const matchesEndDate = end ? itemDate <= end : true;

    return matchesSearch && matchesZone && matchesVessel && matchesStartDate && matchesEndDate;
  });

  const clearDates = () => {
    setStartDate('');
    setEndDate('');
  };

  const getStatusColor = (status: string, ratio: number) => {
    if (status === 'Critical' || ratio > 90) return 'text-red-600 bg-red-50 border-red-100';
    if (status === 'High' || ratio > 70) return 'text-orange-600 bg-orange-50 border-orange-100';
    return 'text-green-600 bg-green-50 border-green-100';
  };

  const getProgressBarColor = (ratio: number) => {
    if (ratio > 90) return 'bg-red-500';
    if (ratio > 70) return 'bg-orange-500';
    return 'bg-green-500';
  };

  return (
    <div className="flex flex-col h-full bg-[#F5F7FA]">
      
      {/* HEADER TOOLBAR */}
      <div className="bg-white px-6 py-4 border-b border-gray-200 shrink-0 flex flex-col xl:flex-row xl:items-center justify-between gap-4 sticky top-0 z-20">
        <div>
           <h2 className="text-xl font-bold text-[#0F1B3D] flex items-center gap-2">
              <Database className="text-blue-600" size={24} /> Báo Cáo Tồn Kho Bãi (Inventory)
           </h2>
           <p className="text-sm text-gray-500 mt-1">Cập nhật lúc: {new Date().toLocaleTimeString('vi-VN')} {new Date().toLocaleDateString('vi-VN')}</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
           <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                 type="text" 
                 placeholder="Tìm hàng hóa, vị trí..." 
                 className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 w-48 bg-gray-50 focus:bg-white transition-all"
                 value={searchTerm}
                 onChange={(e) => setSearchTerm(e.target.value)}
              />
           </div>

           {/* Date Range Filter */}
           <div className="flex items-center gap-2 bg-gray-50 p-1 rounded-lg border border-gray-200 group focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all">
              <div className="flex items-center gap-1 px-2">
                  <span className="text-xs font-semibold text-gray-500">Từ:</span>
                  <input 
                    type="date" 
                    className="bg-transparent text-sm text-gray-700 outline-none w-28 cursor-pointer"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
              </div>
              <div className="w-px h-4 bg-gray-300"></div>
              <div className="flex items-center gap-1 px-2">
                  <span className="text-xs font-semibold text-gray-500">Đến:</span>
                  <input 
                    type="date" 
                    className="bg-transparent text-sm text-gray-700 outline-none w-28 cursor-pointer"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
              </div>
              {(startDate || endDate) && (
                  <button onClick={clearDates} className="p-1 hover:bg-gray-200 rounded-full text-gray-400 hover:text-red-500 transition-colors">
                      <X size={14} />
                  </button>
              )}
           </div>
           
           <select 
              className="px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:border-blue-500 cursor-pointer"
              value={selectedZone}
              onChange={(e) => setSelectedZone(e.target.value)}
           >
              <option value="All">Tất cả khu vực</option>
              <option value="Khu A (Hàng Rời)">Khu A (Hàng Rời)</option>
              <option value="Khu B (Tổng Hợp)">Khu B (Tổng Hợp)</option>
              <option value="Khu C (Container)">Khu C (Container)</option>
           </select>

           <select 
              className="px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:border-blue-500 cursor-pointer max-w-[150px]"
              value={selectedVessel}
              onChange={(e) => setSelectedVessel(e.target.value)}
           >
              <option value="All">Tất cả tàu</option>
              {VESSELS.map(v => (
                  <option key={v} value={v}>{v}</option>
              ))}
           </select>

           <div className="flex items-center gap-2 border-l border-gray-200 pl-2 ml-1">
               <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Làm mới">
                  <RefreshCw size={20} />
               </button>
               <button className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors text-sm">
                  <Printer size={16} /> <span className="hidden sm:inline">In BC</span>
               </button>
               <button className="flex items-center gap-2 px-3 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 shadow-sm transition-colors text-sm">
                  <FileSpreadsheet size={16} /> <span className="hidden sm:inline">Xuất Excel</span>
               </button>
           </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-6">
         
         {/* KPI CARDS */}
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
               <div>
                  <p className="text-xs font-bold text-gray-400 uppercase mb-1">Tổng tồn kho</p>
                  <div className="text-2xl font-bold text-[#0F1B3D]">{totalWeight.toLocaleString()} <span className="text-sm font-medium text-gray-500">Tấn</span></div>
                  <div className="flex items-center gap-1 text-green-600 text-xs font-medium mt-1">
                     <ArrowUpRight size={12} /> +12.5% so với tuần trước
                  </div>
               </div>
               <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-600">
                  <Layers size={24} />
               </div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
               <div>
                  <p className="text-xs font-bold text-gray-400 uppercase mb-1">Hiệu suất sử dụng</p>
                  <div className="text-2xl font-bold text-[#0F1B3D]">{occupancyRate}% <span className="text-sm font-medium text-gray-500">Dung lượng</span></div>
                  <div className="w-24 bg-gray-200 h-1.5 rounded-full mt-2 overflow-hidden">
                     <div className={`h-full rounded-full ${getProgressBarColor(occupancyRate)}`} style={{ width: `${occupancyRate}%` }}></div>
                  </div>
               </div>
               <div className="w-12 h-12 bg-orange-50 rounded-full flex items-center justify-center text-orange-600">
                  <PieChartIcon size={24} />
               </div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
               <div>
                  <p className="text-xs font-bold text-gray-400 uppercase mb-1">Dự kiến nhập (24h)</p>
                  <div className="text-2xl font-bold text-[#0F1B3D]">2,450 <span className="text-sm font-medium text-gray-500">Tấn</span></div>
                  <div className="flex items-center gap-1 text-blue-600 text-xs font-medium mt-1">
                     <ArrowDownRight size={12} /> Từ 2 tàu
                  </div>
               </div>
               <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center text-green-600">
                  <ArrowDownRight size={24} />
               </div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
               <div>
                  <p className="text-xs font-bold text-gray-400 uppercase mb-1">Dự kiến xuất (24h)</p>
                  <div className="text-2xl font-bold text-[#0F1B3D]">1,800 <span className="text-sm font-medium text-gray-500">Tấn</span></div>
                  <div className="flex items-center gap-1 text-orange-600 text-xs font-medium mt-1">
                     <ArrowUpRight size={12} /> Qua xe & sà lan
                  </div>
               </div>
               <div className="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center text-purple-600">
                  <ArrowUpRight size={24} />
               </div>
            </div>
         </div>

         {/* CHARTS SECTION */}
         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            
            {/* Main Bar Chart */}
            <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
               <div className="flex justify-between items-center mb-6">
                  <h3 className="font-bold text-gray-800 flex items-center gap-2">
                     <BarChart3 size={18} className="text-blue-500"/> Tồn kho theo loại hàng hóa
                  </h3>
               </div>
               <div className="h-72 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                     <BarChart data={CHART_DATA_COMMODITY} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} />
                        <YAxis axisLine={false} tickLine={false} />
                        <Tooltip cursor={{fill: 'transparent'}} />
                        <Bar dataKey="weight" name="Trọng lượng (Tấn)" radius={[4, 4, 0, 0]}>
                           {CHART_DATA_COMMODITY.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                           ))}
                        </Bar>
                     </BarChart>
                  </ResponsiveContainer>
               </div>
            </div>

            {/* Pie Chart */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col">
               <div className="flex justify-between items-center mb-2">
                  <h3 className="font-bold text-gray-800 flex items-center gap-2">
                     <PieChartIcon size={18} className="text-orange-500"/> Phân bổ theo khu vực
                  </h3>
               </div>
               <div className="flex-1 min-h-[250px] relative">
                  <ResponsiveContainer width="100%" height="100%">
                     <PieChart>
                        <Pie
                           data={CHART_DATA_ZONE}
                           cx="50%"
                           cy="50%"
                           innerRadius={60}
                           outerRadius={80}
                           paddingAngle={5}
                           dataKey="value"
                        >
                           {CHART_DATA_ZONE.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                           ))}
                        </Pie>
                        <Tooltip />
                        <Legend verticalAlign="bottom" height={36}/>
                     </PieChart>
                  </ResponsiveContainer>
                  {/* Center Text */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] text-center pointer-events-none">
                     <div className="text-2xl font-bold text-gray-800">3</div>
                     <div className="text-xs text-gray-500">Khu vực</div>
                  </div>
               </div>
            </div>

         </div>

         {/* DETAILED TABLE */}
         <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
               <div className="flex flex-col">
                   <h3 className="font-bold text-gray-700 uppercase text-sm">Chi tiết tồn kho</h3>
                   <div className="flex gap-2 text-xs mt-1">
                        {(startDate || endDate) && (
                            <span className="text-blue-600 font-medium bg-blue-50 px-2 py-0.5 rounded">
                                Lọc ngày: {startDate || '...'} - {endDate || '...'}
                            </span>
                        )}
                        {selectedVessel !== 'All' && (
                            <span className="text-orange-600 font-medium bg-orange-50 px-2 py-0.5 rounded">
                                Lọc tàu: {selectedVessel}
                            </span>
                        )}
                   </div>
               </div>
               <div className="flex gap-2">
                   <button className="flex items-center gap-1 px-3 py-1.5 bg-white border border-gray-300 rounded hover:bg-gray-50 text-xs font-medium text-gray-600 transition-colors">
                      <Filter size={14} /> Bộ lọc nâng cao
                   </button>
               </div>
            </div>
            <div className="overflow-x-auto">
               <table className="w-full text-left text-sm">
                  <thead className="bg-white text-gray-500 font-bold border-b border-gray-100 text-xs uppercase">
                     <tr>
                        <th className="px-6 py-3">Vị trí / Khu vực</th>
                        <th className="px-6 py-3">Tàu / Chuyến</th>
                        <th className="px-6 py-3">Hàng hóa</th>
                        <th className="px-6 py-3">Chủ hàng</th>
                        <th className="px-6 py-3">Ngày nhập</th>
                        <th className="px-6 py-3 text-right">Tồn kho (Tấn)</th>
                        <th className="px-6 py-3 text-center">Sức chứa</th>
                        <th className="px-6 py-3 text-center">Trạng thái</th>
                        <th className="px-6 py-3 text-right"></th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                     {filteredData.length > 0 ? (
                        filteredData.map((item) => {
                            const usageRatio = (item.weight / item.capacity) * 100;
                            return (
                            <tr key={item.id} className="hover:bg-blue-50/50 transition-colors group">
                                <td className="px-6 py-4">
                                    <div className="font-bold text-gray-800 flex items-center gap-2">
                                        <MapPin size={16} className="text-blue-500"/> {item.location}
                                    </div>
                                    <div className="text-xs text-gray-500 pl-6">{item.zone}</div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2 font-bold text-gray-700">
                                        <Ship size={16} className="text-gray-400"/> {item.vessel}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2 font-medium text-gray-700">
                                        <Box size={16} className="text-gray-400"/> {item.commodity}
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-gray-600">{item.customer}</td>
                                <td className="px-6 py-4 text-gray-600 flex items-center gap-2">
                                    <Calendar size={14} className="text-gray-400"/> {item.date}
                                </td>
                                <td className="px-6 py-4 text-right font-bold text-[#0F1B3D]">{item.weight.toLocaleString()}</td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <div className="flex-1 bg-gray-200 h-1.5 rounded-full overflow-hidden">
                                        <div className={`h-full rounded-full ${getProgressBarColor(usageRatio)}`} style={{ width: `${usageRatio}%` }}></div>
                                        </div>
                                        <span className="text-xs font-medium text-gray-500 w-8 text-right">{Math.round(usageRatio)}%</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${getStatusColor(item.status, usageRatio)}`}>
                                        {item.status === 'Safe' ? 'An toàn' : item.status === 'High' ? 'Cao' : 'Nguy cấp'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors opacity-0 group-hover:opacity-100">
                                        <MoreHorizontal size={16} />
                                    </button>
                                </td>
                            </tr>
                            );
                        })
                     ) : (
                        <tr>
                            <td colSpan={9} className="px-6 py-12 text-center text-gray-500">
                                <div className="flex flex-col items-center gap-2">
                                    <Search size={32} className="text-gray-300" />
                                    <p>Không tìm thấy dữ liệu phù hợp với bộ lọc.</p>
                                </div>
                            </td>
                        </tr>
                     )}
                  </tbody>
               </table>
            </div>
            
            {/* Pagination Footer */}
            <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex items-center justify-between">
               <span className="text-xs text-gray-500">Hiển thị {filteredData.length} kết quả</span>
               <div className="flex gap-1">
                  <button className="px-3 py-1 bg-white border border-gray-300 rounded text-xs font-medium text-gray-600 hover:bg-gray-50">Trước</button>
                  <button className="px-3 py-1 bg-blue-600 border border-blue-600 rounded text-xs font-medium text-white shadow-sm">1</button>
                  <button className="px-3 py-1 bg-white border border-gray-300 rounded text-xs font-medium text-gray-600 hover:bg-gray-50">2</button>
                  <button className="px-3 py-1 bg-white border border-gray-300 rounded text-xs font-medium text-gray-600 hover:bg-gray-50">Sau</button>
               </div>
            </div>
         </div>

      </div>
    </div>
  );
};
