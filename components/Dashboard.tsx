
import React, { useState } from 'react';
import { 
  Ship, 
  Box, 
  CheckCircle2, 
  Clock, 
  Truck, 
  Anchor, 
  FileText,
  ArrowRightLeft, 
  Timer,
  Filter,
  Download,
  Activity,
  ClipboardList
} from 'lucide-react';

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
  { id: 4, name: 'Hầm 4', progress: 100, status: 'completed', crane: null, color: 'bg-emerald-500' },
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

// --- COMPONENTS ---

const StatusBadge = ({ status }: { status: string }) => {
  if (status === 'active') return <span className="bg-green-50 text-green-700 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase border border-green-200">Hoạt động</span>;
  if (status === 'idle') return <span className="bg-orange-50 text-orange-700 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase border border-orange-200">Đang rảnh</span>;
  return <span className="bg-slate-100 text-slate-500 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase border border-slate-200">--</span>;
};

export const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'operations' | 'reconciliation'>('operations');

  // --- TOP FILTER BAR ---
  const renderHeader = () => (
    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div className="flex flex-col gap-1">
        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Tàu khai thác</label>
        <div className="flex items-center gap-2">
           <div className="bg-blue-50 p-2 rounded-lg text-blue-600">
              <Ship size={20} />
           </div>
           <select className="text-lg font-bold text-slate-800 bg-transparent outline-none cursor-pointer hover:text-blue-600 transition-colors">
              <option>MV. GLORY STAR (V.2506) - Hàng Rời</option>
              <option>MV. OCEAN DRAGON (V.2201) - Container</option>
           </select>
        </div>
      </div>

      <div className="flex gap-8 text-sm">
         <div>
            <span className="block text-[10px] font-bold text-slate-400 uppercase">Bắt đầu</span>
            <span className="font-semibold text-slate-700">{VESSEL_INFO.start}</span>
         </div>
         <div>
            <span className="block text-[10px] font-bold text-slate-400 uppercase">Dự kiến xong</span>
            <span className="font-semibold text-slate-700">{VESSEL_INFO.end}</span>
         </div>
      </div>
    </div>
  );

  // --- OPERATIONS TAB CONTENT ---
  const renderOperationsTab = () => (
    <div className="animate-fade-in space-y-6">
       
       {/* 1. KPI CARDS */}
       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group hover:shadow-md transition-all">
             <div className="absolute right-0 top-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity"><Box size={80}/></div>
             <p className="text-xs font-bold text-slate-400 uppercase mb-1">Tổng khai thác</p>
             <div className="flex items-end gap-2">
                <span className="text-3xl font-bold text-slate-800">{VESSEL_INFO.total.toLocaleString()}</span>
                <span className="text-sm font-medium text-slate-500 mb-1">Tấn</span>
             </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group hover:shadow-md transition-all">
             <div className="absolute right-0 top-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity"><CheckCircle2 size={80} className="text-green-600"/></div>
             <div className="flex justify-between items-start mb-1">
                <p className="text-xs font-bold text-slate-400 uppercase">Đã hoàn thành</p>
                <span className="bg-green-50 text-green-700 text-xs font-bold px-2 py-0.5 rounded-full border border-green-100">{VESSEL_INFO.percent}%</span>
             </div>
             <div className="flex items-end gap-2">
                <span className="text-3xl font-bold text-green-600">{VESSEL_INFO.done.toLocaleString()}</span>
                <span className="text-sm font-medium text-green-600 mb-1">Tấn</span>
             </div>
             <div className="w-full bg-slate-100 h-1.5 rounded-full mt-3 overflow-hidden">
                <div className="h-full bg-green-500 rounded-full" style={{ width: `${VESSEL_INFO.percent}%` }}></div>
             </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group hover:shadow-md transition-all">
             <div className="absolute right-0 top-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity"><Clock size={80} className="text-orange-500"/></div>
             <p className="text-xs font-bold text-slate-400 uppercase mb-1">Còn lại</p>
             <div className="flex items-end gap-2">
                <span className="text-3xl font-bold text-orange-500">{VESSEL_INFO.remain.toLocaleString()}</span>
                <span className="text-sm font-medium text-orange-500 mb-1">Tấn</span>
             </div>
             <div className="flex items-center gap-1 mt-3 text-xs text-slate-400">
                <Timer size={12} /> Ước tính: 18 giờ
             </div>
          </div>
       </div>

       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* 2. HATCH DIAGRAM */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
             <div className="flex justify-between items-center mb-8">
                <h3 className="font-bold text-slate-800 flex items-center gap-2">
                   <Anchor size={18} className="text-blue-600" /> SƠ ĐỒ KHAI THÁC HẦM HÀNG
                </h3>
                <div className="flex gap-4 text-xs">
                   <div className="flex items-center gap-1.5"><div className="w-3 h-3 bg-slate-700 rounded-sm"></div> Đang làm</div>
                   <div className="flex items-center gap-1.5"><div className="w-3 h-3 bg-emerald-500 rounded-sm"></div> Hoàn thành</div>
                   <div className="flex items-center gap-1.5"><div className="w-3 h-3 bg-slate-200 rounded-sm"></div> Chưa bắt đầu</div>
                </div>
             </div>

             <div className="grid grid-cols-5 gap-4 h-64">
                {HATCHES.map((hatch) => (
                   <div key={hatch.id} className="relative flex flex-col h-full group">
                      <div className="h-10 flex justify-center items-end pb-2">
                         {hatch.crane && (
                            <span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded shadow-md transform group-hover:-translate-y-1 transition-transform">
                               {hatch.crane}
                            </span>
                         )}
                      </div>
                      <div className={`flex-1 rounded-lg ${hatch.color} ${hatch.status !== 'pending' ? 'text-white' : ''} flex flex-col items-center justify-center relative overflow-hidden shadow-sm border border-black/5`}>
                         <span className="text-3xl font-black opacity-90 z-10">{hatch.progress}%</span>
                         {hatch.status === 'active' && (
                            <div className="absolute bottom-0 left-0 right-0 bg-white/10" style={{ height: `${hatch.progress}%` }}></div>
                         )}
                      </div>
                      <div className="text-center mt-3 font-bold text-slate-600 text-sm">{hatch.name}</div>
                   </div>
                ))}
             </div>
          </div>

          {/* 3. EQUIPMENT STATUS */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col">
             <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-slate-800">TRẠNG THÁI THIẾT BỊ</h3>
                <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full border border-green-100">Live</span>
             </div>
             
             <div className="flex-1 overflow-y-auto pr-2 space-y-4 custom-scrollbar">
                {CRANES.map((crane) => (
                   <div key={crane.id} className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                      <div className="flex justify-between items-start mb-2">
                         <div>
                            <div className="flex items-center gap-2">
                               <div className={`w-2 h-2 rounded-full ${crane.status === 'active' ? 'bg-green-500 animate-pulse' : crane.status === 'idle' ? 'bg-orange-400' : 'bg-red-400'}`}></div>
                               <span className="font-bold text-sm text-slate-700">{crane.name}</span>
                            </div>
                            <div className="text-xs text-slate-500 mt-0.5 ml-4">Vị trí: <span className="font-semibold text-blue-600">{crane.location}</span></div>
                         </div>
                         <StatusBadge status={crane.status} />
                      </div>
                   </div>
                ))}
             </div>
          </div>
       </div>

       {/* 4. DETAILS TABLE */}
       <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200 bg-white flex justify-between items-center">
             <h3 className="font-bold text-slate-800 text-sm uppercase">Chi Tiết Vận Đơn</h3>
             <button className="text-blue-600 text-xs font-bold hover:underline">Xem tất cả</button>
          </div>
          <table className="w-full text-left text-sm">
             <thead className="bg-[#F8FAFC] text-slate-600 font-bold border-b border-slate-200 text-xs uppercase">
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
             <tbody className="divide-y divide-slate-50">
                {BILLS.map((row, idx) => (
                   <tr key={idx} className="hover:bg-blue-50/30 transition-colors">
                      <td className="px-6 py-3 text-slate-400">{row.stt}</td>
                      <td className="px-6 py-3 font-bold text-slate-800">{row.bill}</td>
                      <td className="px-6 py-3 text-blue-600 font-medium">{row.hatch}</td>
                      <td className="px-6 py-3">{row.cargo}</td>
                      <td className="px-6 py-3 text-slate-600">{row.owner}</td>
                      <td className="px-6 py-3 text-right font-medium">{row.total.toLocaleString()}</td>
                      <td className="px-6 py-3 text-right font-bold text-green-600">{row.done.toLocaleString()}</td>
                      <td className="px-6 py-3">
                         <div className="w-24 mx-auto bg-slate-200 rounded-full h-1.5 overflow-hidden">
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

  // --- RECONCILIATION CONTENT ---
  const renderReconciliationSummary = () => (
    <>
       {/* 1. Comparison Cards */}
       <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
             <p className="text-xs font-bold text-slate-400 uppercase mb-2">Tổng vận đơn (Manifest)</p>
             <div className="text-3xl font-bold text-blue-700">45,000 <span className="text-sm font-medium text-slate-400">Tấn</span></div>
             <div className="mt-2 text-xs text-slate-400 flex items-center gap-1"><FileText size={12}/> Theo hồ sơ tàu</div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
             <p className="text-xs font-bold text-slate-400 uppercase mb-2">Tally đầu cần (Crane)</p>
             <div className="text-3xl font-bold text-orange-600">45,100 <span className="text-sm font-medium text-slate-400">Tấn</span></div>
             <div className="mt-2 text-xs text-slate-400 flex items-center gap-1"><Anchor size={12}/> Sản lượng qua cầu</div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
             <p className="text-xs font-bold text-slate-400 uppercase mb-2">Tally bãi (Yard)</p>
             <div className="text-3xl font-bold text-green-600">44,950 <span className="text-sm font-medium text-slate-400">Tấn</span></div>
             <div className="mt-2 text-xs text-slate-400 flex items-center gap-1"><Box size={12}/> Thực nhập kho bãi</div>
          </div>
          <div className="bg-red-50 p-6 rounded-2xl border border-red-100 shadow-sm">
             <p className="text-xs font-bold text-red-400 uppercase mb-2">Chênh lệch (Bãi - VĐ)</p>
             <div className="text-3xl font-bold text-red-600">-50 <span className="text-sm font-medium text-red-400">Tấn</span></div>
             <div className="mt-2 text-xs font-bold text-red-500 bg-red-100 inline-block px-2 py-0.5 rounded">-0.11%</div>
          </div>
       </div>

       {/* 2. Detailed Table */}
       <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200 bg-white flex justify-between items-center">
             <h3 className="font-bold text-slate-800 text-sm uppercase flex items-center gap-2">
                <ArrowRightLeft size={16} className="text-blue-600"/> Bảng Chi Tiết Số Liệu
             </h3>
             <div className="flex gap-2">
                <button className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"><Filter size={16}/></button>
                <button className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"><Download size={16}/></button>
             </div>
          </div>
          <table className="w-full text-left text-sm">
             <thead className="bg-[#F8FAFC] text-slate-600 font-bold border-b border-slate-200 text-xs uppercase">
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
             <tbody className="divide-y divide-slate-50">
                {RECONCILIATION_DATA.map((row) => (
                   <tr key={row.stt} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 text-slate-400">{row.stt}</td>
                      <td className="px-6 py-4 font-medium text-slate-700">{row.date}</td>
                      <td className="px-6 py-4 font-bold text-slate-800">{row.shift}</td>
                      <td className="px-6 py-4 text-right font-medium text-blue-700 bg-blue-50/30">{row.manifest.toLocaleString()}</td>
                      <td className="px-6 py-4 text-right font-medium text-orange-600 bg-orange-50/30">{row.tallyCrane.toLocaleString()}</td>
                      <td className="px-6 py-4 text-right font-medium text-green-600 bg-green-50/30">{row.tallyYard.toLocaleString()}</td>
                      <td className={`px-6 py-4 text-right font-bold ${row.diff < 0 ? 'text-red-500' : 'text-green-500'}`}>
                         {row.diff > 0 ? '+' : ''}{row.diff}
                      </td>
                      <td className="px-6 py-4 text-xs text-slate-500 italic">{row.note}</td>
                   </tr>
                ))}
             </tbody>
          </table>
       </div>
    </>
  );

  return (
    <div className="p-6 md:p-8 min-h-full font-sans bg-[#F5F7FA]">
      
      {/* HEADER SECTION */}
      {renderHeader()}

      {/* TAB SWITCHER */}
      <div className="flex items-center gap-1 bg-white p-1 rounded-xl w-fit border border-slate-200 mb-6 shadow-sm">
         <button 
            onClick={() => setActiveTab('operations')}
            className={`px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all ${activeTab === 'operations' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'}`}
         >
            <Activity size={16} /> Giám sát Khai thác
         </button>
         <button 
            onClick={() => setActiveTab('reconciliation')}
            className={`px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all ${activeTab === 'reconciliation' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'}`}
         >
            <ArrowRightLeft size={16} /> Đối chiếu Tàu-Bãi
         </button>
      </div>

      {/* DYNAMIC CONTENT */}
      {activeTab === 'operations' ? renderOperationsTab() : renderReconciliationSummary()}

    </div>
  );
};
