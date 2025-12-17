
import React, { useState } from 'react';
import { 
  Search, Plus, Save, Trash2, Ship, Anchor, Calendar, 
  ChevronDown, Filter,
  Clock, Truck, Users,
  CheckSquare, X, History,
  Activity,
  Layers,
  ArrowDownCircle,
  Database,
  Archive,
  Calculator,
  HardHat,
  GanttChart,
  MapPin,
  CheckCircle2,
  Info,
  GripVertical,
  Play,
  Edit,
  Box,
  Scale
} from 'lucide-react';

interface OperationPlanProps {
  viewId: string;
}

// --- CONSTANTS & MOCK DATA ---
const BERTH_SPECS: Record<string, { name: string, type: string, maxLoa: number, maxDraft: number, maxDwt: number, depth: number, status: 'Operational' | 'Maintenance' }> = {
    'B1': { name: 'Bến 1', type: 'Hàng rời', maxLoa: 230, maxDraft: 12.0, maxDwt: 50000, depth: 13.5, status: 'Operational' },
    'B2': { name: 'Bến 2', type: 'Tổng hợp', maxLoa: 160, maxDraft: 8.5, maxDwt: 30000, depth: 9.0, status: 'Operational' },
    'B3': { name: 'Bến 3', type: 'Container', maxLoa: 200, maxDraft: 10.5, maxDwt: 40000, depth: 11.0, status: 'Maintenance' },
};

// --- SUB-COMPONENTS ---

// 3. QUẢN LÝ KẾ HOẠCH CẦU BẾN
const BerthPlanView = () => {
    const berths = Object.entries(BERTH_SPECS).map(([id, data]) => ({ id, ...data }));
    
    // Mock Allocations
    const allocations = [
        { id: 1, vessel: 'MV. GLORY STAR', berthId: 'B1', start: 8, duration: 40, color: 'bg-blue-600', status: 'Active', eta: '12/12 08:00', etd: '14/12 14:00' },
        { id: 2, vessel: 'MV. OCEAN DRAGON', berthId: 'B2', start: 30, duration: 25, color: 'bg-green-600', status: 'Scheduled', eta: '12/12 14:30', etd: '13/12 06:00' },
        { id: 3, vessel: 'MV. PACIFIC', berthId: 'B1', start: 60, duration: 30, color: 'bg-orange-500', status: 'Scheduled', eta: '13/12 08:00', etd: '14/12 20:00' },
    ];

    return (
        <div className="flex flex-col h-full bg-[#F5F7FA] p-6">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-xl font-bold text-[#0F172A] flex items-center gap-2">
                        <Anchor className="text-blue-600" /> Kế Hoạch Cầu Bến (Berth Planning)
                    </h2>
                    <p className="text-sm text-slate-500">Biểu đồ trực quan bố trí tàu tại cầu</p>
                </div>
                <div className="flex gap-2">
                    <button className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50 flex items-center gap-2 text-slate-600">
                        <Calendar size={16}/> Hôm nay
                    </button>
                    <button className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 flex items-center gap-2 shadow-sm">
                        <Plus size={16}/> Đăng ký cầu bến
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col flex-1">
                {/* Timeline Header */}
                <div className="flex border-b border-slate-200 bg-[#F8FAFC]">
                    <div className="w-56 p-4 border-r border-slate-200 font-bold text-slate-600 text-sm uppercase flex items-center">Cầu Bến</div>
                    <div className="flex-1 flex relative h-12 items-end pb-1">
                        {Array.from({length: 24}).map((_, i) => (
                            <div key={i} className="flex-1 text-[10px] text-slate-400 text-center border-l border-slate-200 h-2 flex flex-col justify-end">
                                <span>{i}:00</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Berth Rows */}
                <div className="flex-1 overflow-y-auto">
                    {berths.map(berth => (
                        <div key={berth.id} className="flex border-b border-slate-100 h-40 relative group hover:bg-slate-50 transition-colors">
                            {/* Berth Info */}
                            <div className="w-56 p-4 border-r border-slate-200 bg-white z-10 flex flex-col justify-center shrink-0">
                                <div className="flex items-center justify-between mb-1">
                                    <div className="font-bold text-slate-800 text-lg">{berth.name}</div>
                                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${berth.status === 'Operational' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
                                        {berth.status === 'Operational' ? 'OK' : 'Bảo trì'}
                                    </span>
                                </div>
                                <div className="text-xs text-slate-500 mb-2">{berth.type}</div>
                                
                                <div className="mt-2 space-y-1">
                                    <div className="flex justify-between text-[10px] text-slate-500">
                                        <span>LOA: {berth.maxLoa}m</span>
                                        <span>Draft: -{berth.depth}m</span>
                                    </div>
                                    <div className="flex justify-between text-[10px] text-slate-500">
                                        <span>DWT: {berth.maxDwt/1000}k</span>
                                        <span>Crane: 2</span>
                                    </div>
                                </div>
                            </div>

                            {/* Timeline */}
                            <div className="flex-1 relative bg-slate-50/30">
                                <div className="absolute inset-0 flex pointer-events-none">
                                    {Array.from({length: 24}).map((_, i) => (
                                        <div key={i} className="flex-1 border-l border-slate-200 h-full border-dashed opacity-50"></div>
                                    ))}
                                </div>

                                {allocations.filter(a => a.berthId === berth.id).map(alloc => (
                                    <div 
                                        key={alloc.id}
                                        className={`absolute top-4 bottom-4 rounded-xl shadow-md ${alloc.color} border border-white/20 cursor-pointer flex flex-col justify-center px-3 text-white transition-all hover:scale-[1.01] hover:z-20 hover:shadow-lg group/ship`}
                                        style={{ 
                                            left: `${alloc.start}%`, 
                                            width: `${alloc.duration}%` 
                                        }}
                                    >
                                        <div className="flex items-center gap-2 font-bold text-sm truncate">
                                            <Ship size={16} className="opacity-80"/> 
                                            <span>{alloc.vessel}</span>
                                        </div>
                                        {alloc.duration > 15 && (
                                            <div className="mt-1 text-[10px] opacity-90 flex justify-between">
                                                <span>{alloc.eta}</span>
                                                <span>→</span>
                                                <span>{alloc.etd}</span>
                                            </div>
                                        )}
                                        {/* Hover Tooltip */}
                                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs p-2 rounded shadow-xl whitespace-nowrap opacity-0 group-hover/ship:opacity-100 transition-opacity z-50 pointer-events-none">
                                            {alloc.vessel} - {alloc.status}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

// 4. KẾ HOẠCH CƠ GIỚI & NHÂN SỰ
const UnifiedResourcePlanView = () => {
    const [activeTab, setActiveTab] = useState<'equipment' | 'personnel'>('equipment');

    // Mock Data
    const EQUIPMENT = [
        { id: 'EQ-01', name: 'Cẩu Bờ 01 (Liebherr)', type: 'Shore Crane', status: 'Working', location: 'Bến 1', operator: 'Nguyễn Văn A', capacity: '45T' },
        { id: 'EQ-02', name: 'Cẩu Bờ 02 (Kocks)', type: 'Shore Crane', status: 'Maintenance', location: 'Xưởng', operator: '--', capacity: '40T' },
        { id: 'EQ-03', name: 'Xe Nâng 5T (Forklift)', type: 'Forklift', status: 'Idle', location: 'Kho B', operator: 'Trần Văn B', capacity: '5T' },
        { id: 'EQ-04', name: 'Đầu Kéo 05', type: 'Truck', status: 'Working', location: 'Bến 1 -> Bãi A', operator: 'Lê Văn C', capacity: 'Container' },
        { id: 'EQ-05', name: 'Đầu Kéo 06', type: 'Truck', status: 'Working', location: 'Bến 1 -> Bãi A', operator: 'Phạm Văn D', capacity: 'Container' },
    ];

    const PERSONNEL = [
        { id: 'TM-01', name: 'Tổ Bốc Xếp 1', type: 'Stevedore', shift: 'Ca 1 (06:00 - 14:00)', status: 'Working', location: 'Hầm 1 - Tàu Glory Star', members: 12, leader: 'Nguyễn Văn X' },
        { id: 'TM-02', name: 'Tổ Bốc Xếp 2', type: 'Stevedore', shift: 'Ca 1 (06:00 - 14:00)', status: 'Working', location: 'Hầm 2 - Tàu Glory Star', members: 10, leader: 'Trần Văn Y' },
        { id: 'TM-03', name: 'Tổ Cơ Giới', type: 'Operator', shift: 'Ca 1 (06:00 - 14:00)', status: 'Standby', location: 'Văn phòng đội', members: 5, leader: 'Lê Văn Z' },
    ];

    return (
        <div className="flex flex-col h-full bg-[#F5F7FA] p-6">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-xl font-bold text-[#0F172A] flex items-center gap-2">
                        <Truck className="text-orange-600" /> Kế Hoạch Tài Nguyên (Resources)
                    </h2>
                    <p className="text-sm text-slate-500">Điều phối phương tiện cơ giới và nhân sự hiện trường</p>
                </div>
                
                <div className="bg-white p-1 rounded-lg border border-slate-200 flex shadow-sm">
                    <button 
                        onClick={() => setActiveTab('equipment')}
                        className={`px-4 py-2 rounded-md text-sm font-bold flex items-center gap-2 transition-all ${activeTab === 'equipment' ? 'bg-orange-50 text-orange-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                        <Truck size={16} /> Cơ Giới
                    </button>
                    <button 
                        onClick={() => setActiveTab('personnel')}
                        className={`px-4 py-2 rounded-md text-sm font-bold flex items-center gap-2 transition-all ${activeTab === 'personnel' ? 'bg-blue-50 text-blue-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                        <Users size={16} /> Nhân Sự
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 h-full overflow-hidden">
                {/* Stats */}
                <div className="md:col-span-1 bg-white rounded-xl shadow-sm border border-slate-200 p-5 h-full flex flex-col">
                    <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                        <Activity size={18} className="text-blue-500"/> Tổng quan ca làm việc
                    </h3>
                    
                    <div className="space-y-4">
                        <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                            <div className="text-xs font-bold text-slate-500 uppercase">Tổng thiết bị hoạt động</div>
                            <div className="text-2xl font-bold text-blue-700 mt-1">
                                {EQUIPMENT.filter(e => e.status === 'Working').length} <span className="text-sm text-slate-400 font-normal">/ {EQUIPMENT.length}</span>
                            </div>
                            <div className="w-full bg-blue-200 h-1.5 rounded-full mt-2 overflow-hidden">
                                <div className="bg-blue-600 h-full" style={{ width: '60%' }}></div>
                            </div>
                        </div>

                        <div className="bg-green-50 p-4 rounded-xl border border-green-100">
                            <div className="text-xs font-bold text-slate-500 uppercase">Nhân sự đi làm</div>
                            <div className="text-2xl font-bold text-green-700 mt-1">27 <span className="text-sm text-slate-400 font-normal">người</span></div>
                        </div>
                        
                        <div className="bg-orange-50 p-4 rounded-xl border border-orange-100">
                            <div className="text-xs font-bold text-slate-500 uppercase">Yêu cầu bảo trì</div>
                            <div className="text-2xl font-bold text-orange-700 mt-1">1 <span className="text-sm text-slate-400 font-normal">thiết bị</span></div>
                        </div>
                    </div>

                    <div className="mt-auto border-t border-slate-100 pt-4">
                        <button className="w-full py-2 bg-slate-50 text-slate-600 font-bold rounded-lg border border-slate-200 hover:bg-slate-100 text-sm flex items-center justify-center gap-2">
                            <History size={16}/> Xem lịch sử ca trước
                        </button>
                    </div>
                </div>

                {/* Main List */}
                <div className="md:col-span-3 bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
                    <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-white">
                        <div className="relative w-64">
                            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"/>
                            <input className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 bg-white" placeholder={`Tìm kiếm...`} />
                        </div>
                        <div className="flex gap-2">
                            <button className="bg-white border border-slate-200 text-slate-600 px-3 py-2 rounded-lg text-sm font-bold hover:bg-slate-50 flex items-center gap-2">
                                <Filter size={16} /> Bộ lọc
                            </button>
                            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-700 shadow-sm flex items-center gap-2">
                                <Plus size={16}/> Phân công mới
                            </button>
                        </div>
                    </div>

                    <div className="flex-1 overflow-auto">
                        <table className="w-full text-left">
                            <thead className="bg-[#F8FAFC] text-slate-600 font-bold text-xs uppercase border-b border-slate-200 sticky top-0 z-10">
                                <tr>
                                    <th className="px-6 py-4">{activeTab === 'equipment' ? 'Thiết bị' : 'Tổ / Đội'}</th>
                                    <th className="px-6 py-4">Loại</th>
                                    {activeTab === 'equipment' && <th className="px-6 py-4">Sức nâng</th>}
                                    <th className="px-6 py-4">{activeTab === 'equipment' ? 'Vị trí / Tuyến' : 'Khu vực làm việc'}</th>
                                    <th className="px-6 py-4">{activeTab === 'equipment' ? 'Người vận hành' : 'Tổ trưởng / Ca'}</th>
                                    <th className="px-6 py-4 text-center">Trạng thái</th>
                                    <th className="px-6 py-4 text-right">Tác vụ</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 text-sm">
                                {activeTab === 'equipment' ? (
                                    EQUIPMENT.map(item => (
                                        <tr key={item.id} className="hover:bg-blue-50/30 transition-colors group">
                                            <td className="px-6 py-4 font-bold text-slate-800 flex items-center gap-3">
                                                <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center text-orange-600 shrink-0">
                                                    <Truck size={16}/>
                                                </div>
                                                {item.name}
                                            </td>
                                            <td className="px-6 py-4 text-slate-600">{item.type}</td>
                                            <td className="px-6 py-4 text-slate-600">{item.capacity}</td>
                                            <td className="px-6 py-4 text-blue-600 font-medium">{item.location}</td>
                                            <td className="px-6 py-4 text-slate-700">{item.operator}</td>
                                            <td className="px-6 py-4 text-center">
                                                <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${
                                                    item.status === 'Working' ? 'bg-green-50 text-green-700 border-green-200' : 
                                                    item.status === 'Maintenance' ? 'bg-red-50 text-red-700 border-red-200' :
                                                    'bg-slate-100 text-slate-600 border-slate-200'
                                                }`}>
                                                    {item.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button className="text-slate-400 hover:text-blue-600 p-1.5 hover:bg-slate-100 rounded">
                                                    <Edit size={16}/>
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    PERSONNEL.map(item => (
                                        <tr key={item.id} className="hover:bg-blue-50/30 transition-colors group">
                                            <td className="px-6 py-4 font-bold text-slate-800 flex items-center gap-3">
                                                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 shrink-0">
                                                    <HardHat size={16}/>
                                                </div>
                                                <div>
                                                    <div>{item.name}</div>
                                                    <div className="text-xs font-normal text-slate-400">{item.members} thành viên</div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-slate-600">{item.type}</td>
                                            <td className="px-6 py-4 text-blue-600 font-medium">{item.location}</td>
                                            <td className="px-6 py-4 text-slate-700">
                                                <div>{item.leader}</div>
                                                <div className="text-xs text-slate-400">{item.shift}</div>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${
                                                    item.status === 'Working' ? 'bg-green-50 text-green-700 border-green-200' : 
                                                    'bg-orange-50 text-orange-700 border-orange-200'
                                                }`}>
                                                    {item.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button className="text-slate-400 hover:text-blue-600 p-1.5 hover:bg-slate-100 rounded">
                                                    <Edit size={16}/>
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

// 2. ĐỊNH NGHĨA TÀU (VESSEL DEFINITION)
const VesselDefinitionView = () => {
    return (
        <div className="flex flex-col h-full bg-[#F5F7FA] overflow-y-auto">
            {/* Header */}
            <div className="bg-white px-6 py-4 border-b border-slate-200 flex justify-between items-center sticky top-0 z-10 shadow-sm">
                <div>
                    <h2 className="text-xl font-bold text-[#0F172A] uppercase flex items-center gap-2">
                        <Ship className="text-blue-600" /> Định nghĩa thông tin tàu
                    </h2>
                    <p className="text-sm text-slate-500">Khai báo thông số kỹ thuật và sơ đồ hầm tàu</p>
                </div>
                <div className="flex gap-2">
                    <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-bold text-slate-600 hover:bg-slate-50">Hủy bỏ</button>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700 shadow-sm flex items-center gap-2">
                        <Save size={16}/> Lưu thông tin
                    </button>
                </div>
            </div>

            <div className="p-6 max-w-5xl mx-auto w-full space-y-6">
                
                {/* General Info Card */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="px-6 py-3 border-b border-slate-100 bg-slate-50 font-bold text-slate-700 uppercase text-sm">
                        Thông tin chung
                    </div>
                    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="col-span-1 md:col-span-2">
                            <label className="block text-sm font-medium text-slate-700 mb-1">Tên tàu (Vessel Name)</label>
                            <input className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Nhập tên tàu..." defaultValue="MV. GLORY STAR" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Quốc tịch</label>
                            <select className="w-full p-2 border border-slate-300 rounded-lg bg-white">
                                <option>PANAMA</option>
                                <option>VIETNAM</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">IMO Number</label>
                            <input className="w-full p-2 border border-slate-300 rounded-lg" placeholder="9123456" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Hô hiệu (Call Sign)</label>
                            <input className="w-full p-2 border border-slate-300 rounded-lg" placeholder="3FQA2" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Năm đóng</label>
                            <input className="w-full p-2 border border-slate-300 rounded-lg" type="number" placeholder="2010" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Loại tàu</label>
                            <select className="w-full p-2 border border-slate-300 rounded-lg bg-white">
                                <option>Bulk Carrier</option>
                                <option>General Cargo</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Technical Specs */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="px-6 py-3 border-b border-slate-100 bg-slate-50 font-bold text-slate-700 uppercase text-sm">
                        Thông số kỹ thuật
                    </div>
                    <div className="p-6 grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">LOA (m)</label>
                            <div className="relative">
                                <input className="w-full p-2 border border-slate-300 rounded-lg pr-8" type="number" defaultValue="190" />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs">m</span>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Beam (m)</label>
                            <div className="relative">
                                <input className="w-full p-2 border border-slate-300 rounded-lg pr-8" type="number" defaultValue="32" />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs">m</span>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Draft Max (m)</label>
                            <div className="relative">
                                <input className="w-full p-2 border border-slate-300 rounded-lg pr-8" type="number" defaultValue="12.5" />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs">m</span>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">DWT (Tons)</label>
                            <div className="relative">
                                <input className="w-full p-2 border border-slate-300 rounded-lg pr-8" type="number" defaultValue="55000" />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs">T</span>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">GRT</label>
                            <input className="w-full p-2 border border-slate-300 rounded-lg" type="number" defaultValue="30000" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">NRT</label>
                            <input className="w-full p-2 border border-slate-300 rounded-lg" type="number" defaultValue="18000" />
                        </div>
                    </div>
                </div>

                {/* Holds & Cranes Configuration */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="px-6 py-3 border-b border-slate-100 bg-slate-50 font-bold text-slate-700 uppercase text-sm flex justify-between items-center">
                        <span>Cấu hình Hầm & Cẩu</span>
                        <button className="text-blue-600 text-xs hover:underline">Thêm cấu hình mẫu</button>
                    </div>
                    <div className="p-6">
                        <div className="flex items-center gap-8 mb-6">
                            <div className="flex items-center gap-3">
                                <label className="text-sm font-bold text-slate-700">Số lượng Hầm:</label>
                                <select className="p-2 border border-slate-300 rounded-lg w-20 text-center font-bold">
                                    <option>4</option>
                                    <option selected>5</option>
                                    <option>6</option>
                                    <option>7</option>
                                </select>
                            </div>
                            <div className="flex items-center gap-3">
                                <label className="text-sm font-bold text-slate-700">Số lượng Cẩu tàu:</label>
                                <select className="p-2 border border-slate-300 rounded-lg w-20 text-center font-bold">
                                    <option>0</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option selected>4</option>
                                </select>
                            </div>
                        </div>

                        {/* Visual Representation (Simplified) */}
                        <div className="border border-dashed border-slate-300 rounded-xl p-6 bg-slate-50">
                            <div className="flex justify-between gap-4">
                                {[1, 2, 3, 4, 5].map(i => (
                                    <div key={i} className="flex-1 bg-white border border-slate-200 rounded-lg p-3 shadow-sm flex flex-col items-center">
                                        <div className="font-bold text-blue-700 mb-2">Hầm {i}</div>
                                        <div className="w-full h-16 bg-slate-100 rounded border border-slate-200 mb-2 flex items-center justify-center text-xs text-slate-400">
                                            Capacity
                                        </div>
                                        <input className="w-full text-center text-xs p-1 border rounded" placeholder="Sức chứa (m3)" />
                                    </div>
                                ))}
                            </div>
                            {/* Cranes between holds usually, but simplified here */}
                            <div className="mt-4 flex justify-around px-10">
                                {[1, 2, 3, 4].map(i => (
                                    <div key={i} className="flex flex-col items-center">
                                        <div className="w-1 h-8 bg-slate-400"></div>
                                        <div className="px-3 py-1 bg-orange-100 text-orange-700 text-xs font-bold rounded border border-orange-200">Cẩu {i}</div>
                                        <div className="w-16 h-1 bg-slate-400 mt-1"></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

// 1. KẾ HOẠCH BÃI (YARD PLAN)
const YardPlanView = () => {
  const [selectedZone, setSelectedZone] = useState('Zone A');

  // Mock Yard Blocks
  const YARD_BLOCKS = [
      { id: 'A1', name: 'Bãi A1', capacity: 5000, current: 3500, type: 'Than đá', color: 'bg-slate-800' },
      { id: 'A2', name: 'Bãi A2', capacity: 5000, current: 1200, type: 'Than đá', color: 'bg-slate-800' },
      { id: 'A3', name: 'Bãi A3', capacity: 4000, current: 4000, type: 'Quặng sắt', color: 'bg-red-800' },
      { id: 'A4', name: 'Bãi A4', capacity: 4000, current: 0, type: 'Trống', color: 'bg-slate-200' },
      { id: 'A5', name: 'Bãi A5', capacity: 6000, current: 4500, type: 'Than đá', color: 'bg-slate-800' },
      { id: 'A6', name: 'Bãi A6', capacity: 6000, current: 2000, type: 'Đá vôi', color: 'bg-stone-500' },
  ];

  return (
    <div className="flex h-full flex-col bg-[#F5F7FA] overflow-hidden relative">
      {/* HEADER */}
      <div className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between shrink-0 shadow-sm z-20">
          <div className="flex items-center gap-6">
              <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Tàu đang làm hàng</span>
                  <div className="flex items-center gap-2 cursor-pointer group">
                      <Ship size={18} className="text-blue-600 group-hover:scale-110 transition-transform" />
                      <select className="text-sm font-bold text-slate-800 bg-transparent outline-none cursor-pointer hover:text-blue-600">
                          <option>MV. GLORY STAR (V.2506)</option>
                      </select>
                      <ChevronDown size={14} className="text-slate-400" />
                  </div>
              </div>
              <div className="h-8 w-px bg-slate-200"></div>
              <div className="flex gap-2">
                  {['Zone A', 'Zone B', 'Zone C'].map(z => (
                      <button 
                        key={z}
                        onClick={() => setSelectedZone(z)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${selectedZone === z ? 'bg-blue-600 text-white shadow-md' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}
                      >
                          {z}
                      </button>
                  ))}
              </div>
          </div>
          <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 text-slate-600 rounded-lg text-xs font-bold hover:bg-slate-50 transition-colors shadow-sm">
                  <Filter size={14} /> Bộ lọc
              </button>
              <button className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-bold hover:bg-blue-700 transition-colors shadow-sm">
                  <Save size={14} /> Lưu kế hoạch
              </button>
          </div>
      </div>
      
      {/* Visual Yard Map */}
      <div className="flex-1 p-6 overflow-auto">
          <div className="grid grid-cols-3 gap-6">
              {YARD_BLOCKS.map(block => {
                  const percent = Math.round((block.current / block.capacity) * 100);
                  const isFull = percent >= 100;
                  return (
                      <div key={block.id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 flex flex-col h-48 hover:shadow-md transition-shadow cursor-pointer relative group">
                          <div className="flex justify-between items-start mb-2">
                              <div className="flex items-center gap-2">
                                  <div className={`w-3 h-3 rounded-full ${isFull ? 'bg-red-500 animate-pulse' : 'bg-green-500'}`}></div>
                                  <span className="font-bold text-slate-800">{block.name}</span>
                              </div>
                              <span className="text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded">{block.type}</span>
                          </div>
                          
                          {/* Visual Pile */}
                          <div className="flex-1 bg-slate-50 rounded-lg border border-slate-100 relative overflow-hidden flex items-end justify-center">
                                {/* Pile Shape */}
                                {block.current > 0 && (
                                    <div 
                                        className={`w-full ${block.color} opacity-80 rounded-t-lg transition-all duration-700 ease-out`} 
                                        style={{ height: `${percent}%`, clipPath: 'polygon(10% 0, 90% 0, 100% 100%, 0% 100%)' }}
                                    ></div>
                                )}
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                    <span className="font-bold text-2xl text-slate-900/10 z-0">{percent}%</span>
                                </div>
                          </div>

                          <div className="mt-3">
                              <div className="flex justify-between text-xs mb-1 font-medium">
                                  <span className="text-blue-700">{block.current.toLocaleString()} T</span>
                                  <span className="text-slate-400">/ {block.capacity.toLocaleString()} T</span>
                              </div>
                              <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                                  <div className={`h-full rounded-full transition-all ${isFull ? 'bg-red-500' : 'bg-blue-600'}`} style={{ width: `${percent}%` }}></div>
                              </div>
                          </div>

                          {/* Hover Actions */}
                          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                              <button className="p-1.5 bg-white shadow-sm border rounded text-slate-500 hover:text-blue-600"><Info size={14}/></button>
                              <button className="p-1.5 bg-white shadow-sm border rounded text-slate-500 hover:text-orange-600"><Edit size={14}/></button>
                          </div>
                      </div>
                  );
              })}
              
              {/* Add New Block Placeholder */}
              <button className="border-2 border-dashed border-slate-300 rounded-xl p-4 flex flex-col items-center justify-center text-slate-400 hover:text-blue-600 hover:border-blue-400 hover:bg-blue-50 transition-all h-48">
                  <Plus size={32} className="mb-2" />
                  <span className="font-bold text-sm">Thêm Bãi Mới</span>
              </button>
          </div>
      </div>
    </div>
  );
};

export const OperationPlan: React.FC<OperationPlanProps> = ({ viewId }) => {
  switch (viewId) {
    case 'plan-yard': return <YardPlanView />;
    case 'plan-vessel-def': return <VesselDefinitionView />;
    case 'plan-berth-ops': return <BerthPlanView />;
    case 'plan-eqp-unified': return <UnifiedResourcePlanView />;
    default: return <div className="p-6">Chức năng đang phát triển</div>;
  }
};
