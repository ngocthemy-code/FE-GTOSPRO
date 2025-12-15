import React, { useState } from 'react';
import { 
  Ship, 
  Calendar, 
  RefreshCw, 
  Box, 
  CheckCircle2, 
  Clock, 
  Truck, 
  Anchor, 
  FileText,
  AlertCircle, 
  ArrowRightLeft, 
  Search, 
  MoreHorizontal,
  ChevronDown,
  Timer,
  Filter,
  Download,
  Activity,
  Warehouse,
  ClipboardList
} from 'lucide-react';
import { 
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer
} from 'recharts';

// --- MOCK DATA ---

const VESSEL_INFO = {
  name: "MV. GLORY STAR (V.2506) - Hàng Rời",
  start: "17/06/2025 08:00",
  end: "19/06/2025 14:00",
  total: 45000,
  done: 28500,
  remain: 16500,
  percent: 63
};

const HATCHES = [
  { id: 1, name: 'Hầm 1', progress: 98, status: 'active', crane: null, color: 'bg-slate-700' },
  { id: 2, name: 'Hầm 2', progress: 65, status: 'active', crane: 'Cẩu 01', color: 'bg-slate-700' },
  { id: 3, name: 'Hầm 3', progress: 33, status: 'pending', crane: 'Cẩu 02', color: 'bg-slate-200 text-slate-600' },
  { id: 4, name: 'Hầm 4', progress: 100, status: 'completed', crane: null, color: 'bg-green-400' },
  { id: 5, name: 'Hầm 5', progress: 20, status: 'pending', crane: 'Cẩu 03', color: 'bg-slate-200 text-slate-600' },
];

const CRANES = [
  { id: 'C01', name: 'Cẩu 01 (Liebherr)', location: 'Hầm 2', status: 'active', trucks: ['XD-01', 'XD-02', 'XD-05', 'XD-08'] },
  { id: 'C02', name: 'Cẩu 02 (Kocks)', location: 'Hầm 3', status: 'active', trucks: ['XD-12', 'XD-14', 'XD-15'] },
  { id: 'C03', name: 'Cẩu 03 (Kocks)', location: 'Hầm 5', status: 'idle', trucks: ['XD-22', 'XD-24'] },
  { id: 'C04', name: 'Cẩu 04 (Gottwald)', location: '--', status: 'offline', trucks: [] },
];

const BILLS = [
  { stt: 1, bill: 'COSU123456', hatch: 'Hầm 2', cargo: 'Than đá', owner: 'Nhiệt điện TB', total: 5000, done: 3500 },
  { stt: 2, bill: 'HLCU987654', hatch: 'Hầm 3', cargo: 'Quặng sắt', owner: 'Hòa Phát Steel', total: 8000, done: 2500 },
  { stt: 3, bill: 'MSCU111222', hatch: 'Hầm 5', cargo: 'Than đá', owner: 'Xi măng HP', total: 3000, done: 600 },
  { stt: 4, bill: 'ONEY555666', hatch: 'Hầm 1', cargo: 'Thép lá', owner: 'Nhiệt điện TB', total: 9000, done: 9000 },
];

const RECONCILIATION_DATA = [
  { stt: 1, date: '17/06/2025', shift: 'Ca 1', manifest: 15000, tallyCrane: 15050, tallyYard: 14990, diff: -10, note: 'Hao hụt vận chuyển' },
  { stt: 2, date: '17/06/2025', shift: 'Ca 2', manifest: 15000, tallyCrane: 15020, tallyYard: 15010, diff: 10, note: 'Bình thường' },
  { stt: 3, date: '17/06/2025', shift: 'Ca 3', manifest: 15000, tallyCrane: 15030, tallyYard: 14950, diff: -50, note: 'Đang kiểm tra lại' },
];

const CRANE_TALLY_LOG = [
  { stt: 1, device: 'Cẩu 01', hatch: 'Hầm 1', vehicle: '29C-120.30', time: '17/06/2025 10:30', cargo: 'Than đá', weight: 32975, tallyman: 'Nguyễn Văn A' },
  { stt: 2, device: 'Cẩu 02', hatch: 'Hầm 2', vehicle: '29C-121.31', time: '17/06/2025 10:31', cargo: 'Than đá', weight: 32616, tallyman: 'Nguyễn Văn A' },
  { stt: 3, device: 'Cẩu 03', hatch: 'Hầm 3', vehicle: '29C-122.32', time: '17/06/2025 10:32', cargo: 'Than đá', weight: 33352, tallyman: 'Nguyễn Văn A' },
  { stt: 4, device: 'Cẩu 01', hatch: 'Hầm 4', vehicle: '29C-123.33', time: '17/06/2025 10:33', cargo: 'Than đá', weight: 31612, tallyman: 'Nguyễn Văn A' },
  { stt: 5, device: 'Cẩu 02', hatch: 'Hầm 5', vehicle: '29C-124.34', time: '17/06/2025 10:34', cargo: 'Than đá', weight: 34655, tallyman: 'Nguyễn Văn A' },
  { stt: 6, device: 'Cẩu 03', hatch: 'Hầm 1', vehicle: '29C-125.35', time: '17/06/2025 10:35', cargo: 'Than đá', weight: 30237, tallyman: 'Nguyễn Văn A' },
  { stt: 7, device: 'Cẩu 01', hatch: 'Hầm 2', vehicle: '29C-126.36', time: '17/06/2025 10:36', cargo: 'Than đá', weight: 34194, tallyman: 'Nguyễn Văn A' },
  { stt: 8, device: 'Cẩu 02', hatch: 'Hầm 3', vehicle: '29C-127.37', time: '17/06/2025 10:37', cargo: 'Than đá', weight: 30110, tallyman: 'Nguyễn Văn A' },
];

const YARD_TALLY_LOG = [
  { stt: 1, location: 'Bãi A - Lô 1', device: 'Máy xúc MX-01', vehicle: '29C-120.30', timeIn: '17/06/2025 10:15', timeOut: '17/06/2025 10:27', cargo: 'Than đá', weight: 32789, weigher: 'Trần Văn B' },
  { stt: 2, location: 'Bãi B - Lô 1', device: 'Máy xúc MX-02', vehicle: '29C-121.31', timeIn: '17/06/2025 10:17', timeOut: '17/06/2025 10:29', cargo: 'Than đá', weight: 33311, weigher: 'Trần Văn B' },
  { stt: 3, location: 'Bãi C - Lô 1', device: 'Băng tải T1', vehicle: '29C-122.32', timeIn: '17/06/2025 10:19', timeOut: '17/06/2025 10:31', cargo: 'Than đá', weight: 31795, weigher: 'Trần Văn B' },
  { stt: 4, location: 'Bãi A - Lô 1', device: 'Máy xúc MX-01', vehicle: '29C-123.33', timeIn: '17/06/2025 10:21', timeOut: '17/06/2025 10:33', cargo: 'Than đá', weight: 32710, weigher: 'Trần Văn B' },
  { stt: 5, location: 'Bãi B - Lô 1', device: 'Máy xúc MX-02', vehicle: '29C-124.34', timeIn: '17/06/2025 10:23', timeOut: '17/06/2025 10:35', cargo: 'Than đá', weight: 33886, weigher: 'Trần Văn B' },
  { stt: 6, location: 'Bãi C - Lô 2', device: 'Băng tải T1', vehicle: '29C-125.35', timeIn: '17/06/2025 10:25', timeOut: '17/06/2025 10:37', cargo: 'Than đá', weight: 31140, weigher: 'Trần Văn B' },
  { stt: 7, location: 'Bãi A - Lô 2', device: 'Máy xúc MX-01', vehicle: '29C-126.36', timeIn: '17/06/2025 10:27', timeOut: '17/06/2025 10:39', cargo: 'Than đá', weight: 33147, weigher: 'Trần Văn B' },
];

// --- COMPONENTS ---

const StatusBadge = ({ status }: { status: string }) => {
  if (status === 'active') return <span className="bg-green-100 text-green-700 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase border border-green-200">Hoạt động</span>;
  if (status === 'idle') return <span className="bg-orange-100 text-orange-700 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase border border-orange-200">Đang rảnh</span>;
  return <span className="bg-gray-100 text-gray-500 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase border border-gray-200">--</span>;
};

export const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'operations' | 'reconciliation'>('operations');
  const [reconciliationView, setReconciliationView] = useState<'summary' | 'crane' | 'yard'>('summary');

  // --- TOP FILTER BAR ---
  const renderHeader = () => (
    <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div className="flex flex-col gap-1">
        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Tàu khai thác</label>
        <div className="flex items-center gap-2">
           <div className="bg-blue-50 p-2 rounded-lg text-blue-600">
              <Ship size={20} />
           </div>
           <select className="text-lg font-bold text-gray-800 bg-transparent outline-none cursor-pointer hover:text-blue-600 transition-colors">
              <option>MV. GLORY STAR (V.2506) - Hàng Rời</option>
              <option>MV. OCEAN DRAGON (V.2201) - Container</option>
           </select>
        </div>
      </div>

      <div className="flex gap-8 text-sm">
         <div>
            <span className="block text-[10px] font-bold text-gray-400 uppercase">Bắt đầu</span>
            <span className="font-semibold text-gray-700">{VESSEL_INFO.start}</span>
         </div>
         <div>
            <span className="block text-[10px] font-bold text-gray-400 uppercase">Dự kiến xong</span>
            <span className="font-semibold text-gray-700">{VESSEL_INFO.end}</span>
         </div>
      </div>

      <button className="flex items-center gap-2 px-4 py-2 bg-white border border-blue-200 text-blue-600 rounded-lg hover:bg-blue-50 font-medium transition-colors shadow-sm text-sm">
         <RefreshCw size={16} /> Nạp dữ liệu
      </button>
    </div>
  );

  // --- OPERATIONS TAB CONTENT ---
  const renderOperationsTab = () => (
    <div className="animate-fade-in space-y-6">
       
       {/* 1. KPI CARDS */}
       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-all">
             <div className="absolute right-0 top-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity"><Box size={80}/></div>
             <p className="text-xs font-bold text-gray-400 uppercase mb-1">Tổng khai thác</p>
             <div className="flex items-end gap-2">
                <span className="text-3xl font-bold text-gray-800">{VESSEL_INFO.total.toLocaleString()}</span>
                <span className="text-sm font-medium text-gray-500 mb-1">Tấn</span>
             </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-all">
             <div className="absolute right-0 top-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity"><CheckCircle2 size={80} className="text-green-600"/></div>
             <div className="flex justify-between items-start mb-1">
                <p className="text-xs font-bold text-gray-400 uppercase">Đã hoàn thành</p>
                <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-0.5 rounded-full">{VESSEL_INFO.percent}%</span>
             </div>
             <div className="flex items-end gap-2">
                <span className="text-3xl font-bold text-green-600">{VESSEL_INFO.done.toLocaleString()}</span>
                <span className="text-sm font-medium text-green-600 mb-1">Tấn</span>
             </div>
             <div className="w-full bg-gray-100 h-1.5 rounded-full mt-3 overflow-hidden">
                <div className="h-full bg-green-500 rounded-full" style={{ width: `${VESSEL_INFO.percent}%` }}></div>
             </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-all">
             <div className="absolute right-0 top-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity"><Clock size={80} className="text-orange-500"/></div>
             <p className="text-xs font-bold text-gray-400 uppercase mb-1">Còn lại</p>
             <div className="flex items-end gap-2">
                <span className="text-3xl font-bold text-orange-500">{VESSEL_INFO.remain.toLocaleString()}</span>
                <span className="text-sm font-medium text-orange-500 mb-1">Tấn</span>
             </div>
             <div className="flex items-center gap-1 mt-3 text-xs text-gray-400">
                <Timer size={12} /> Ước tính: 18 giờ
             </div>
          </div>
       </div>

       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* 2. HATCH DIAGRAM (Sơ đồ hầm hàng) */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
             <div className="flex justify-between items-center mb-8">
                <h3 className="font-bold text-gray-800 flex items-center gap-2">
                   <Anchor size={18} className="text-blue-600" /> SƠ ĐỒ KHAI THÁC HẦM HÀNG
                </h3>
                <div className="flex gap-4 text-xs">
                   <div className="flex items-center gap-1.5"><div className="w-3 h-3 bg-slate-700 rounded-sm"></div> Đang làm</div>
                   <div className="flex items-center gap-1.5"><div className="w-3 h-3 bg-green-400 rounded-sm"></div> Hoàn thành</div>
                   <div className="flex items-center gap-1.5"><div className="w-3 h-3 bg-slate-200 rounded-sm"></div> Chưa bắt đầu</div>
                </div>
             </div>

             <div className="grid grid-cols-5 gap-4 h-64">
                {HATCHES.map((hatch) => (
                   <div key={hatch.id} className="relative flex flex-col h-full group">
                      {/* Crane Badge */}
                      <div className="h-10 flex justify-center items-end pb-2">
                         {hatch.crane && (
                            <span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded shadow-md transform group-hover:-translate-y-1 transition-transform">
                               {hatch.crane}
                            </span>
                         )}
                      </div>
                      
                      {/* Hatch Block */}
                      <div className={`flex-1 rounded-lg ${hatch.color} ${hatch.status !== 'pending' ? 'text-white' : ''} flex flex-col items-center justify-center relative overflow-hidden shadow-sm border border-black/5`}>
                         <span className="text-3xl font-black opacity-90 z-10">{hatch.progress}%</span>
                         
                         {/* Liquid Fill Effect for Active Hatches */}
                         {hatch.status === 'active' && (
                            <div className="absolute bottom-0 left-0 right-0 bg-white/10" style={{ height: `${hatch.progress}%` }}></div>
                         )}
                      </div>

                      {/* Hatch Name */}
                      <div className="text-center mt-3 font-bold text-gray-600 text-sm">{hatch.name}</div>
                      <div className="text-center text-[10px] text-gray-400">Than đá</div>
                   </div>
                ))}
             </div>
          </div>

          {/* 3. EQUIPMENT STATUS (Trạng thái thiết bị) */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 flex flex-col">
             <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-gray-800">TRẠNG THÁI THIẾT BỊ</h3>
                <span className="text-xs font-medium text-gray-400 bg-gray-50 px-2 py-1 rounded">Live</span>
             </div>
             
             <div className="flex-1 overflow-y-auto pr-2 space-y-4 custom-scrollbar">
                {CRANES.map((crane) => (
                   <div key={crane.id} className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                      <div className="flex justify-between items-start mb-2">
                         <div>
                            <div className="flex items-center gap-2">
                               <div className={`w-2 h-2 rounded-full ${crane.status === 'active' ? 'bg-green-500 animate-pulse' : crane.status === 'idle' ? 'bg-orange-400' : 'bg-red-400'}`}></div>
                               <span className="font-bold text-sm text-gray-700">{crane.name}</span>
                            </div>
                            <div className="text-xs text-gray-500 mt-0.5 ml-4">Vị trí: <span className="font-semibold text-blue-600">{crane.location}</span></div>
                         </div>
                         <StatusBadge status={crane.status} />
                      </div>
                      
                      {crane.trucks.length > 0 ? (
                         <div className="mt-2 flex flex-wrap gap-1.5 ml-4">
                            <span className="text-[10px] text-gray-400 flex items-center gap-1"><Truck size={10}/> Phục vụ:</span>
                            {crane.trucks.map(truck => (
                               <span key={truck} className="bg-white border border-gray-200 text-gray-600 text-[10px] px-1.5 py-0.5 rounded shadow-sm">
                                  {truck}
                               </span>
                            ))}
                         </div>
                      ) : (
                         <div className="mt-2 ml-4 text-[10px] text-gray-400 italic">Không có xe phân bổ</div>
                      )}
                   </div>
                ))}
             </div>
          </div>
       </div>

       {/* 4. DETAILS TABLE (Chi tiết vận đơn) */}
       <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
             <h3 className="font-bold text-gray-800 text-sm uppercase">Chi Tiết Vận Đơn</h3>
             <button className="text-blue-600 text-xs font-bold hover:underline">Xem tất cả</button>
          </div>
          <table className="w-full text-left text-sm">
             <thead className="bg-white text-gray-500 font-semibold border-b border-gray-100 text-xs uppercase">
                <tr>
                   <th className="px-6 py-3">STT</th>
                   <th className="px-6 py-3">Số vận đơn</th>
                   <th className="px-6 py-3">Hầm hàng</th>
                   <th className="px-6 py-3">Loại hàng</th>
                   <th className="px-6 py-3">Chủ hàng</th>
                   <th className="px-6 py-3 text-right">Tổng lượng (Tấn)</th>
                   <th className="px-6 py-3 text-right">Đã dỡ (Tấn)</th>
                   <th className="px-6 py-3 text-center">Tiến độ</th>
                </tr>
             </thead>
             <tbody className="divide-y divide-gray-50">
                {BILLS.map((row, idx) => (
                   <tr key={idx} className="hover:bg-blue-50/30 transition-colors">
                      <td className="px-6 py-3 text-gray-400">{row.stt}</td>
                      <td className="px-6 py-3 font-bold text-gray-800">{row.bill}</td>
                      <td className="px-6 py-3 text-blue-600 font-medium">{row.hatch}</td>
                      <td className="px-6 py-3">{row.cargo}</td>
                      <td className="px-6 py-3 text-gray-600">{row.owner}</td>
                      <td className="px-6 py-3 text-right font-medium">{row.total.toLocaleString()}</td>
                      <td className="px-6 py-3 text-right font-bold text-green-600">{row.done.toLocaleString()}</td>
                      <td className="px-6 py-3">
                         <div className="w-24 mx-auto bg-gray-200 rounded-full h-1.5 overflow-hidden">
                            <div className="bg-blue-500 h-full rounded-full" style={{ width: `${(row.done/row.total)*100}%` }}></div>
                         </div>
                      </td>
                   </tr>
                ))}
             </tbody>
          </table>
       </div>
    </div>
  );

  // --- RECONCILIATION SUB-VIEWS ---

  const renderReconciliationSummary = () => (
    <>
       {/* 1. Comparison Cards */}
       <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
             <p className="text-xs font-bold text-gray-400 uppercase mb-2">Tổng vận đơn (Manifest)</p>
             <div className="text-3xl font-bold text-blue-700">45,000 <span className="text-sm font-medium text-gray-400">Tấn</span></div>
             <div className="mt-2 text-xs text-gray-400 flex items-center gap-1"><FileText size={12}/> Theo hồ sơ tàu</div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
             <p className="text-xs font-bold text-gray-400 uppercase mb-2">Tally đầu cần (Crane)</p>
             <div className="text-3xl font-bold text-orange-600">45,100 <span className="text-sm font-medium text-gray-400">Tấn</span></div>
             <div className="mt-2 text-xs text-gray-400 flex items-center gap-1"><Anchor size={12}/> Sản lượng qua cầu</div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
             <p className="text-xs font-bold text-gray-400 uppercase mb-2">Tally bãi (Yard)</p>
             <div className="text-3xl font-bold text-green-600">44,950 <span className="text-sm font-medium text-gray-400">Tấn</span></div>
             <div className="mt-2 text-xs text-gray-400 flex items-center gap-1"><Box size={12}/> Thực nhập kho bãi</div>
          </div>
          <div className="bg-red-50 p-6 rounded-2xl border border-red-100 shadow-sm">
             <p className="text-xs font-bold text-red-400 uppercase mb-2">Chênh lệch (Bãi - VĐ)</p>
             <div className="text-3xl font-bold text-red-600">-50 <span className="text-sm font-medium text-red-400">Tấn</span></div>
             <div className="mt-2 text-xs font-bold text-red-500 bg-red-100 inline-block px-2 py-0.5 rounded">-0.11%</div>
          </div>
       </div>

       {/* 2. Detailed Table */}
       <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
             <h3 className="font-bold text-gray-800 text-sm uppercase flex items-center gap-2">
                <ArrowRightLeft size={16} className="text-blue-600"/> Bảng Chi Tiết Số Liệu
             </h3>
             <div className="flex gap-2">
                <button className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"><Filter size={16}/></button>
                <button className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"><Download size={16}/></button>
             </div>
          </div>
          <table className="w-full text-left text-sm">
             <thead className="bg-white text-gray-500 font-semibold border-b border-gray-100 text-xs uppercase">
                <tr>
                   <th className="px-6 py-4">STT</th>
                   <th className="px-6 py-4">Ngày</th>
                   <th className="px-6 py-4">Ca làm việc</th>
                   <th className="px-6 py-4 text-right text-blue-700">Vận đơn (Manifest)</th>
                   <th className="px-6 py-4 text-right text-orange-600">Tally Đầu Cần</th>
                   <th className="px-6 py-4 text-right text-green-600">Tally Bãi</th>
                   <th className="px-6 py-4 text-right">Chênh lệch</th>
                   <th className="px-6 py-4">Ghi chú</th>
                </tr>
             </thead>
             <tbody className="divide-y divide-gray-50">
                {RECONCILIATION_DATA.map((row) => (
                   <tr key={row.stt} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-gray-400">{row.stt}</td>
                      <td className="px-6 py-4 font-medium text-gray-700">{row.date}</td>
                      <td className="px-6 py-4 font-bold text-gray-800">{row.shift}</td>
                      <td className="px-6 py-4 text-right font-medium text-blue-700 bg-blue-50/30">{row.manifest.toLocaleString()}</td>
                      <td className="px-6 py-4 text-right font-medium text-orange-600 bg-orange-50/30">{row.tallyCrane.toLocaleString()}</td>
                      <td className="px-6 py-4 text-right font-medium text-green-600 bg-green-50/30">{row.tallyYard.toLocaleString()}</td>
                      <td className={`px-6 py-4 text-right font-bold ${row.diff < 0 ? 'text-red-500' : 'text-green-500'}`}>
                         {row.diff > 0 ? '+' : ''}{row.diff}
                      </td>
                      <td className="px-6 py-4 text-xs text-gray-500 italic">{row.note}</td>
                   </tr>
                ))}
                {/* Total Row */}
                <tr className="bg-gray-100 font-bold border-t border-gray-200">
                   <td colSpan={3} className="px-6 py-4 text-right uppercase text-gray-600">Tổng cộng</td>
                   <td className="px-6 py-4 text-right text-blue-700">45,000</td>
                   <td className="px-6 py-4 text-right text-orange-600">45,100</td>
                   <td className="px-6 py-4 text-right text-green-600">44,950</td>
                   <td className="px-6 py-4 text-right text-red-500">-50</td>
                   <td></td>
                </tr>
             </tbody>
          </table>
       </div>
    </>
  );

  const renderCraneTallyLog = () => (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden animate-fade-in">
        <div className="px-6 py-4 border-b border-gray-100 bg-white flex justify-between items-center">
            <div className="flex flex-col">
                <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-orange-50 text-orange-600 rounded-lg">
                        <ClipboardList size={18} />
                    </div>
                    <h3 className="font-bold text-gray-800 text-sm uppercase">NHẬT KÝ TALLY ĐẦU CẦN</h3>
                </div>
                <p className="text-xs text-gray-400 mt-1 pl-8">Dữ liệu chi tiết từ cầu tàu</p>
            </div>
            
            <div className="flex gap-3">
                <div className="relative">
                    <input className="pl-9 pr-4 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-400 w-64" placeholder="Tìm số xe..." />
                    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
                <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-300 text-gray-600 rounded hover:bg-gray-50 text-xs font-medium transition-colors">
                    <RefreshCw size={14} /> <span>Làm mới</span>
                </button>
            </div>
        </div>
        
        <table className="w-full text-left text-sm">
            <thead className="bg-[#FFF8F1] text-orange-800 font-bold border-b border-orange-100 text-xs uppercase">
                <tr>
                    <th className="px-6 py-3 w-16 text-center">STT</th>
                    <th className="px-6 py-3">Thiết bị</th>
                    <th className="px-6 py-3">Hầm hàng</th>
                    <th className="px-6 py-3">Số xe / Số Romooc</th>
                    <th className="px-6 py-3">Thời gian</th>
                    <th className="px-6 py-3">Loại hàng</th>
                    <th className="px-6 py-3 text-right">KL Tịnh (KG)</th>
                    <th className="px-6 py-3">Tallyman</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
                {CRANE_TALLY_LOG.map((row) => (
                    <tr key={row.stt} className="hover:bg-orange-50/30 transition-colors">
                        <td className="px-6 py-3 text-center text-gray-400">{row.stt}</td>
                        <td className="px-6 py-3 font-medium text-gray-700 flex items-center gap-2">
                            <Anchor size={12} className="text-orange-400"/> {row.device}
                        </td>
                        <td className="px-6 py-3 text-blue-600 font-medium">{row.hatch}</td>
                        <td className="px-6 py-3 font-bold text-gray-800 flex items-center gap-2">
                            <Truck size={12} className="text-gray-400"/> {row.vehicle}
                        </td>
                        <td className="px-6 py-3 text-gray-600">{row.time}</td>
                        <td className="px-6 py-3">{row.cargo}</td>
                        <td className="px-6 py-3 text-right font-bold text-orange-700">{row.weight.toLocaleString()}</td>
                        <td className="px-6 py-3 text-gray-500 italic text-xs">{row.tallyman}</td>
                    </tr>
                ))}
            </tbody>
        </table>
        {/* Pagination placeholder */}
        <div className="p-3 border-t border-gray-100 flex justify-center">
            <span className="text-xs text-gray-400">Hiển thị 8 / 120 dòng</span>
        </div>
    </div>
  );

  const renderYardTallyLog = () => (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden animate-fade-in">
        <div className="px-6 py-4 border-b border-gray-100 bg-white flex justify-between items-center">
            <div className="flex flex-col">
                <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-green-50 text-green-600 rounded-lg">
                        <Warehouse size={18} />
                    </div>
                    <h3 className="font-bold text-gray-800 text-sm uppercase">NHẬT KÝ TALLY BÃI</h3>
                </div>
                <p className="text-xs text-gray-400 mt-1 pl-8">Dữ liệu chi tiết từ trạm cân/bãi</p>
            </div>
            
            <div className="flex gap-3">
                <div className="relative">
                    <input className="pl-9 pr-4 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-400 w-64" placeholder="Tìm số xe..." />
                    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
                <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-300 text-gray-600 rounded hover:bg-gray-50 text-xs font-medium transition-colors">
                    <RefreshCw size={14} /> <span>Làm mới</span>
                </button>
            </div>
        </div>
        
        <table className="w-full text-left text-sm">
            <thead className="bg-[#F0FDF4] text-green-800 font-bold border-b border-green-100 text-xs uppercase">
                <tr>
                    <th className="px-6 py-3 w-16 text-center">STT</th>
                    <th className="px-6 py-3">Vị trí bãi</th>
                    <th className="px-6 py-3">Thiết bị</th>
                    <th className="px-6 py-3">Số xe / Số Romooc</th>
                    <th className="px-6 py-3">Giờ vào</th>
                    <th className="px-6 py-3">Giờ ra</th>
                    <th className="px-6 py-3">Loại hàng</th>
                    <th className="px-6 py-3 text-right">KL Tịnh (KG)</th>
                    <th className="px-6 py-3">Nhân viên cân</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
                {YARD_TALLY_LOG.map((row) => (
                    <tr key={row.stt} className="hover:bg-green-50/30 transition-colors">
                        <td className="px-6 py-3 text-center text-gray-400">{row.stt}</td>
                        <td className="px-6 py-3 font-medium text-gray-700 flex items-center gap-2">
                            <Box size={12} className="text-green-500"/> {row.location}
                        </td>
                        <td className="px-6 py-3 text-gray-600 font-medium text-xs">{row.device}</td>
                        <td className="px-6 py-3 font-bold text-gray-800 flex items-center gap-2">
                            <Truck size={12} className="text-gray-400"/> {row.vehicle}
                        </td>
                        <td className="px-6 py-3 text-green-600 text-xs"><Clock size={10} className="inline mr-1"/>{row.timeIn}</td>
                        <td className="px-6 py-3 text-orange-500 text-xs"><Clock size={10} className="inline mr-1"/>{row.timeOut}</td>
                        <td className="px-6 py-3">{row.cargo}</td>
                        <td className="px-6 py-3 text-right font-bold text-green-700">{row.weight.toLocaleString()}</td>
                        <td className="px-6 py-3 text-gray-500 italic text-xs">{row.weigher}</td>
                    </tr>
                ))}
            </tbody>
        </table>
        {/* Pagination placeholder */}
        <div className="p-3 border-t border-gray-100 flex justify-center">
            <span className="text-xs text-gray-400">Hiển thị 7 / 85 dòng</span>
        </div>
    </div>
  );

  // --- RECONCILIATION TAB WRAPPER ---
  const renderReconciliationTab = () => (
    <div className="animate-fade-in space-y-6">
        {/* Sub-Navigation Buttons */}
        <div className="flex gap-4 border-b border-gray-200 pb-2 mb-4">
            <button 
                onClick={() => setReconciliationView('summary')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all border
                    ${reconciliationView === 'summary' 
                        ? 'bg-white border-blue-200 text-blue-600 shadow-sm' 
                        : 'bg-transparent border-transparent text-gray-500 hover:bg-gray-100 hover:text-gray-700'
                    }
                `}
            >
                <ArrowRightLeft size={16} />
                ĐỐI CHIẾU
            </button>
            <button 
                onClick={() => setReconciliationView('crane')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all border
                    ${reconciliationView === 'crane' 
                        ? 'bg-white border-orange-200 text-orange-600 shadow-sm' 
                        : 'bg-transparent border-transparent text-gray-500 hover:bg-gray-100 hover:text-gray-700'
                    }
                `}
            >
                <Anchor size={16} />
                TALLY ĐẦU CẦN
            </button>
            <button 
                onClick={() => setReconciliationView('yard')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all border
                    ${reconciliationView === 'yard' 
                        ? 'bg-white border-green-200 text-green-600 shadow-sm' 
                        : 'bg-transparent border-transparent text-gray-500 hover:bg-gray-100 hover:text-gray-700'
                    }
                `}
            >
                <Warehouse size={16} />
                TALLY BÃI
            </button>
        </div>

        {/* Dynamic Content */}
        {reconciliationView === 'summary' && renderReconciliationSummary()}
        {reconciliationView === 'crane' && renderCraneTallyLog()}
        {reconciliationView === 'yard' && renderYardTallyLog()}
    </div>
  );

  return (
    <div className="p-6 md:p-8 min-h-full font-sans bg-[#F5F7FA]">
      
      {/* HEADER SECTION */}
      {renderHeader()}

      {/* TAB SWITCHER */}
      <div className="flex items-center gap-1 bg-white p-1 rounded-xl w-fit border border-gray-200 mb-6 shadow-sm">
         <button 
            onClick={() => setActiveTab('operations')}
            className={`px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all ${activeTab === 'operations' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}
         >
            <Activity size={16} /> Giám sát Khai thác
         </button>
         <button 
            onClick={() => setActiveTab('reconciliation')}
            className={`px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all ${activeTab === 'reconciliation' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}
         >
            <ArrowRightLeft size={16} /> Đối chiếu Tàu-Bãi
         </button>
      </div>

      {/* DYNAMIC CONTENT */}
      {activeTab === 'operations' ? renderOperationsTab() : renderReconciliationTab()}

    </div>
  );
};