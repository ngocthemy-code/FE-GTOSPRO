
import React, { useState } from 'react';
import { 
  Search, 
  Save, 
  Plus, 
  Trash2, 
  Upload, 
  FileText, 
  ChevronDown, 
  Check, 
  X,
  CreditCard,
  User,
  Calendar,
  ArrowRight,
  Truck,
  Anchor,
  Play,
  Smartphone,
  Send,
  Wifi,
  RefreshCw,
  Landmark,
  UserCheck,
  Scale,
  Clock,
  AlertTriangle,
  MoreHorizontal,
  Filter,
  Package,
  Activity,
  PauseCircle,
  PlayCircle,
  AlertCircle,
  TrendingUp,
  History,
  DollarSign,
  Coins,
  Layers,
  Receipt,
  Calculator
} from 'lucide-react';

interface ProcessDetailProps {
  id: string;
  title: string;
}

// --- FIELD TALLY INTERFACE (REDESIGNED) ---
const FieldTallyInterface = () => {
    // --- STATE ---
    const [selectedPlanId, setSelectedPlanId] = useState<number>(1);
    
    // Mock Plans (Area A)
    const plans = [
        { id: 1, bill: 'BL-US-1120', hatch: 'H1', cargo: 'Than đá (Coal)', team: 'Tổ 1', planQty: 5000, tallyQty: 1250, unit: 'Tấn' },
        { id: 2, bill: 'BL-US-1120', hatch: 'H2', cargo: 'Than đá (Coal)', team: 'Tổ 2', planQty: 4500, tallyQty: 450, unit: 'Tấn' },
        { id: 3, bill: 'BL-HK-8821', hatch: 'H1', cargo: 'Thép cuộn', team: 'Tổ 1', planQty: 200, tallyQty: 180, unit: 'Cuộn' },
    ];

    // Mock Tally History (Area B - Right)
    const [tallyHistory, setTallyHistory] = useState([
        { id: 101, truck: '29C-123.45', mooc: '29R-001', weight: 32500, time: '10:30', status: 'ok' },
        { id: 102, truck: '15C-888.99', mooc: '15R-222', weight: 31200, time: '10:35', status: 'ok' },
        { id: 103, truck: '51D-456.78', mooc: '51R-333', weight: 33100, time: '10:42', status: 'ok' },
    ]);

    // Input State
    const [inputData, setInputData] = useState({ truck: '', mooc: '', weight: '', pcs: '' });

    // Issues State
    const [issues, setIssues] = useState([
        { id: 'rain', label: 'Mưa (Rain)', active: false, color: 'bg-blue-600' },
        { id: 'equip', label: 'Hỏng Cẩu', active: false, color: 'bg-red-600' },
        { id: 'wait', label: 'Chờ Xe', active: true, color: 'bg-orange-500' },
    ]);

    // Derived Data for Selected Plan
    const activePlan = plans.find(p => p.id === selectedPlanId) || plans[0];
    const progressPercent = Math.round((activePlan.tallyQty / activePlan.planQty) * 100);

    const handleAddTally = () => {
        if (!inputData.truck) return;
        const newEntry = {
            id: Date.now(),
            truck: inputData.truck.toUpperCase(),
            mooc: inputData.mooc.toUpperCase(),
            weight: Number(inputData.weight),
            time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
            status: 'ok'
        };
        setTallyHistory([newEntry, ...tallyHistory]);
        setInputData({ truck: '', mooc: '', weight: '', pcs: '' });
    };

    const toggleIssue = (id: string) => {
        setIssues(issues.map(i => i.id === id ? { ...i, active: !i.active } : i));
    };

    return (
        <div className="flex flex-col h-full bg-[#Eef2f6] overflow-hidden">
            
            {/* --- AREA A: HEADER & PLAN (TOP 40%) --- */}
            <div className="flex flex-col h-[40%] bg-white border-b border-gray-300 shadow-sm shrink-0 z-20">
                {/* A1. Fixed Header */}
                <div className="bg-[#1e293b] text-white px-4 py-2 flex justify-between items-center shrink-0">
                    <div className="flex items-center gap-4">
                        <div className="flex flex-col">
                            <h2 className="text-base font-bold uppercase tracking-wider text-blue-100">MV. GLORY STAR (V.2506)</h2>
                            <div className="flex items-center gap-3 text-xs text-gray-400">
                                <span className="flex items-center gap-1"><Anchor size={12}/> Bến 1 (B1)</span>
                                <span>|</span>
                                <span className="flex items-center gap-1"><Clock size={12}/> Bắt đầu: 12/12 08:00</span>
                            </div>
                        </div>
                        <span className="px-2 py-0.5 bg-green-600 rounded text-[10px] font-bold uppercase tracking-wide">Working</span>
                    </div>
                </div>

                {/* A2. Horizontal Filters (Compact) */}
                <div className="bg-gray-50 border-b border-gray-200 px-4 py-2 flex items-center gap-2 overflow-x-auto">
                    <Filter size={16} className="text-gray-400 shrink-0" />
                    {[
                        { label: 'Hầm', val: 'Hầm 1' },
                        { label: 'Cẩu', val: 'Cẩu 01' },
                        { label: 'Vị trí', val: 'Bãi A1' },
                        { label: 'Tổ đội', val: 'Tổ 1' },
                        { label: 'Hàng hóa', val: 'Than đá' }
                    ].map((f, i) => (
                        <div key={i} className="flex items-center bg-white border border-gray-300 rounded px-2 py-1 shrink-0 shadow-sm">
                            <span className="text-[10px] font-bold text-gray-500 uppercase mr-2">{f.label}:</span>
                            <select className="text-xs font-bold text-gray-800 bg-transparent outline-none cursor-pointer min-w-[60px]">
                                <option>{f.val}</option>
                            </select>
                        </div>
                    ))}
                    <button className="ml-auto bg-white border border-blue-300 text-blue-600 px-3 py-1 rounded text-xs font-bold hover:bg-blue-50">
                        Làm mới
                    </button>
                </div>

                {/* A3. Plan Grid */}
                <div className="flex-1 overflow-auto">
                    <table className="w-full text-left text-sm border-collapse">
                        <thead className="bg-gray-100 text-gray-600 font-semibold sticky top-0 z-10 text-xs uppercase">
                            <tr>
                                <th className="px-4 py-2 border-b">Vận đơn</th>
                                <th className="px-4 py-2 border-b w-16 text-center">Hầm</th>
                                <th className="px-4 py-2 border-b">Hàng hóa</th>
                                <th className="px-4 py-2 border-b text-right">Kế hoạch</th>
                                <th className="px-4 py-2 border-b text-right text-blue-700 bg-blue-50/50">Đã Tally</th>
                                <th className="px-4 py-2 border-b w-32 text-center">Tiến độ</th>
                                <th className="px-4 py-2 border-b text-right text-orange-600">Còn lại</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {plans.map(p => {
                                const pct = Math.round((p.tallyQty / p.planQty) * 100);
                                const isSelected = p.id === selectedPlanId;
                                return (
                                    <tr 
                                        key={p.id} 
                                        onClick={() => setSelectedPlanId(p.id)}
                                        className={`cursor-pointer transition-colors ${isSelected ? 'bg-blue-100' : 'hover:bg-gray-50'}`}
                                    >
                                        <td className="px-4 py-2 font-bold text-gray-700">{p.bill}</td>
                                        <td className="px-4 py-2 text-center font-bold bg-gray-50">{p.hatch}</td>
                                        <td className="px-4 py-2">{p.cargo}</td>
                                        <td className="px-4 py-2 text-right font-medium">{p.planQty.toLocaleString()}</td>
                                        <td className="px-4 py-2 text-right font-bold text-blue-700 bg-blue-50/30">{p.tallyQty.toLocaleString()}</td>
                                        <td className="px-4 py-2 align-middle">
                                            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                                                <div className={`h-full ${pct > 90 ? 'bg-green-500' : 'bg-blue-500'}`} style={{ width: `${pct}%` }}></div>
                                            </div>
                                            <div className="text-[9px] text-center text-gray-500 mt-0.5">{pct}%</div>
                                        </td>
                                        <td className="px-4 py-2 text-right font-bold text-orange-600">{(p.planQty - p.tallyQty).toLocaleString()}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* --- AREA B: EXECUTION & PROGRESS (BOTTOM 60%) --- */}
            <div className="flex-1 flex overflow-hidden">
                
                {/* B1. LEFT: Progress Monitor (35%) */}
                <div className="w-[35%] bg-white border-r border-gray-300 flex flex-col p-4 overflow-y-auto">
                    <h3 className="text-xs font-black text-gray-400 uppercase mb-4 flex items-center gap-2">
                        <Activity size={16} className="text-blue-500"/> Tiến độ thực tế ({activePlan.hatch})
                    </h3>

                    {/* Big Progress Circle/Bar */}
                    <div className="mb-6 bg-slate-50 rounded-xl p-4 border border-slate-100 text-center relative overflow-hidden">
                        <div className="relative z-10">
                            <div className="text-4xl font-black text-blue-600 tracking-tighter mb-1">
                                {activePlan.tallyQty.toLocaleString()} 
                                <span className="text-base font-medium text-gray-400 ml-1">/ {activePlan.planQty.toLocaleString()}</span>
                            </div>
                            <div className="text-xs font-bold text-gray-500 uppercase tracking-wider">{activePlan.unit}</div>
                        </div>
                        {/* Background Fill Animation */}
                        <div className="absolute bottom-0 left-0 h-2 bg-blue-500 transition-all duration-500" style={{ width: `${progressPercent}%` }}></div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-3 mb-6">
                        <div className="bg-orange-50 p-3 rounded-lg border border-orange-100">
                            <div className="text-[10px] text-orange-500 font-bold uppercase">Còn lại</div>
                            <div className="text-xl font-bold text-orange-700">{(activePlan.planQty - activePlan.tallyQty).toLocaleString()}</div>
                        </div>
                        <div className="bg-green-50 p-3 rounded-lg border border-green-100">
                            <div className="text-[10px] text-green-500 font-bold uppercase">Tốc độ</div>
                            <div className="text-xl font-bold text-green-700">120 <span className="text-xs text-green-500 font-normal">T/h</span></div>
                        </div>
                    </div>

                    {/* Downtime Issues */}
                    <div className="mt-auto">
                        <h4 className="text-[10px] font-bold text-gray-400 uppercase mb-2 flex items-center gap-1">
                            <AlertCircle size={12}/> Ghi nhận sự cố (Downtime)
                        </h4>
                        <div className="space-y-2">
                            {issues.map(issue => (
                                <button 
                                    key={issue.id}
                                    onClick={() => toggleIssue(issue.id)}
                                    className={`w-full flex items-center justify-between p-3 rounded-lg border transition-all ${issue.active ? `${issue.color} text-white border-transparent shadow-md` : 'bg-white border-gray-200 text-gray-500 hover:border-gray-300'}`}
                                >
                                    <span className="font-bold text-sm flex items-center gap-2">
                                        {issue.active ? <PauseCircle size={16}/> : <PlayCircle size={16}/>}
                                        {issue.label}
                                    </span>
                                    {issue.active && <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded animate-pulse">00:15:22</span>}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* B2. RIGHT: Realtime Tally Input (65%) */}
                <div className="flex-1 flex flex-col bg-slate-50">
                    
                    {/* Input Header */}
                    <div className="px-6 py-3 bg-white border-b border-gray-200 flex justify-between items-center">
                        <h3 className="font-bold text-blue-800 text-sm uppercase flex items-center gap-2">
                            <Truck size={18} /> Nhập liệu Tally (Theo xe)
                        </h3>
                        <div className="flex gap-2">
                            <button className="px-3 py-1 bg-red-50 text-red-600 text-xs font-bold rounded border border-red-200 hover:bg-red-100">
                                Báo lỗi / Chênh lệch
                            </button>
                        </div>
                    </div>

                    {/* Quick Entry Bar (Touch Optimized) */}
                    <div className="p-4 bg-white border-b border-gray-200 shadow-sm flex flex-col gap-4">
                        <div className="flex gap-3">
                            <div className="flex-1">
                                <label className="text-[10px] font-bold text-gray-400 uppercase mb-1 block">Số Xe (Truck No)</label>
                                <input 
                                    className="w-full h-12 px-3 bg-gray-50 border border-gray-300 rounded-lg text-xl font-bold text-gray-800 uppercase focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 outline-none transition-all placeholder:text-gray-300"
                                    placeholder="29C-..."
                                    value={inputData.truck}
                                    onChange={(e) => setInputData({...inputData, truck: e.target.value})}
                                />
                            </div>
                            <div className="w-1/4">
                                <label className="text-[10px] font-bold text-gray-400 uppercase mb-1 block">Số Mooc</label>
                                <input 
                                    className="w-full h-12 px-3 bg-gray-50 border border-gray-300 rounded-lg text-lg font-medium text-gray-800 uppercase focus:border-blue-500 focus:bg-white outline-none transition-all placeholder:text-gray-300"
                                    placeholder="R-..."
                                    value={inputData.mooc}
                                    onChange={(e) => setInputData({...inputData, mooc: e.target.value})}
                                />
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <div className="w-1/3">
                                <label className="text-[10px] font-bold text-gray-400 uppercase mb-1 block">Kiện (PCS)</label>
                                <input 
                                    type="number"
                                    className="w-full h-12 px-3 bg-gray-50 border border-gray-300 rounded-lg text-xl font-bold text-right text-gray-800 focus:border-blue-500 focus:bg-white outline-none transition-all placeholder:text-gray-300"
                                    placeholder="0"
                                    value={inputData.pcs}
                                    onChange={(e) => setInputData({...inputData, pcs: e.target.value})}
                                />
                            </div>
                            <div className="w-1/3">
                                <label className="text-[10px] font-bold text-gray-400 uppercase mb-1 block">Trọng lượng (KG)</label>
                                <input 
                                    type="number"
                                    className="w-full h-12 px-3 bg-gray-50 border border-gray-300 rounded-lg text-xl font-bold text-right text-blue-700 focus:border-blue-500 focus:bg-white outline-none transition-all placeholder:text-gray-300"
                                    placeholder="0"
                                    value={inputData.weight}
                                    onChange={(e) => setInputData({...inputData, weight: e.target.value})}
                                />
                            </div>
                            <div className="flex-1 flex items-end">
                                <button 
                                    onClick={handleAddTally}
                                    className="w-full h-12 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow-md font-bold text-lg flex items-center justify-center gap-2 active:scale-95 transition-transform uppercase"
                                >
                                    <Check size={24} strokeWidth={3} /> Xác nhận (Enter)
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Recent History Table */}
                    <div className="flex-1 overflow-auto bg-white p-0">
                        <div className="px-4 py-2 bg-gray-50 border-b border-gray-100 text-xs font-bold text-gray-500 uppercase flex justify-between">
                            <span>Lịch sử nhập gần đây</span>
                            <span>{tallyHistory.length} dòng</span>
                        </div>
                        <table className="w-full text-left text-sm border-collapse">
                            <thead className="bg-white text-gray-400 text-xs uppercase sticky top-0 shadow-sm">
                                <tr>
                                    <th className="px-4 py-2">Thời gian</th>
                                    <th className="px-4 py-2">Số xe / Mooc</th>
                                    <th className="px-4 py-2 text-right">Trọng lượng</th>
                                    <th className="px-4 py-2 text-center">Trạng thái</th>
                                    <th className="px-4 py-2 text-center w-12">#</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {tallyHistory.map((row, idx) => (
                                    <tr key={row.id} className={idx === 0 ? 'bg-green-50 animate-fade-in' : 'hover:bg-gray-50'}>
                                        <td className="px-4 py-3 text-gray-500 font-mono">{row.time}</td>
                                        <td className="px-4 py-3">
                                            <div className="font-bold text-gray-800">{row.truck}</div>
                                            <div className="text-xs text-gray-400">{row.mooc}</div>
                                        </td>
                                        <td className="px-4 py-3 text-right font-bold text-gray-700">{row.weight.toLocaleString()}</td>
                                        <td className="px-4 py-3 text-center">
                                            <span className="px-2 py-0.5 bg-gray-100 text-gray-500 rounded text-xs font-bold">Đã lưu</span>
                                        </td>
                                        <td className="px-4 py-3 text-center">
                                            <button className="text-gray-300 hover:text-red-500"><Trash2 size={16}/></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </div>
    );
};

export const ProcessDetail: React.FC<ProcessDetailProps> = ({ id, title }) => {
  // Common state
  const [searchTerm, setSearchTerm] = useState('');
  
  // Resolve view type based on ID prefix/exact match
  let viewType = 'generic';
  if (id.includes('manifest-input')) viewType = 'manifest';
  if (id.includes('delivery-order')) viewType = 'delivery';
  if (id.includes('update-order')) viewType = 'update';
  if (id.includes('transport-plan')) viewType = 'transport';
  
  // New Yard Views
  if (id.includes('yard-plan')) viewType = 'yard-plan';
  if (id.includes('yard-split')) viewType = 'split-import';
  if (id.includes('yard-export')) viewType = 'yard-export';
  if (id.includes('yard-move-unassigned')) viewType = 'yard-move-unassigned';
  if (id.includes('yard-move-assigned')) viewType = 'yard-move-assigned';

  // Field Operation Views
  if (id.startsWith('field-')) viewType = 'field-ops';
  if (id === 'field-tally') viewType = 'field-tally-ui'; // Specific override for the new UI

  const isBarge = id.includes('barge');

  // --- STATE FOR YARD MOVE ASSIGNED (LOGIC MỚI) ---
  const [selectedBillId, setSelectedBillId] = useState<number | null>(null);
  const [moveDetails, setMoveDetails] = useState<any[]>([]);

  // Mock Data for Left Table (Bills)
  const mockBills = [
    { id: 1, billNo: 'BL-2309-001', cargo: 'Thép cuộn (Coil)', currentPos: 'Bãi A1', weight: 500, pcs: 20 },
    { id: 2, billNo: 'BL-2309-002', cargo: 'Thép tấm (Plate)', currentPos: 'Kho K2', weight: 300, pcs: 15 },
    { id: 3, bill: 'BL-2309-003', cargo: 'Thiết bị', currentPos: 'Bãi B1', weight: 120, pcs: 5 },
  ];

  // --- MOCK DATA FOR MANIFEST INPUT ---
  const MANIFEST_MOCK_DATA = [
    { stt: 1, bl: 'BL-2309-001', mark: 'COAL-01', owner: 'Nhiệt điện TB', cargo: 'Than đá', unit: 'Tấn', qty: 5000, pcs: '-', weight: 5000, avg: '-', hold: 'H1', type: 'Nội', pol: 'QN', pod: 'HP', fpod: 'HP', customs: 'Đã thông quan', mode: 'Nhập khẩu' },
    { stt: 2, bl: 'BL-2309-002', mark: 'COIL-02', owner: 'Hòa Phát', cargo: 'Thép cuộn', unit: 'Cuộn', qty: 20, pcs: 20, weight: 450, avg: 22.5, hold: 'H2', type: 'Ngoại', pol: 'JP', pod: 'HP', fpod: 'HP', customs: 'Chưa thông quan', mode: 'Nhập khẩu' },
    { stt: 3, bl: 'BL-2309-003', mark: 'WOOD-03', owner: 'MDF VRG', cargo: 'Gỗ dăm', unit: 'Tấn', qty: 12000, pcs: '-', weight: 12000, avg: '-', hold: 'H3', type: 'Ngoại', pol: 'ID', pod: 'HP', fpod: 'HP', customs: 'Đã thông quan', mode: 'Xuất khẩu' },
    { stt: 4, bl: 'BL-2309-004', mark: 'FERT-04', owner: 'Đạm Phú Mỹ', cargo: 'Phân bón', unit: 'Bao', qty: 20000, pcs: 20000, weight: 1000, avg: 0.05, hold: 'H4', type: 'Nội', pol: 'VT', pod: 'HP', fpod: 'HP', customs: 'Đã thông quan', mode: 'Nhập khẩu' },
    { stt: 5, bl: 'BL-2309-005', mark: 'EQUIP-05', owner: 'Cảng Hải Phòng', cargo: 'Thiết bị', unit: 'Kiện', qty: 5, pcs: 5, weight: 120, avg: 24, hold: 'H1', type: 'Ngoại', pol: 'DE', pod: 'HP', fpod: 'HP', customs: 'Đang chờ', mode: 'Tạm nhập' },
    { stt: 6, bl: 'BL-2309-006', mark: 'SAND-06', owner: 'Xây dựng A', cargo: 'Cát', unit: 'Tấn', qty: 3000, pcs: '-', weight: 3000, avg: '-', hold: 'H5', type: 'Nội', pol: 'TH', pod: 'HP', fpod: 'HP', customs: 'Đã thông quan', mode: 'Nhập khẩu' },
    { stt: 7, bl: 'BL-2309-007', mark: 'CLINK-07', owner: 'Xi măng HP', cargo: 'Clinker', unit: 'Tấn', qty: 8000, pcs: '-', weight: 8000, avg: '-', hold: 'H2', type: 'Nội', pol: 'HP', pod: 'SG', fpod: 'SG', customs: 'Đã thông quan', mode: 'Xuất khẩu' },
    { stt: 8, bl: 'BL-2309-008', mark: 'RICE-08', owner: 'Vinafood', cargo: 'Gạo', unit: 'Bao', qty: 5000, pcs: 100000, weight: 5000, avg: 0.05, hold: 'H3', type: 'Ngoại', pol: 'VN', pod: 'PH', fpod: 'PH', customs: 'Chưa thông quan', mode: 'Xuất khẩu' },
  ];

  // --- MOCK DATA FOR DELIVERY ORDERS ---
  const DELIVERY_ORDERS_MOCK = [
    { stt: 1, doCode: 'DO-2506-001', bill: 'HLCU987654', cust: 'Cty Tôn Hoa Sen', goods: 'Thép tole cuộn (Cold Rolled)', unit: 'Cuộn', q: 12, w: 240.5, fee: 45000000, status: 'Đã thanh toán', type: 'Hàng rời' },
    { stt: 2, doCode: 'DO-2506-002', bill: 'COSU123456', cust: 'Thép Nam Kim', goods: 'Thép cuộn cán nóng (HRC)', unit: 'Cuộn', q: 8, w: 180.2, fee: 32500000, status: 'Chưa thanh toán', type: 'Hàng rời' },
    { stt: 3, doCode: 'DO-2506-003', bill: 'MSCU111222', cust: 'Nhiệt Điện Thái Bình', goods: 'Than đá Indonesia', unit: 'Tấn', q: 5000, w: 5000, fee: 250000000, status: 'Đã thanh toán', type: 'Hàng rời' },
    { stt: 4, doCode: 'DO-2506-004', bill: 'ONEY555666', cust: 'Xây Dựng Hòa Bình', goods: 'Thép hình (Structure)', unit: 'Bó', q: 150, w: 320.0, fee: 64000000, status: 'Chưa thanh toán', type: 'Hàng rời' },
  ];

  // Logic: Add Row based on selected Bill
  const handleAddMoveRow = () => {
    if (!selectedBillId) {
        alert("Vui lòng chọn một Vận đơn (Bill) ở bảng bên trái trước!");
        return;
    }
    const selectedBill = mockBills.find(b => b.id === selectedBillId);
    if (!selectedBill) return;

    const newRow = {
        id: Date.now(),
        billId: selectedBillId,
        cargo: selectedBill.cargo,
        oldPos: selectedBill.currentPos, // Auto-populate current position
        newPos: '',
        startTime: '',
        endTime: '',
        isWeighing: false,
        status: 'Mới tạo'
    };
    setMoveDetails([...moveDetails, newRow]);
  };

  const handleAssignWork = (rowId: number) => {
      // Simulate sending to handheld
      setMoveDetails(moveDetails.map(row => 
          row.id === rowId ? { ...row, status: 'Đã phân bổ' } : row
      ));
      alert("Đã gửi yêu cầu công việc xuống thiết bị hiện trường!");
  };

  // --- Render Functions ---

  const renderToolbar = () => {
    // Toolbar is handled inside FieldTallyInterface for that specific view
    if (viewType === 'field-tally-ui') return null;

    // Toolbar for Field Operations (Generic)
    if (viewType === 'field-ops') {
        return (
            <div className="bg-white px-6 py-3 border-b border-gray-100 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-3">
                <h2 className="text-lg font-bold text-gray-700 uppercase tracking-wide">
                    {title}
                </h2>
                <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-xs font-semibold animate-pulse">
                    <Wifi size={12} /> Live Sync
                </span>
              </div>
              <div className="flex items-center gap-2">
                 <button className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 border border-blue-200 text-blue-700 rounded hover:bg-blue-100 text-xs font-medium transition-colors">
                    <RefreshCw size={14} />
                    <span>Làm mới dữ liệu</span>
                 </button>
                 <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-300 text-gray-600 rounded hover:bg-gray-50 text-xs font-medium transition-colors">
                    <Check size={14} />
                    <span>Xác nhận hoàn thành</span>
                 </button>
              </div>
            </div>
        );
    }

    // Specific Toolbar for Delivery Order (Invoicing & Fees)
    if (viewType === 'delivery') {
      return (
        <div className="bg-white px-6 py-3 border-b border-gray-100 flex items-center justify-between flex-shrink-0">
          <h2 className="text-lg font-bold text-gray-700 uppercase tracking-wide">
            {title}
          </h2>
          <div className="flex items-center gap-2">
             <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-blue-600 text-blue-700 rounded hover:bg-blue-50 text-xs font-medium transition-colors">
                <Coins size={14} />
                <span>Xem Tiền & Dịch vụ</span>
             </button>
             <button className="flex items-center gap-1.5 px-3 py-1.5 bg-orange-600 text-white border border-orange-600 rounded hover:bg-orange-700 text-xs font-medium transition-colors shadow-sm">
                <Receipt size={14} />
                <span>Xuất Hóa Đơn</span>
             </button>
             <button className="p-1 text-gray-400 hover:text-gray-600"><ChevronDown size={16} /></button>
          </div>
        </div>
      );
    }

    // Specialized Toolbar for specific screens (Transport, Plans, etc)
    if (viewType === 'transport' || viewType === 'yard-plan' || viewType === 'yard-export') {
      return (
        <div className="bg-white px-6 py-3 border-b border-gray-100 flex items-center justify-between flex-shrink-0">
          <h2 className="text-lg font-bold text-gray-700 uppercase tracking-wide">
            {title}
          </h2>
          <div className="flex items-center gap-2">
             <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-300 text-gray-600 rounded hover:bg-gray-50 text-xs font-medium transition-colors">
                <span>Tải tệp mẫu</span>
             </button>
             <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-orange-300 text-orange-600 rounded hover:bg-orange-50 text-xs font-medium transition-colors">
                <Search size={14} />
                <span>Nạp dữ liệu</span>
             </button>
             <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-teal-500 text-teal-600 rounded hover:bg-teal-50 text-xs font-medium transition-colors">
                <Plus size={14} />
                <span>Thêm mới</span>
             </button>
             <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-blue-600 text-blue-700 rounded hover:bg-blue-50 text-xs font-medium transition-colors">
                <Save size={14} />
                <span>Lưu</span>
             </button>
             <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-green-500 text-green-600 rounded hover:bg-green-50 text-xs font-medium transition-colors">
                <Upload size={14} />
                <span>Import Excel</span>
             </button>
             <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-red-400 text-red-500 rounded hover:bg-red-50 text-xs font-medium transition-colors">
                <Trash2 size={14} />
                <span>Xóa dòng</span>
             </button>
             {viewType === 'yard-export' && (
               <>
                <div className="h-4 w-px bg-gray-300 mx-1"></div>
                <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-300 text-gray-700 rounded hover:bg-gray-50 text-xs font-medium transition-colors">
                    <Play size={14} className="fill-current" />
                    <span>Xe Qua Cân</span>
                </button>
               </>
             )}
             <button className="p-1 text-gray-400 hover:text-gray-600"><ChevronDown size={16} /></button>
          </div>
        </div>
      );
    }
    
    // Custom toolbar for Yard Move Assigned (No "Add Row" here, it's in the detail section)
    if (viewType === 'yard-move-assigned') {
        return (
            <div className="bg-white px-6 py-3 border-b border-gray-100 flex items-center justify-between flex-shrink-0">
              <h2 className="text-lg font-bold text-gray-700 uppercase tracking-wide">
                {title}
              </h2>
              <div className="flex items-center gap-2">
                 <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-orange-300 text-orange-600 rounded hover:bg-orange-50 text-xs font-medium transition-colors">
                    <Search size={14} />
                    <span>Nạp dữ liệu (Tàu)</span>
                 </button>
                 <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-blue-600 text-blue-700 rounded hover:bg-blue-50 text-xs font-medium transition-colors">
                    <Save size={14} />
                    <span>Lưu kế hoạch</span>
                 </button>
              </div>
            </div>
        );
    }

    if (viewType === 'yard-move-unassigned' || viewType === 'split-import') {
       return (
        <div className="bg-white px-6 py-3 border-b border-gray-100 flex items-center justify-between flex-shrink-0">
          <h2 className="text-lg font-bold text-gray-700 uppercase tracking-wide">
            {title}
          </h2>
          <div className="flex items-center gap-2">
             {viewType === 'split-import' && (
                <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-300 text-gray-600 rounded hover:bg-gray-50 text-xs font-medium transition-colors">
                    <span>Tải tệp mẫu</span>
                </button>
             )}
             <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-orange-300 text-orange-600 rounded hover:bg-orange-50 text-xs font-medium transition-colors">
                <Search size={14} />
                <span>Nạp dữ liệu</span>
             </button>
             <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-teal-500 text-teal-600 rounded hover:bg-teal-50 text-xs font-medium transition-colors">
                <Plus size={14} />
                <span>{viewType === 'split-import' ? 'Thêm dòng' : 'Thêm dòng'}</span>
             </button>
             {viewType === 'split-import' && (
                 <>
                    <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-blue-600 text-blue-700 rounded hover:bg-blue-50 text-xs font-medium transition-colors">
                        <Save size={14} />
                        <span>Lưu</span>
                    </button>
                    <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-red-400 text-red-500 rounded hover:bg-red-50 text-xs font-medium transition-colors">
                        <Trash2 size={14} />
                        <span>Xóa dòng</span>
                    </button>
                 </>
             )}
             <button className="p-1 text-gray-400 hover:text-gray-600"><ChevronDown size={16} /></button>
          </div>
        </div>
       );
    }

    // Default Toolbar
    return (
      <div className="bg-white px-6 py-3 border-b border-gray-100 flex items-center justify-between flex-shrink-0">
        <h2 className="text-lg font-bold text-gray-700 uppercase tracking-wide">
          {title}
        </h2>
        <div className="flex items-center gap-2">
           <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-300 text-gray-600 rounded hover:bg-gray-50 text-xs font-medium transition-colors">
              <span>Tải tệp mẫu</span>
           </button>
           <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-orange-300 text-orange-600 rounded hover:bg-orange-50 text-xs font-medium transition-colors">
              <Search size={14} />
              <span>Nạp dữ liệu</span>
           </button>
           <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-green-500 text-green-600 rounded hover:bg-green-50 text-xs font-medium transition-colors">
              <Plus size={14} />
              <span>Thêm dòng</span>
           </button>
           <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-blue-600 text-blue-700 rounded hover:bg-blue-50 text-xs font-medium transition-colors">
              <Save size={14} />
              <span>Lưu</span>
           </button>
           <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-red-400 text-red-500 rounded hover:bg-red-50 text-xs font-medium transition-colors">
              <Trash2 size={14} />
              <span>Xóa dòng</span>
           </button>
           <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-teal-500 text-teal-600 rounded hover:bg-teal-50 text-xs font-medium transition-colors">
              <Upload size={14} />
              <span>Nạp file Excel</span>
           </button>
           <button className="p-1 text-gray-400 hover:text-gray-600"><ChevronDown size={16} /></button>
        </div>
      </div>
    );
  };

  const renderManifestForm = () => (
    <div className="px-6 py-4 bg-white border-b border-gray-100 grid grid-cols-12 gap-x-6 gap-y-3 text-sm">
      <div className="col-span-12 md:col-span-6 flex items-center gap-2">
        <label className="w-24 text-gray-600 font-medium">Thông tin tàu</label>
        <div className="flex-1 relative">
           <input className="w-full border p-1.5 pr-8 rounded-sm text-gray-700 border-gray-200 outline-none focus:border-blue-400 bg-gray-50/50 italic" placeholder="Tên tàu | Chuyến nhập | Chuyến xuất | ATA" />
           <Search size={14} className="absolute right-7 top-1/2 -translate-y-1/2 text-orange-400" />
           <X size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer" />
        </div>
      </div>
      <div className="col-span-12 md:col-span-3 flex items-center gap-2">
        <select className="w-full border p-1.5 rounded-sm text-gray-700 border-gray-200 outline-none focus:border-blue-400 bg-gray-50/50">
            <option>Nhập tàu</option>
            <option>Xuất tàu</option>
        </select>
      </div>
      <div className="col-span-12 md:col-span-3 flex items-center gap-2">
        <label className="w-20 text-gray-600 font-medium">Loại hàng:</label>
        <select className="flex-1 border p-1.5 rounded-sm text-gray-700 border-gray-200 outline-none focus:border-blue-400 bg-gray-50/50">
            <option></option>
        </select>
      </div>

      <div className="col-span-12 md:col-span-6 flex items-center gap-2">
        <label className="w-24 text-gray-600 font-medium">ETA:</label>
        <input className="flex-1 border p-1.5 rounded-sm text-gray-700 border-gray-200 outline-none focus:border-blue-400 bg-gray-50/50 placeholder:text-gray-300 placeholder:italic" placeholder="ETA" />
      </div>
      <div className="col-span-12 md:col-span-3 flex items-center gap-2">
        <label className="w-10 text-gray-600 font-medium">ETD:</label>
        <input className="flex-1 border p-1.5 rounded-sm text-gray-700 border-gray-200 outline-none focus:border-blue-400 bg-gray-50/50 placeholder:text-gray-300 placeholder:italic" placeholder="ETD" />
      </div>
      <div className="col-span-12 md:col-span-3 flex items-center gap-2">
        <label className="w-20 text-gray-600 font-medium">Nội/Ngoại:</label>
        <select className="flex-1 border p-1.5 rounded-sm text-gray-700 border-gray-200 outline-none focus:border-blue-400 bg-gray-50/50">
            <option>-- Tất cả --</option>
            <option>Nội</option>
            <option>Ngoại</option>
        </select>
      </div>
    </div>
  );

  const renderDeliveryOrderForm = () => (
    <div className="px-6 py-4 bg-white border-b border-gray-100 text-sm">
      <div className="grid grid-cols-12 gap-x-6 gap-y-3 mb-4">
        <div className="col-span-12 md:col-span-4 lg:col-span-3 space-y-3">
             <div className="flex items-center gap-2">
                 <label className="w-24 text-gray-600 font-medium">Ngày lệnh</label>
                 <input className="flex-1 border p-1.5 rounded-sm text-gray-700 border-gray-200 outline-none focus:border-blue-400 bg-gray-50/50" defaultValue="22:02:58 12/12/2025" />
             </div>
             <div className="flex items-center gap-2">
                 <label className="w-24 text-gray-600 font-medium">Hạn lệnh</label>
                 <input className="flex-1 border p-1.5 rounded-sm text-gray-700 border-gray-200 outline-none focus:border-blue-400 bg-gray-50/50" defaultValue="23:59:59 12/12/2025" />
             </div>
             <div className="flex items-center gap-2 pl-24">
                 <div className="flex items-center gap-2 mr-4">
                    <input type="checkbox" id="chk-barge" className="w-4 h-4 rounded border-gray-300" />
                    <label htmlFor="chk-barge">Sà lan</label>
                 </div>
             </div>
             <div className="flex items-center gap-2 pl-24">
                 <div className="flex items-center gap-2">
                    <input type="checkbox" id="chk-yard" className="w-4 h-4 rounded border-gray-300" />
                    <label htmlFor="chk-yard">Bãi/Kho hàng</label>
                 </div>
             </div>
        </div>
        
        <div className="col-span-12 md:col-span-4 lg:col-span-4 space-y-3">
            <div className="flex items-center gap-2">
                 <label className="w-24 text-gray-600 font-medium">Tàu/chuyến *</label>
                 <div className="flex-1 relative">
                    <input className="w-full border p-1.5 rounded-sm text-gray-700 border-gray-200 outline-none focus:border-blue-400 bg-gray-50/50 placeholder:text-gray-300 italic" placeholder="Tàu/chuyến" />
                    <Search size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-orange-400" />
                 </div>
             </div>
             <div className="flex items-center gap-2">
                 <label className="w-24 text-gray-600 font-medium">Số vận đơn</label>
                 <input className="flex-1 border p-1.5 rounded-sm text-gray-700 border-gray-200 outline-none focus:border-blue-400 bg-gray-50/50 placeholder:text-gray-300 italic" placeholder="Số vận đơn" />
             </div>
             <div className="flex items-center gap-2">
                 <label className="w-24 text-gray-600 font-medium">Chủ hàng</label>
                 <input className="flex-1 border p-1.5 rounded-sm text-gray-700 border-gray-200 outline-none focus:border-blue-400 bg-gray-50/50 placeholder:text-gray-300 italic" placeholder="Chủ hàng" />
             </div>
             <div className="flex items-center gap-2">
                 <label className="w-24 text-gray-600 font-medium">Chứng từ giao</label>
                 <input className="flex-1 border p-1.5 rounded-sm text-gray-700 border-gray-200 outline-none focus:border-blue-400 bg-gray-50/50 placeholder:text-gray-300 italic" placeholder="Chứng từ giao" />
             </div>
        </div>

        <div className="col-span-12 md:col-span-4 lg:col-span-5 space-y-3">
            <div className="flex items-center gap-2">
                 <label className="w-24 text-gray-600 font-medium">Ngày giấy giới thiệu</label>
                 <input className="w-40 border p-1.5 rounded-sm text-gray-700 border-gray-200 outline-none focus:border-blue-400 bg-gray-50/50" defaultValue="22:02:58 12/12/2025" />
                 <div className="flex items-center gap-2 ml-4">
                    <input type="checkbox" id="chk-service" className="w-4 h-4 rounded border-gray-300" />
                    <label htmlFor="chk-service">Đính kèm dịch vụ</label>
                 </div>
             </div>
             <div className="flex items-center gap-2">
                 <label className="w-24 text-gray-600 font-medium">Giấy giới thiệu</label>
                 <input className="flex-1 border p-1.5 rounded-sm text-gray-700 border-gray-200 outline-none focus:border-blue-400 bg-gray-50/50 placeholder:text-gray-300 italic" placeholder="Giấy giới thiệu" />
             </div>
             <div className="flex items-center gap-2">
                 <label className="w-24 text-gray-600 font-medium">Đại diện</label>
                 <input className="w-32 border p-1.5 rounded-sm text-gray-700 border-gray-200 outline-none focus:border-blue-400 bg-gray-50/50 placeholder:text-gray-300 italic" placeholder="Số CMND/ Số ĐT" />
                 <input className="flex-1 border p-1.5 rounded-sm text-gray-700 border-gray-200 outline-none focus:border-blue-400 bg-gray-50/50 placeholder:text-gray-300 italic" placeholder="Họ tên người đại diện" />
                 <input className="flex-1 border p-1.5 rounded-sm text-gray-700 border-gray-200 outline-none focus:border-blue-400 bg-gray-50/50 placeholder:text-gray-300 italic" placeholder="Địa chỉ Email *" />
             </div>
             <div className="flex items-center gap-2">
                 <label className="w-24 text-gray-600 font-medium">Ghi chú</label>
                 <input className="flex-1 border p-1.5 rounded-sm text-gray-700 border-gray-200 outline-none focus:border-blue-400 bg-gray-50/50 placeholder:text-gray-300 italic" placeholder="Ghi chú" />
             </div>
        </div>
      </div>

      <div className="border border-gray-200 rounded p-3 bg-gray-50/30">
        <div className="grid grid-cols-12 gap-4">
             <div className="col-span-4 flex items-center gap-2">
                <label className="w-24 text-gray-600 font-medium">Đối tượng TT *</label>
                <div className="flex-1 relative">
                    <input className="w-full border p-1.5 rounded-sm text-gray-700 border-gray-200 outline-none focus:border-blue-400 bg-white placeholder:text-gray-300 italic" placeholder="Đối tượng thanh toán" />
                    <Search size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-orange-400" />
                </div>
             </div>
             <div className="col-span-4 flex items-center gap-2">
                <label className="w-24 text-gray-600 font-medium">Số Hợp Đồng *</label>
                <select className="flex-1 border p-1.5 rounded-sm text-gray-700 border-gray-200 outline-none focus:border-blue-400 bg-white">
                    <option></option>
                </select>
             </div>
             <div className="col-span-4 flex items-center gap-2">
                 <label className="text-gray-600 font-medium">Đơn vị tính</label>
                 <label className="ml-4 text-gray-600 font-medium">Số lượng</label>
                 <select className="flex-1 ml-2 border p-1.5 rounded-sm text-gray-700 border-gray-200 outline-none focus:border-blue-400 bg-white">
                    <option></option>
                </select>
                <div className="flex items-center gap-3 ml-4">
                    <div className="flex items-center gap-1"><input type="radio" name="mode" defaultChecked className="text-teal-500" /> <span className="text-teal-600 font-medium">Khai Báo</span></div>
                    <div className="flex items-center gap-1"><input type="radio" name="mode" /> <span>Thực Tế</span></div>
                </div>
             </div>
        </div>
      </div>
    </div>
  );

  const renderDeliveryOrderTable = () => (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden mt-6 animate-slide-up">
        {/* Table Header */}
        <div className="px-6 py-4 bg-white border-b border-gray-100 flex justify-between items-center">
            <div className="flex items-center gap-2">
                <FileText size={18} className="text-orange-600" />
                <h3 className="font-bold text-gray-800 text-sm uppercase">Danh sách Lệnh (Hàng Rời / Sắt Thép)</h3>
            </div>
            <div className="flex gap-4 text-xs">
                <span className="text-gray-500">Tổng Lệnh: <b className="text-gray-800">{DELIVERY_ORDERS_MOCK.length}</b></span>
            </div>
        </div>
        
        {/* Table Content */}
        <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-[#FFF7ED] text-orange-800 font-bold text-xs uppercase border-b border-orange-100">
                    <tr>
                        <th className="px-4 py-3 text-center w-12">STT</th>
                        {/* Column 'Số Lệnh (DO)' removed per request */}
                        <th className="px-4 py-3">Số Vận Đơn</th>
                        <th className="px-4 py-3">Chủ Hàng</th>
                        <th className="px-4 py-3">Hàng Hóa</th>
                        <th className="px-4 py-3 text-center">ĐVT</th>
                        <th className="px-4 py-3 text-right">Số Lượng</th>
                        <th className="px-4 py-3 text-right">Trọng Lượng (Tấn)</th>
                        <th className="px-4 py-3 text-right text-red-600">Thành Tiền (VND)</th>
                        <th className="px-4 py-3 text-center">Trạng Thái</th>
                        <th className="px-4 py-3 text-center">Thao tác</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {DELIVERY_ORDERS_MOCK.map((row) => (
                        <tr key={row.stt} className="hover:bg-orange-50/30 transition-colors group">
                            <td className="px-4 py-3 text-center text-gray-400">{row.stt}</td>
                            {/* Cell 'row.doCode' removed per request */}
                            <td className="px-4 py-3 text-gray-700 font-medium">{row.bill}</td>
                            <td className="px-4 py-3 text-gray-600">{row.cust}</td>
                            <td className="px-4 py-3 font-medium text-gray-800 flex items-center gap-2">
                                {row.goods.includes('Thép') ? <Layers size={14} className="text-slate-500"/> : <Package size={14} className="text-amber-600"/>}
                                {row.goods}
                            </td>
                            <td className="px-4 py-3 text-center text-xs bg-gray-50 rounded mx-1">{row.unit}</td>
                            <td className="px-4 py-3 text-right text-gray-600">{row.q.toLocaleString()}</td>
                            <td className="px-4 py-3 text-right font-bold text-gray-800">{row.w.toLocaleString()}</td>
                            <td className="px-4 py-3 text-right font-bold text-red-600 font-mono">
                                {row.fee.toLocaleString()}
                            </td>
                            <td className="px-4 py-3 text-center">
                                <span className={`text-xs px-2 py-1 rounded-full font-bold border ${
                                    row.status === 'Đã thanh toán' ? 'bg-green-100 text-green-700 border-green-200' : 
                                    'bg-orange-100 text-orange-700 border-orange-200'
                                }`}>
                                    {row.status}
                                </span>
                            </td>
                            <td className="px-4 py-3 text-center">
                                <button className="p-1.5 hover:bg-gray-100 rounded text-gray-400 hover:text-blue-600 transition-colors">
                                    <MoreHorizontal size={16} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
                {/* Total Footer */}
                <tfoot className="bg-gray-50 font-bold text-sm">
                    <tr>
                        <td colSpan={6} className="px-4 py-3 text-right text-gray-600 uppercase">Tổng cộng:</td>
                        <td className="px-4 py-3 text-right text-blue-700">{DELIVERY_ORDERS_MOCK.reduce((a,b)=>a+b.w, 0).toLocaleString()}</td>
                        <td className="px-4 py-3 text-right text-red-600">{DELIVERY_ORDERS_MOCK.reduce((a,b)=>a+b.fee, 0).toLocaleString()}</td>
                        <td colSpan={2}></td>
                    </tr>
                </tfoot>
            </table>
        </div>
    </div>
  );

  const renderManifestTable = () => (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden mt-6 animate-slide-up">
        {/* Table Header */}
        <div className="px-6 py-4 bg-white border-b border-gray-100 flex justify-between items-center">
            <div className="flex items-center gap-2">
                <FileText size={18} className="text-blue-600" />
                <h3 className="font-bold text-gray-800 text-sm uppercase">Danh sách Hàng hóa (Manifest)</h3>
            </div>
            <div className="flex gap-4 text-xs">
                <span className="text-gray-500">Tổng VĐ: <b className="text-gray-800">{MANIFEST_MOCK_DATA.length}</b></span>
                <span className="text-gray-500">Tổng Lượng: <b className="text-blue-600">{MANIFEST_MOCK_DATA.reduce((a,b) => a + b.weight, 0).toLocaleString()}</b></span>
            </div>
        </div>
        
        {/* Table Content */}
        <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-[#F8FAFC] text-slate-500 font-bold text-xs uppercase border-b border-gray-200">
                    <tr>
                        <th className="px-4 py-3 text-center w-12">STT</th>
                        <th className="px-4 py-3">Số Vận Đơn</th>
                        <th className="px-4 py-3">Mark (Ký mã)</th>
                        <th className="px-4 py-3">Chủ Hàng</th>
                        <th className="px-4 py-3">Tên Hàng</th>
                        <th className="px-4 py-3 text-center">ĐVT</th>
                        <th className="px-4 py-3 text-right">Số Lượng</th>
                        <th className="px-4 py-3 text-right">Trọng Lượng</th>
                        <th className="px-4 py-3 text-center">Hầm</th>
                        <th className="px-4 py-3">Trạng thái HQ</th>
                        <th className="px-4 py-3 text-center">Thao tác</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {MANIFEST_MOCK_DATA.map((row) => (
                        <tr key={row.stt} className="hover:bg-blue-50/30 transition-colors group">
                            <td className="px-4 py-3 text-center text-gray-400">{row.stt}</td>
                            <td className="px-4 py-3 font-bold text-blue-600">{row.bl}</td>
                            <td className="px-4 py-3 text-gray-500 text-xs font-mono">{row.mark}</td>
                            <td className="px-4 py-3 text-gray-700">{row.owner}</td>
                            <td className="px-4 py-3 font-medium text-gray-800">{row.cargo}</td>
                            <td className="px-4 py-3 text-center">{row.unit}</td>
                            <td className="px-4 py-3 text-right text-gray-600">{row.qty.toLocaleString()}</td>
                            <td className="px-4 py-3 text-right font-bold text-gray-800">{row.weight.toLocaleString()}</td>
                            <td className="px-4 py-3 text-center">
                                <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-xs font-bold">{row.hold}</span>
                            </td>
                            <td className="px-4 py-3">
                                <span className={`text-xs px-2 py-1 rounded-full font-medium border ${
                                    row.customs === 'Đã thông quan' ? 'bg-green-50 text-green-700 border-green-200' : 
                                    row.customs === 'Chưa thông quan' ? 'bg-red-50 text-red-700 border-red-200' :
                                    'bg-orange-50 text-orange-700 border-orange-200'
                                }`}>
                                    {row.customs}
                                </span>
                            </td>
                            <td className="px-4 py-3 text-center">
                                <button className="p-1.5 hover:bg-gray-100 rounded text-gray-400 hover:text-blue-600 transition-colors">
                                    <MoreHorizontal size={16} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        {/* Footer */}
        <div className="bg-gray-50 px-6 py-3 border-t border-gray-200 flex justify-end">
             <div className="flex gap-2">
                 <button className="px-3 py-1 bg-white border border-gray-300 rounded text-xs text-gray-600 hover:bg-gray-100">Trước</button>
                 <button className="px-3 py-1 bg-blue-600 text-white border border-blue-600 rounded text-xs">1</button>
                 <button className="px-3 py-1 bg-white border border-gray-300 rounded text-xs text-gray-600 hover:bg-gray-100">Sau</button>
             </div>
        </div>
    </div>
  );

  return (
    <div className="flex flex-col h-full bg-[#F5F7FB]">
        {/* Render Toolbar */}
        {renderToolbar()}

        {/* Content Area */}
        <div className="flex-1 overflow-auto p-6">
            {viewType === 'field-tally-ui' ? (
                <FieldTallyInterface />
            ) : viewType === 'manifest' ? (
                <div className="space-y-4 animate-fade-in">
                    {renderManifestForm()}
                    {renderManifestTable()}
                </div>
            ) : viewType === 'delivery' ? (
                <div className="space-y-4 animate-fade-in">
                    {renderDeliveryOrderForm()}
                    {renderDeliveryOrderTable()}
                </div>
            ) : (
                <div className="flex items-center justify-center h-full text-gray-400">
                    <div className="text-center">
                        <Package size={48} className="mx-auto mb-4 opacity-20"/>
                        <p>Chức năng đang được cập nhật dữ liệu</p>
                    </div>
                </div>
            )}
        </div>
    </div>
  );
}
