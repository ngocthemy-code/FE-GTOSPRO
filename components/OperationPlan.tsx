
import React, { useState, useEffect, useMemo } from 'react';
import { 
  Search, Plus, Save, Trash2, Ship, Anchor, Calendar, 
  ChevronDown, Filter, MoreHorizontal, Maximize2, 
  MapPin, Clock, Truck, User, ArrowRight, LayoutGrid,
  CheckCircle2, AlertCircle, FileText, Image as ImageIcon,
  MoveUp, MoveDown, Globe, Map as MapIcon, Link as LinkIcon,
  LayoutList, BarChart3, CheckSquare, X, History, RefreshCcw,
  Sparkles, Play, LogOut, AlertTriangle, ArrowLeftRight,
  CalendarDays, ChevronRight, ChevronsRight, Timer,
  Ruler, Scale, Info, Layers, GanttChart, Activity,
  PlayCircle, PauseCircle, StopCircle, UserCog, Users,
  PenTool, Eye, Box, Move, GripVertical, Check,
  List,
  ArrowDownCircle,
  ArrowUpCircle,
  RefreshCw,
  Database,
  Archive,
  Calculator,
  Navigation,
  HardHat,
  Wrench,
  Flag,
  Download,
  Settings
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer,
  LineChart, Line, AreaChart, Area
} from 'recharts';

interface OperationPlanProps {
  viewId: string;
}

// --- CONSTANTS FOR VALIDATION ---
const BERTH_SPECS: Record<string, { name: string, type: string, maxLoa: number, maxDraft: number, maxDwt: number, depth: number, status: 'Operational' | 'Maintenance' }> = {
    'B1': { name: 'Bến 1', type: 'Hàng rời', maxLoa: 230, maxDraft: 12.0, maxDwt: 50000, depth: 13.5, status: 'Operational' },
    'B2': { name: 'Bến 2', type: 'Tổng hợp', maxLoa: 160, maxDraft: 8.5, maxDwt: 30000, depth: 9.0, status: 'Operational' },
    'B3': { name: 'Bến 3', type: 'Container', maxLoa: 200, maxDraft: 10.5, maxDwt: 40000, depth: 11.0, status: 'Maintenance' },
};

// --- SUB-COMPONENTS FOR SPECIFIC SCREENS ---

// 3. QUẢN LÝ KẾ HOẠCH CẦU BẾN (BERTH PLAN VIEW)
const BerthPlanView = () => {
    const berths = Object.entries(BERTH_SPECS).map(([id, data]) => ({ id, ...data }));
    
    // Mock Vessel Allocations on Timeline
    const allocations = [
        { id: 1, vessel: 'MV. GLORY STAR', berthId: 'B1', start: 10, duration: 40, color: 'bg-blue-600', status: 'Active' },
        { id: 2, vessel: 'MV. OCEAN DRAGON', berthId: 'B2', start: 30, duration: 25, color: 'bg-green-600', status: 'Scheduled' },
        { id: 3, vessel: 'MV. PACIFIC', berthId: 'B1', start: 60, duration: 30, color: 'bg-orange-500', status: 'Scheduled' },
    ];

    // Simple 24h timeline visualization
    return (
        <div className="flex flex-col h-full bg-[#F5F7FA] p-6">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-xl font-bold text-[#0F1B3D] flex items-center gap-2">
                        <Anchor className="text-blue-600" /> Kế Hoạch Cầu Bến (Berth Planning)
                    </h2>
                    <p className="text-sm text-gray-500">Biểu đồ trực quan bố trí tàu tại cầu</p>
                </div>
                <div className="flex gap-2">
                    <button className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 flex items-center gap-2">
                        <Calendar size={16}/> Hôm nay
                    </button>
                    <button className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 flex items-center gap-2 shadow-md">
                        <Plus size={16}/> Đăng ký cầu bến
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col flex-1">
                {/* Timeline Header */}
                <div className="flex border-b border-gray-200 bg-gray-50">
                    <div className="w-48 p-4 border-r border-gray-200 font-bold text-gray-700 text-sm">Cầu Bến</div>
                    <div className="flex-1 flex relative h-12 items-end pb-1">
                        {Array.from({length: 24}).map((_, i) => (
                            <div key={i} className="flex-1 text-[10px] text-gray-400 text-center border-l border-gray-200 h-2">
                                {i}:00
                            </div>
                        ))}
                    </div>
                </div>

                {/* Berth Rows */}
                <div className="flex-1 overflow-y-auto">
                    {berths.map(berth => (
                        <div key={berth.id} className="flex border-b border-gray-100 h-32 relative group hover:bg-slate-50 transition-colors">
                            {/* Berth Info Column */}
                            <div className="w-48 p-4 border-r border-gray-200 bg-white z-10 flex flex-col justify-center">
                                <div className="font-bold text-gray-800 text-lg">{berth.name}</div>
                                <div className="text-xs text-gray-500 mb-2">{berth.type}</div>
                                <div className="flex gap-2">
                                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${berth.status === 'Operational' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
                                        {berth.status === 'Operational' ? 'Hoạt động' : 'Bảo trì'}
                                    </span>
                                </div>
                                <div className="mt-2 text-[10px] text-gray-400">
                                    LOA: {berth.maxLoa}m | Depth: -{berth.depth}m
                                </div>
                            </div>

                            {/* Timeline Area */}
                            <div className="flex-1 relative">
                                {/* Grid Lines */}
                                <div className="absolute inset-0 flex pointer-events-none">
                                    {Array.from({length: 24}).map((_, i) => (
                                        <div key={i} className="flex-1 border-l border-gray-100 h-full border-dashed"></div>
                                    ))}
                                </div>

                                {/* Vessels Bars */}
                                {allocations.filter(a => a.berthId === berth.id).map(alloc => (
                                    <div 
                                        key={alloc.id}
                                        className={`absolute top-4 bottom-4 rounded-lg shadow-md ${alloc.color} opacity-90 hover:opacity-100 cursor-pointer flex items-center justify-center text-white text-xs font-bold transition-all hover:scale-[1.01] overflow-hidden whitespace-nowrap px-2 z-10`}
                                        style={{ 
                                            left: `${alloc.start}%`, 
                                            width: `${alloc.duration}%` 
                                        }}
                                        title={`${alloc.vessel} (${alloc.status})`}
                                    >
                                        <div className="flex items-center gap-2">
                                            <Ship size={14} className="opacity-80"/> 
                                            {alloc.duration > 10 && <span>{alloc.vessel}</span>}
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

// 4. KẾ HOẠCH CƠ GIỚI & NHÂN SỰ (UNIFIED RESOURCE PLAN)
const UnifiedResourcePlanView = () => {
    const [activeTab, setActiveTab] = useState<'equipment' | 'personnel'>('equipment');

    // Mock Data
    const EQUIPMENT = [
        { id: 'EQ-01', name: 'Cẩu Bờ 01 (Liebherr)', type: 'Shore Crane', status: 'Working', location: 'Bến 1', operator: 'Nguyễn Văn A' },
        { id: 'EQ-02', name: 'Cẩu Bờ 02 (Kocks)', type: 'Shore Crane', status: 'Maintenance', location: 'Xưởng', operator: '--' },
        { id: 'EQ-03', name: 'Xe Nâng 5T (Forklift)', type: 'Forklift', status: 'Idle', location: 'Kho B', operator: 'Trần Văn B' },
        { id: 'EQ-04', name: 'Đầu Kéo 05', type: 'Truck', status: 'Working', location: 'Bến 1 -> Bãi A', operator: 'Lê Văn C' },
        { id: 'EQ-05', name: 'Đầu Kéo 06', type: 'Truck', status: 'Working', location: 'Bến 1 -> Bãi A', operator: 'Phạm Văn D' },
    ];

    const PERSONNEL = [
        { id: 'TM-01', name: 'Tổ Bốc Xếp 1', type: 'Stevedore', shift: 'Ca 1 (06:00 - 14:00)', status: 'Working', location: 'Hầm 1 - Tàu Glory Star', members: 12 },
        { id: 'TM-02', name: 'Tổ Bốc Xếp 2', type: 'Stevedore', shift: 'Ca 1 (06:00 - 14:00)', status: 'Working', location: 'Hầm 2 - Tàu Glory Star', members: 10 },
        { id: 'TM-03', name: 'Tổ Cơ Giới', type: 'Operator', shift: 'Ca 1 (06:00 - 14:00)', status: 'Standby', location: 'Văn phòng đội', members: 5 },
    ];

    return (
        <div className="flex flex-col h-full bg-[#F5F7FA] p-6">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-xl font-bold text-[#0F1B3D] flex items-center gap-2">
                        <Truck className="text-orange-600" /> Kế Hoạch Tài Nguyên (Resources)
                    </h2>
                    <p className="text-sm text-gray-500">Điều phối phương tiện cơ giới và nhân sự hiện trường</p>
                </div>
                
                {/* Tab Switcher */}
                <div className="bg-white p-1 rounded-lg border border-gray-200 flex shadow-sm">
                    <button 
                        onClick={() => setActiveTab('equipment')}
                        className={`px-4 py-2 rounded-md text-sm font-bold flex items-center gap-2 transition-all ${activeTab === 'equipment' ? 'bg-orange-50 text-orange-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        <Truck size={16} /> Cơ Giới
                    </button>
                    <button 
                        onClick={() => setActiveTab('personnel')}
                        className={`px-4 py-2 rounded-md text-sm font-bold flex items-center gap-2 transition-all ${activeTab === 'personnel' ? 'bg-blue-50 text-blue-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        <Users size={16} /> Nhân Sự
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 h-full overflow-hidden">
                {/* Statistics Sidebar */}
                <div className="md:col-span-1 bg-white rounded-xl shadow-sm border border-gray-200 p-5 h-full flex flex-col">
                    <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <Activity size={18} className="text-blue-500"/> Tổng quan ca làm việc
                    </h3>
                    
                    <div className="space-y-4">
                        <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                            <div className="text-xs font-bold text-gray-500 uppercase">Tổng thiết bị hoạt động</div>
                            <div className="text-2xl font-bold text-blue-700 mt-1">
                                {EQUIPMENT.filter(e => e.status === 'Working').length} <span className="text-sm text-gray-400 font-normal">/ {EQUIPMENT.length}</span>
                            </div>
                            <div className="w-full bg-blue-200 h-1.5 rounded-full mt-2 overflow-hidden">
                                <div className="bg-blue-600 h-full" style={{ width: '60%' }}></div>
                            </div>
                        </div>

                        <div className="bg-green-50 p-4 rounded-xl border border-green-100">
                            <div className="text-xs font-bold text-gray-500 uppercase">Nhân sự đi làm</div>
                            <div className="text-2xl font-bold text-green-700 mt-1">27 <span className="text-sm text-gray-400 font-normal">người</span></div>
                            <div className="flex -space-x-2 mt-2">
                                <div className="w-6 h-6 rounded-full bg-green-200 border-2 border-white"></div>
                                <div className="w-6 h-6 rounded-full bg-green-300 border-2 border-white"></div>
                                <div className="w-6 h-6 rounded-full bg-green-400 border-2 border-white"></div>
                                <div className="w-6 h-6 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-[8px] font-bold text-gray-500">+24</div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-auto border-t border-gray-100 pt-4">
                        <button className="w-full py-2 bg-gray-50 text-gray-600 font-bold rounded-lg border border-gray-200 hover:bg-gray-100 text-sm flex items-center justify-center gap-2">
                            <History size={16}/> Xem lịch sử ca trước
                        </button>
                    </div>
                </div>

                {/* Main List */}
                <div className="md:col-span-3 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
                    <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                        <div className="relative w-64">
                            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/>
                            <input className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 bg-white" placeholder={`Tìm kiếm ${activeTab === 'equipment' ? 'thiết bị' : 'nhân sự'}...`} />
                        </div>
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-700 shadow-md flex items-center gap-2">
                            <Plus size={16}/> Phân công mới
                        </button>
                    </div>

                    <div className="flex-1 overflow-auto">
                        <table className="w-full text-left">
                            <thead className="bg-white text-gray-500 font-bold text-xs uppercase border-b border-gray-200 sticky top-0 z-10">
                                <tr>
                                    <th className="px-6 py-4">{activeTab === 'equipment' ? 'Thiết bị' : 'Tổ / Đội'}</th>
                                    <th className="px-6 py-4">Loại</th>
                                    <th className="px-6 py-4">{activeTab === 'equipment' ? 'Vị trí / Tuyến' : 'Khu vực làm việc'}</th>
                                    <th className="px-6 py-4">{activeTab === 'equipment' ? 'Người vận hành' : 'Ca làm việc'}</th>
                                    <th className="px-6 py-4 text-center">Trạng thái</th>
                                    <th className="px-6 py-4 text-right">Tác vụ</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 text-sm">
                                {activeTab === 'equipment' ? (
                                    EQUIPMENT.map(item => (
                                        <tr key={item.id} className="hover:bg-blue-50/30 transition-colors group">
                                            <td className="px-6 py-4 font-bold text-gray-800 flex items-center gap-3">
                                                <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center text-orange-600">
                                                    <Truck size={16}/>
                                                </div>
                                                {item.name}
                                            </td>
                                            <td className="px-6 py-4 text-gray-600">{item.type}</td>
                                            <td className="px-6 py-4 text-blue-600 font-medium">{item.location}</td>
                                            <td className="px-6 py-4 text-gray-700">{item.operator}</td>
                                            <td className="px-6 py-4 text-center">
                                                <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${
                                                    item.status === 'Working' ? 'bg-green-50 text-green-700 border-green-200' : 
                                                    item.status === 'Maintenance' ? 'bg-red-50 text-red-700 border-red-200' :
                                                    'bg-gray-100 text-gray-600 border-gray-200'
                                                }`}>
                                                    {item.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button className="text-gray-400 hover:text-blue-600 p-1.5 hover:bg-gray-100 rounded"><PenTool size={16}/></button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    PERSONNEL.map(item => (
                                        <tr key={item.id} className="hover:bg-blue-50/30 transition-colors group">
                                            <td className="px-6 py-4 font-bold text-gray-800 flex items-center gap-3">
                                                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                                                    <HardHat size={16}/>
                                                </div>
                                                <div>
                                                    <div>{item.name}</div>
                                                    <div className="text-xs font-normal text-gray-400">{item.members} thành viên</div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-gray-600">{item.type}</td>
                                            <td className="px-6 py-4 text-blue-600 font-medium">{item.location}</td>
                                            <td className="px-6 py-4 text-gray-700">{item.shift}</td>
                                            <td className="px-6 py-4 text-center">
                                                <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${
                                                    item.status === 'Working' ? 'bg-green-50 text-green-700 border-green-200' : 
                                                    'bg-orange-50 text-orange-700 border-orange-200'
                                                }`}>
                                                    {item.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button className="text-gray-400 hover:text-blue-600 p-1.5 hover:bg-gray-100 rounded"><PenTool size={16}/></button>
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

// 2. ĐỊNH NGHĨA TÀU (VESSEL DEFINITION VIEW)
const VesselDefinitionView = () => {
    const [vessels, setVessels] = useState([
        { id: 1, name: 'MV. GLORY STAR', callSign: '3EFF5', voyageIn: 'V.2506', voyageOut: 'V.2506R', eta: '2025-12-12T08:00', etd: '2025-12-15T18:00', status: 'Arrived', cargo: 'Than đá', loa: 180, dwt: 45000, imo: '9123456', flag: 'PANAMA' },
        { id: 2, name: 'MV. OCEAN DRAGON', callSign: 'VR123', voyageIn: 'V.2201', voyageOut: 'V.2201R', eta: '2025-12-14T14:00', etd: '2025-12-16T22:00', status: 'Scheduled', cargo: 'Thép cuộn', loa: 160, dwt: 30000, imo: '9788811', flag: 'VIETNAM' },
        { id: 3, name: 'MV. PACIFIC GRACE', callSign: 'PA999', voyageIn: 'V.8812', voyageOut: 'V.8812R', eta: '2025-12-18T06:00', etd: '2025-12-20T12:00', status: 'Scheduled', cargo: 'Gỗ dăm', loa: 200, dwt: 50000, imo: '8812233', flag: 'LIBERIA' },
    ]);

    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [activeStatusFilter, setActiveStatusFilter] = useState('All');
    
    // Form State
    const [newVessel, setNewVessel] = useState({
        name: '',
        callSign: '', // Mã tàu
        imo: '',
        flag: '',
        voyageIn: '',
        voyageOut: '',
        eta: '',
        etd: '',
        cargo: '',
        loa: '',
        dwt: ''
    });

    const getStatusColor = (status: string) => {
        switch(status) {
            case 'Arrived': return 'bg-green-100 text-green-700 border-green-200';
            case 'Departed': return 'bg-gray-100 text-gray-700 border-gray-200';
            case 'Scheduled': return 'bg-blue-100 text-blue-700 border-blue-200';
            case 'Working': return 'bg-orange-100 text-orange-700 border-orange-200 animate-pulse';
            default: return 'bg-slate-100 text-slate-700';
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setNewVessel(prev => ({ ...prev, [name]: value }));
    };

    const handleSaveVessel = () => {
        if (!newVessel.name || !newVessel.callSign) {
            alert('Vui lòng nhập Tên tàu và Mã tàu!');
            return;
        }

        const vesselToAdd = {
            id: Date.now(),
            ...newVessel,
            status: 'Scheduled',
            loa: Number(newVessel.loa) || 0,
            dwt: Number(newVessel.dwt) || 0
        };

        setVessels(prev => [vesselToAdd, ...prev]);
        setShowModal(false);
        setNewVessel({
            name: '', callSign: '', imo: '', flag: '', 
            voyageIn: '', voyageOut: '', eta: '', etd: '', 
            cargo: '', loa: '', dwt: ''
        });
    };

    const filteredVessels = vessels.filter(v => {
        const matchesSearch = v.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                              v.callSign.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              v.imo.includes(searchTerm);
        const matchesStatus = activeStatusFilter === 'All' || v.status === activeStatusFilter;
        return matchesSearch && matchesStatus;
    });

    return (
        <div className="flex flex-col h-full bg-[#F5F7FA] relative">
            
            {/* Header & Main Actions */}
            <div className="bg-white px-6 py-4 border-b border-gray-200 flex justify-between items-center shadow-sm z-20">
                <div>
                    <h2 className="text-xl font-bold text-[#0F1B3D] flex items-center gap-2">
                        <Ship className="text-blue-600" /> Quản Lý & Định Nghĩa Tàu
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">Danh sách tàu đăng ký và lịch trình khai thác</p>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium text-sm transition-colors shadow-sm">
                        <Download size={16} /> Xuất Excel
                    </button>
                    <button 
                        onClick={() => setShowModal(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm transition-colors shadow-md"
                    >
                        <Plus size={16} /> Định Nghĩa Tàu Mới
                    </button>
                </div>
            </div>

            {/* Filter Bar */}
            <div className="bg-white px-6 py-3 border-b border-gray-200 flex flex-col md:flex-row gap-4 justify-between items-center">
                {/* Search */}
                <div className="relative w-full md:w-96">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input 
                        type="text" 
                        placeholder="Tìm tên tàu, IMO, hô hiệu..." 
                        className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:bg-white bg-slate-50 transition-all"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {/* Status Filter Tabs */}
                <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200">
                    {['All', 'Scheduled', 'Arrived', 'Working', 'Departed'].map(status => (
                        <button
                            key={status}
                            onClick={() => setActiveStatusFilter(status)}
                            className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all
                                ${activeStatusFilter === status 
                                    ? 'bg-white text-blue-700 shadow-sm' 
                                    : 'text-gray-500 hover:text-gray-700 hover:bg-slate-200'
                                }
                            `}
                        >
                            {status === 'All' ? 'Tất cả' : status}
                        </button>
                    ))}
                </div>
            </div>

            {/* Main Data Grid */}
            <div className="flex-1 overflow-auto p-6 bg-[#F5F7FA]">
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-gray-50 text-gray-500 font-bold text-xs uppercase border-b border-gray-200 sticky top-0 z-10 shadow-sm">
                            <tr>
                                <th className="px-6 py-4">Tên tàu / Nhận dạng</th>
                                <th className="px-6 py-4">Chuyến (In/Out)</th>
                                <th className="px-6 py-4">Lịch trình (ETA/ETD)</th>
                                <th className="px-6 py-4 text-center">Thông số (LOA/DWT)</th>
                                <th className="px-6 py-4">Hàng hóa chính</th>
                                <th className="px-6 py-4 text-center">Trạng thái</th>
                                <th className="px-6 py-4 text-right">Tác vụ</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredVessels.map(v => (
                                <tr key={v.id} className="hover:bg-blue-50/30 transition-colors group cursor-pointer">
                                    {/* Identity */}
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <div className="flex items-center gap-2 mb-1">
                                                <Flag size={14} className="text-blue-500" /> 
                                                <span className="text-xs font-bold text-gray-500">{v.flag}</span>
                                            </div>
                                            <div className="font-bold text-gray-800 text-sm">{v.name}</div>
                                            <div className="flex items-center gap-3 text-xs text-gray-400 mt-1 font-mono">
                                                <span>IMO: <b className="text-gray-600">{v.imo}</b></span>
                                                <span>|</span>
                                                <span>Call Sign: <b className="text-gray-600">{v.callSign}</b></span>
                                            </div>
                                        </div>
                                    </td>

                                    {/* Voyage */}
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col gap-2">
                                            <div className="flex items-center gap-2 text-xs font-medium bg-green-50 text-green-700 px-2 py-1 rounded w-fit border border-green-100">
                                                <ArrowDownCircle size={12} /> IN: {v.voyageIn}
                                            </div>
                                            <div className="flex items-center gap-2 text-xs font-medium bg-orange-50 text-orange-700 px-2 py-1 rounded w-fit border border-orange-100">
                                                <ArrowUpCircle size={12} /> OUT: {v.voyageOut}
                                            </div>
                                        </div>
                                    </td>

                                    {/* Schedule */}
                                    <td className="px-6 py-4">
                                        <div className="text-sm text-gray-600 space-y-2">
                                            <div className="flex items-center gap-2" title="Dự kiến đến">
                                                <div className="w-6 text-center"><Clock size={14} className="text-blue-500 mx-auto"/></div>
                                                <span className="font-medium text-blue-900">{new Date(v.eta).toLocaleString('vi-VN')}</span>
                                            </div>
                                            <div className="flex items-center gap-2" title="Dự kiến đi">
                                                <div className="w-6 text-center"><LogOut size={14} className="text-orange-500 mx-auto"/></div>
                                                <span className="font-medium text-orange-900">{new Date(v.etd).toLocaleString('vi-VN')}</span>
                                            </div>
                                        </div>
                                    </td>

                                    {/* Specs */}
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col items-center gap-1">
                                            <div className="text-xs bg-gray-100 px-2 py-1 rounded w-full text-center">
                                                LOA: <b className="text-gray-800">{v.loa}m</b>
                                            </div>
                                            <div className="text-xs bg-gray-100 px-2 py-1 rounded w-full text-center">
                                                DWT: <b className="text-gray-800">{v.dwt.toLocaleString()}T</b>
                                            </div>
                                        </div>
                                    </td>

                                    {/* Cargo */}
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <div className="p-1.5 bg-indigo-50 text-indigo-600 rounded">
                                                <Box size={16} />
                                            </div>
                                            <span className="text-sm font-bold text-gray-700">{v.cargo}</span>
                                        </div>
                                    </td>

                                    {/* Status */}
                                    <td className="px-6 py-4 text-center">
                                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(v.status)}`}>
                                            {v.status}
                                        </span>
                                    </td>

                                    {/* Actions */}
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-1">
                                            <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Chi tiết / Sửa">
                                                <Settings size={18} />
                                            </button>
                                            <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Xóa">
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    
                    {/* Empty State */}
                    {filteredVessels.length === 0 && (
                        <div className="p-12 text-center text-gray-400">
                            <Ship size={48} className="mx-auto mb-4 opacity-20" />
                            <p className="text-sm">Không tìm thấy tàu phù hợp với điều kiện tìm kiếm.</p>
                        </div>
                    )}
                </div>
                
                {/* Pagination Footer */}
                <div className="mt-4 flex justify-between items-center text-xs text-gray-500">
                    <span>Hiển thị {filteredVessels.length} kết quả</span>
                    <div className="flex gap-1">
                        <button className="px-3 py-1 bg-white border border-gray-300 rounded hover:bg-gray-50">Trước</button>
                        <button className="px-3 py-1 bg-white border border-gray-300 rounded hover:bg-gray-50">Sau</button>
                    </div>
                </div>
            </div>

            {/* --- ADD NEW VESSEL MODAL --- */}
            {showModal && (
                <div className="absolute inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden animate-fade-in">
                        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-blue-50/50">
                            <h3 className="font-bold text-lg text-[#0F1B3D] flex items-center gap-2">
                                <Ship className="text-blue-600" /> Định Nghĩa Tàu Mới
                            </h3>
                            <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-red-500 transition-colors">
                                <X size={20} />
                            </button>
                        </div>
                        
                        <div className="p-6 overflow-y-auto max-h-[70vh]">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Basic Info */}
                                <div className="space-y-4">
                                    <h4 className="text-xs font-bold text-gray-400 uppercase border-b border-gray-100 pb-1">Thông tin chung</h4>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Tên Tàu (Vessel Name) *</label>
                                        <input 
                                            name="name" 
                                            value={newVessel.name} 
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
                                            placeholder="Ex: MV. GLORY STAR" 
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Mã Tàu (Call Sign) *</label>
                                            <input 
                                                name="callSign" 
                                                value={newVessel.callSign}
                                                onChange={handleInputChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
                                                placeholder="Ex: 3EFF5" 
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">IMO Number</label>
                                            <input 
                                                name="imo" 
                                                value={newVessel.imo}
                                                onChange={handleInputChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
                                                placeholder="Ex: 9123456" 
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Quốc Tịch (Flag)</label>
                                        <div className="relative">
                                            <Globe className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16}/>
                                            <input 
                                                name="flag"
                                                value={newVessel.flag}
                                                onChange={handleInputChange}
                                                className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
                                                placeholder="Ex: PANAMA" 
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Schedule & Cargo */}
                                <div className="space-y-4">
                                    <h4 className="text-xs font-bold text-gray-400 uppercase border-b border-gray-100 pb-1">Lịch trình & Hàng hóa</h4>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Chuyến Nhập</label>
                                            <input 
                                                name="voyageIn"
                                                value={newVessel.voyageIn}
                                                onChange={handleInputChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
                                                placeholder="Ex: V.2506" 
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Chuyến Xuất</label>
                                            <input 
                                                name="voyageOut"
                                                value={newVessel.voyageOut}
                                                onChange={handleInputChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
                                                placeholder="Ex: V.2506R" 
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">ETA (Dự kiến đến)</label>
                                            <input 
                                                type="datetime-local" 
                                                name="eta"
                                                value={newVessel.eta}
                                                onChange={handleInputChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm" 
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">ETD (Dự kiến đi)</label>
                                            <input 
                                                type="datetime-local" 
                                                name="etd"
                                                value={newVessel.etd}
                                                onChange={handleInputChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm" 
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Loại hàng chính</label>
                                        <input 
                                            name="cargo"
                                            value={newVessel.cargo}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
                                            placeholder="Ex: Than đá, Gỗ dăm..." 
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">LOA (m)</label>
                                            <input 
                                                type="number"
                                                name="loa"
                                                value={newVessel.loa}
                                                onChange={handleInputChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
                                                placeholder="0" 
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">DWT (Tấn)</label>
                                            <input 
                                                type="number"
                                                name="dwt"
                                                value={newVessel.dwt}
                                                onChange={handleInputChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
                                                placeholder="0" 
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-3">
                            <button 
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                            >
                                Hủy bỏ
                            </button>
                            <button 
                                onClick={handleSaveVessel}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 shadow-md transition-colors flex items-center gap-2"
                            >
                                <Save size={18} /> Lưu Thông Tin
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

// 1. KẾ HOẠCH BÃI (YARD PLAN) - REDESIGNED INTERACTIVE DRAG & DROP
const YardPlanView = () => {
  // --- MOCK DATA ---
  const VESSELS = [
    { id: 'v1', name: 'MV. GLORY STAR (V.2506)' },
    { id: 'v2', name: 'MV. OCEAN DRAGON (V.2201)' },
  ];

  const INITIAL_CARGO = [
    { id: 'c1', name: 'Than đá (Coal)', weight: 5000, units: 1, hold: 'H1', type: 'Bulk', color: 'bg-gray-800' },
    { id: 'c2', name: 'Thép cuộn (Coils)', weight: 120, units: 20, hold: 'H2', type: 'General', color: 'bg-blue-600' },
    { id: 'c3', name: 'Thép tấm (Plate)', weight: 300, units: 15, hold: 'H2', type: 'General', color: 'bg-blue-500' },
    { id: 'c4', name: 'Gỗ dăm (Wood)', weight: 4500, units: 1, hold: 'H3', type: 'Bulk', color: 'bg-amber-600' },
    { id: 'c5', name: 'Phân bón (Fert)', weight: 2000, units: 4000, hold: 'H4', type: 'Bag', color: 'bg-emerald-600' },
  ];

  // Organize slots into Blocks for better UI
  const INITIAL_BLOCKS = [
      { id: 'BLK-A', name: 'Block A (Hàng Rời)', type: 'Bulk', capacity: 20000, slots: Array.from({length: 12}).map((_, i) => ({ id: `A-${i+1}`, code: `A-${String(i+1).padStart(2,'0')}`, status: i === 2 ? 'occupied' : 'empty', cargo: i === 2 ? { name: 'Than đá', weight: 1500, color: 'bg-gray-800' } : null, maxCap: 2000 })) },
      { id: 'BLK-B', name: 'Block B (Tổng Hợp)', type: 'General', capacity: 10000, slots: Array.from({length: 8}).map((_, i) => ({ id: `B-${i+1}`, code: `B-${String(i+1).padStart(2,'0')}`, status: i === 5 ? 'occupied' : 'empty', cargo: i === 5 ? { name: 'Thép cuộn', weight: 500, color: 'bg-blue-600' } : null, maxCap: 1000 })) },
  ];

  // --- STATE ---
  const [selectedVessel, setSelectedVessel] = useState(VESSELS[0].id);
  const [cargoList, setCargoList] = useState(INITIAL_CARGO);
  const [blocks, setBlocks] = useState(INITIAL_BLOCKS);
  
  // Drag & Drop State
  const [draggingItem, setDraggingItem] = useState<string | null>(null);
  const [dragOverSlot, setDragOverSlot] = useState<string | null>(null);
  
  // Modal & Allocation Logic State
  const [tempDrop, setTempDrop] = useState<{ cargoId: string, slotId: string, blockId: string } | null>(null);
  const [showInputModal, setShowInputModal] = useState(false);
  const [allocAmount, setAllocAmount] = useState<number>(0);
  
  const [pendingAllocation, setPendingAllocation] = useState<{ cargoId: string, slotId: string, blockId: string, weight: number } | null>(null);

  // --- HANDLERS ---

  const handleDragStart = (e: React.DragEvent, cargoId: string) => {
    e.dataTransfer.setData('cargoId', cargoId);
    e.dataTransfer.effectAllowed = 'copyMove';
    setDraggingItem(cargoId);
  };

  const handleDragOver = (e: React.DragEvent, slotId: string, status: string) => {
    e.preventDefault(); 
    if (status === 'locked') return; // Can't drop on locked
    setDragOverSlot(slotId);
  };

  const handleDragLeave = () => {
    setDragOverSlot(null);
  };

  const handleDrop = (e: React.DragEvent, slotId: string, blockId: string, status: string) => {
    e.preventDefault();
    setDraggingItem(null);
    setDragOverSlot(null);

    // Allow dropping on empty or occupied (to add more)
    if (status === 'locked') return;

    const cargoId = e.dataTransfer.getData('cargoId');
    if (cargoId) {
        // Instead of setting pendingAllocation directly, we open the modal
        const cargo = cargoList.find(c => c.id === cargoId);
        setTempDrop({ cargoId, slotId, blockId });
        setAllocAmount(cargo ? cargo.weight : 0); // Default to max
        setShowInputModal(true);
    }
  };

  const submitQuantityModal = () => {
      if (tempDrop && allocAmount > 0) {
          setPendingAllocation({
              ...tempDrop,
              weight: allocAmount
          });
          setShowInputModal(false);
          setTempDrop(null);
      }
  };

  const closeQuantityModal = () => {
      setShowInputModal(false);
      setTempDrop(null);
  };

  const cancelAllocation = () => {
    setPendingAllocation(null);
  };

  const confirmAllocation = () => {
    if (!pendingAllocation) return;

    const { cargoId, slotId, blockId, weight } = pendingAllocation;
    const cargo = cargoList.find(c => c.id === cargoId);

    if (!cargo) return;

    // Update Blocks/Slots
    setBlocks(prev => prev.map(block => {
        if (block.id !== blockId) return block;
        
        return {
            ...block,
            slots: block.slots.map(slot => {
                if (slot.id !== slotId) return slot;
                
                // Logic: Accumulate weight if same cargo, or replace if empty
                const currentWeight = slot.cargo ? slot.cargo.weight : 0;
                const newWeight = currentWeight + weight; 
                
                return {
                    ...slot,
                    status: 'occupied',
                    cargo: { 
                        name: cargo.name, 
                        weight: newWeight,
                        color: cargo.color
                    }
                };
            })
        };
    }));

    // Update Cargo List (Reduce weight or remove if 0)
    setCargoList(prev => prev.map(c => {
        if (c.id === cargoId) {
            const remaining = c.weight - weight;
            return remaining > 0 ? { ...c, weight: remaining } : null;
        }
        return c;
    }).filter(Boolean) as any[]); // Remove nulls

    setPendingAllocation(null);
  };

  // Helper to find pending details
  const getPendingDetails = () => {
      if(!pendingAllocation) return null;
      const cargo = cargoList.find(c => c.id === pendingAllocation.cargoId);
      let targetSlot = null;
      blocks.forEach(b => {
          const s = b.slots.find(slot => slot.id === pendingAllocation.slotId);
          if(s) targetSlot = s;
      });
      return { cargo, targetSlot, weight: pendingAllocation.weight };
  };

  const pendingDetails = getPendingDetails();

  // Calculations for Yard Stats
  const totalCapacity = blocks.reduce((acc, b) => acc + b.capacity, 0);
  const usedCapacity = blocks.reduce((acc, b) => acc + b.slots.reduce((sAcc, s) => sAcc + (s.cargo?.weight || 0), 0), 0);
  const utilization = Math.round((usedCapacity / totalCapacity) * 100);

  return (
    <div className="flex h-full flex-col bg-[#F8F9FB] overflow-hidden relative">
      
      {/* --- QUANTITY INPUT MODAL --- */}
      {showInputModal && tempDrop && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fade-in">
              <div className="bg-white rounded-2xl shadow-2xl w-96 overflow-hidden transform scale-100 transition-all border border-gray-200">
                  <div className="bg-blue-600 px-6 py-4 flex justify-between items-center">
                      <h3 className="text-white font-bold text-lg flex items-center gap-2">
                          <Calculator size={20}/> Nhập Số Lượng Kế Hoạch
                      </h3>
                      <button onClick={closeQuantityModal} className="text-blue-200 hover:text-white"><X size={20}/></button>
                  </div>
                  
                  <div className="p-6 space-y-5">
                      {/* Context Info */}
                      <div className="flex items-center gap-3 bg-blue-50 p-3 rounded-lg border border-blue-100">
                          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                              <Database size={18} className="text-blue-600"/>
                          </div>
                          <div>
                              <div className="text-xs text-gray-500 uppercase font-bold">Hàng hóa</div>
                              <div className="text-sm font-bold text-gray-800 line-clamp-1">
                                  {cargoList.find(c => c.id === tempDrop.cargoId)?.name}
                              </div>
                          </div>
                      </div>

                      {/* Input Area */}
                      <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                              Số lượng kế hoạch
                          </label>
                          <div className="relative">
                              <input 
                                  type="number" 
                                  autoFocus
                                  className="w-full pl-4 pr-12 py-3 text-2xl font-bold text-gray-800 border border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                                  value={allocAmount}
                                  onChange={(e) => setAllocAmount(Number(e.target.value))}
                              />
                              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">
                                  TON
                              </span>
                          </div>
                          <div className="flex justify-between mt-2 text-xs">
                              <span className="text-gray-500">Khả dụng: <span className="font-bold text-gray-800">{cargoList.find(c => c.id === tempDrop.cargoId)?.weight.toLocaleString()} T</span></span>
                              <button onClick={() => setAllocAmount(cargoList.find(c => c.id === tempDrop.cargoId)?.weight || 0)} className="text-blue-600 font-bold hover:underline">Tất cả</button>
                          </div>
                      </div>
                  </div>

                  <div className="p-4 bg-gray-50 border-t border-gray-100 flex gap-3">
                      <button onClick={closeQuantityModal} className="flex-1 py-2.5 bg-white border border-gray-300 text-gray-700 font-bold rounded-xl hover:bg-gray-100">Hủy</button>
                      <button onClick={submitQuantityModal} className="flex-1 py-2.5 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 shadow-md">Xác nhận</button>
                  </div>
              </div>
          </div>
      )}

      {/* 1. TOP HEADER: VESSEL & STATS */}
      <div className="h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between shrink-0 shadow-sm z-20">
          <div className="flex items-center gap-6">
              <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Tàu đang làm hàng</span>
                  <div className="flex items-center gap-2 cursor-pointer group">
                      <Ship size={18} className="text-blue-600 group-hover:scale-110 transition-transform" />
                      <select 
                        value={selectedVessel}
                        onChange={(e) => setSelectedVessel(e.target.value)}
                        className="text-sm font-bold text-gray-800 bg-transparent outline-none cursor-pointer hover:text-blue-600"
                      >
                          {VESSELS.map(v => <option key={v.id} value={v.id}>{v.name}</option>)}
                      </select>
                      <ChevronDown size={14} className="text-gray-400" />
                  </div>
              </div>
              <div className="h-8 w-px bg-gray-200"></div>
              <div className="flex flex-col w-48">
                  <div className="flex justify-between text-[10px] font-bold uppercase mb-1">
                      <span className="text-gray-400">Sức chứa toàn bãi</span>
                      <span className="text-blue-600">{utilization}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full transition-all duration-500" style={{width: `${utilization}%`}}></div>
                  </div>
                  <div className="text-[10px] text-gray-400 mt-0.5 text-right">{usedCapacity.toLocaleString()} / {totalCapacity.toLocaleString()} T</div>
              </div>
          </div>

          <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-300 text-gray-600 rounded-lg text-xs font-bold hover:bg-gray-50 transition-colors shadow-sm">
                  <Filter size={14} /> Bộ lọc
              </button>
              <button className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-bold hover:bg-blue-700 transition-colors shadow-md">
                  <Save size={14} /> Lưu kế hoạch
              </button>
          </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
          
          {/* 2. LEFT SIDEBAR: CARGO SOURCE */}
          <div className="w-[320px] bg-white border-r border-gray-200 flex flex-col z-10">
              <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
                  <h3 className="font-bold text-gray-700 text-sm flex items-center gap-2">
                      <Database size={16} className="text-orange-500"/> Nguồn Hàng (Manifest)
                  </h3>
                  <span className="bg-orange-100 text-orange-700 text-xs font-bold px-2 py-0.5 rounded-full">{cargoList.length}</span>
              </div>
              
              <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#F8F9FA]">
                  {cargoList.length === 0 ? (
                      <div className="flex flex-col items-center justify-center h-full text-gray-400 opacity-50">
                          <CheckCircle2 size={40} className="mb-2"/>
                          <span className="text-xs font-medium">Đã lập kế hoạch xong</span>
                      </div>
                  ) : (
                      cargoList.map(item => (
                          <div 
                              key={item.id}
                              draggable
                              onDragStart={(e) => handleDragStart(e, item.id)}
                              className={`bg-white rounded-xl border border-gray-200 p-3 shadow-sm hover:shadow-md cursor-grab active:cursor-grabbing group relative overflow-hidden transition-all
                                  ${pendingAllocation?.cargoId === item.id ? 'opacity-40 ring-2 ring-blue-400 bg-blue-50' : ''}
                              `}
                          >
                              {/* Left Color Strip */}
                              <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${item.color}`}></div>
                              
                              <div className="pl-3">
                                  <div className="flex justify-between items-start mb-2">
                                      <span className="font-bold text-gray-800 text-sm line-clamp-1">{item.name}</span>
                                      <span className="bg-gray-100 text-gray-600 text-[10px] font-bold px-1.5 py-0.5 rounded border border-gray-200">{item.hold}</span>
                                  </div>
                                  
                                  <div className="grid grid-cols-2 gap-2 text-xs">
                                      <div className="flex flex-col">
                                          <span className="text-gray-400 text-[10px] uppercase">Trọng lượng</span>
                                          <span className="font-bold text-gray-700">{item.weight.toLocaleString()} T</span>
                                      </div>
                                      <div className="flex flex-col">
                                          <span className="text-gray-400 text-[10px] uppercase">Loại</span>
                                          <span className="font-medium text-gray-600">{item.type}</span>
                                      </div>
                                  </div>
                              </div>
                              
                              {/* Drag Hint */}
                              <div className="absolute right-2 bottom-2 opacity-0 group-hover:opacity-100 transition-opacity text-gray-300">
                                  <GripVertical size={14} />
                              </div>
                          </div>
                      ))
                  )}
              </div>
          </div>

          {/* 3. CENTER: YARD MAP */}
          <div className="flex-1 flex flex-col relative bg-[#F0F2F5] overflow-hidden">
              {/* Map Controls */}
              <div className="absolute top-4 right-4 flex bg-white rounded-lg shadow-sm border border-gray-200 p-1 z-10">
                  <button className="p-2 hover:bg-gray-50 rounded text-gray-600" title="Zoom In"><Plus size={16}/></button>
                  <div className="w-px bg-gray-200 my-1"></div>
                  <button className="p-2 hover:bg-gray-50 rounded text-gray-600" title="Zoom Out"><MoveDown size={16}/></button>
              </div>

              {/* Legend */}
              <div className="absolute top-4 left-4 flex gap-3 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg shadow-sm border border-gray-200 z-10 text-xs">
                  <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded bg-white border border-gray-300"></div> Trống</div>
                  <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded bg-blue-100 border border-blue-300"></div> Có hàng</div>
                  <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded bg-orange-100 border-orange-300 ring-2 ring-orange-200"></div> Đang chọn</div>
              </div>

              <div className="flex-1 overflow-auto p-8">
                  <div className="max-w-5xl mx-auto space-y-8 pb-20">
                      {blocks.map(block => (
                          <div key={block.id} className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                              {/* Block Header */}
                              <div className="bg-gray-50/80 px-6 py-3 border-b border-gray-100 flex justify-between items-center">
                                  <h4 className="font-bold text-gray-700 flex items-center gap-2">
                                      <Layers size={16} className="text-blue-500"/> {block.name}
                                  </h4>
                                  <div className="flex items-center gap-2 text-xs">
                                      <span className="text-gray-500">Sức chứa:</span>
                                      <span className="font-bold text-gray-800">{block.capacity.toLocaleString()} T</span>
                                  </div>
                              </div>

                              {/* Slots Grid */}
                              <div className="p-6 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                                  {block.slots.map(slot => {
                                      const isDragOver = dragOverSlot === slot.id;
                                      const isTarget = pendingAllocation?.slotId === slot.id;
                                      const isOccupied = slot.status === 'occupied';
                                      const fillPercent = isOccupied ? Math.min(100, Math.round((slot.cargo?.weight || 0) / slot.maxCap * 100)) : 0;

                                      return (
                                          <div 
                                              key={slot.id}
                                              onDragOver={(e) => handleDragOver(e, slot.id, slot.status)}
                                              onDragLeave={handleDragLeave}
                                              onDrop={(e) => handleDrop(e, slot.id, block.id, slot.status)}
                                              className={`
                                                  relative aspect-square rounded-xl border transition-all duration-200 flex flex-col p-3 group select-none
                                                  ${isDragOver ? 'bg-orange-50 border-orange-400 scale-105 shadow-lg z-10 ring-4 ring-orange-100' : ''}
                                                  ${isTarget ? 'bg-blue-50 border-blue-500 ring-2 ring-blue-200' : ''}
                                                  ${isOccupied && !isTarget && !isDragOver ? 'bg-white border-gray-200 hover:border-blue-300 hover:shadow-md' : ''}
                                                  ${!isOccupied && !isTarget && !isDragOver ? 'bg-slate-50 border-dashed border-gray-300 hover:border-gray-400 hover:bg-slate-100' : ''}
                                              `}
                                          >
                                              {/* Slot Header */}
                                              <div className="flex justify-between items-center mb-2">
                                                  <span className="text-[10px] font-bold text-gray-400 uppercase">{slot.code}</span>
                                                  {isOccupied && <Info size={12} className="text-gray-300 hover:text-blue-500 cursor-pointer"/>}
                                              </div>

                                              {/* Slot Content */}
                                              <div className="flex-1 flex flex-col items-center justify-center">
                                                  {isOccupied ? (
                                                      <>
                                                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-2 shadow-sm text-white ${slot.cargo?.color || 'bg-gray-500'}`}>
                                                              <Archive size={16} />
                                                          </div>
                                                          <div className="text-xs font-bold text-gray-700 text-center line-clamp-2 leading-tight">{slot.cargo?.name}</div>
                                                      </>
                                                  ) : (
                                                      isTarget ? (
                                                          <ArrowDownCircle size={24} className="text-blue-500 animate-bounce" />
                                                      ) : (
                                                          <div className="w-8 h-8 rounded-full bg-gray-200/50 flex items-center justify-center">
                                                              <Plus size={16} className="text-gray-400" />
                                                          </div>
                                                      )
                                                  )}
                                              </div>

                                              {/* Slot Footer (Progress) */}
                                              {isOccupied && (
                                                  <div className="mt-2">
                                                      <div className="flex justify-between text-[9px] text-gray-500 mb-0.5">
                                                          <span>{slot.cargo?.weight.toLocaleString()}T</span>
                                                          <span>{fillPercent}%</span>
                                                      </div>
                                                      <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                                          <div className={`h-full rounded-full ${fillPercent > 90 ? 'bg-red-500' : 'bg-green-500'}`} style={{width: `${fillPercent}%`}}></div>
                                                      </div>
                                                  </div>
                                              )}
                                          </div>
                                      );
                                  })}
                              </div>
                          </div>
                      ))}
                  </div>
              </div>
          </div>

          {/* 4. RIGHT SIDEBAR: DETAILS & ACTION */}
          <div className={`w-[300px] bg-white border-l border-gray-200 z-20 shadow-xl transition-all duration-300 flex flex-col
              ${pendingAllocation ? 'translate-x-0' : 'translate-x-full hidden'}
          `}>
              {pendingDetails && (
                  <>
                      <div className="p-5 border-b border-gray-100 bg-blue-50/50">
                          <h3 className="font-bold text-blue-900 text-base flex items-center gap-2">
                              <CheckSquare size={18} className="text-blue-600"/> Xác nhận gán bãi
                          </h3>
                          <p className="text-xs text-blue-600/70 mt-1">Vui lòng kiểm tra thông tin trước khi lưu</p>
                      </div>

                      <div className="flex-1 p-5 space-y-6 overflow-y-auto">
                          
                          {/* Visual Flow */}
                          <div className="flex items-center justify-between px-2">
                              <div className="flex flex-col items-center gap-2">
                                  <div className="w-12 h-12 bg-white border border-gray-200 rounded-xl flex items-center justify-center shadow-sm">
                                      <Database size={20} className="text-orange-500"/>
                                  </div>
                                  <span className="text-xs font-bold text-gray-500">Hàng hóa</span>
                              </div>
                              <div className="flex-1 h-px bg-gray-300 mx-3 relative">
                                  <div className="absolute right-0 top-1/2 -translate-y-1/2 -mt-[3px] w-1.5 h-1.5 bg-gray-300 rounded-full"></div>
                              </div>
                              <div className="flex flex-col items-center gap-2">
                                  <div className="w-12 h-12 bg-white border border-gray-200 rounded-xl flex items-center justify-center shadow-sm">
                                      <MapPin size={20} className="text-blue-500"/>
                                  </div>
                                  <span className="text-xs font-bold text-gray-500">Vị trí đích</span>
                              </div>
                          </div>

                          {/* Info Cards */}
                          <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 space-y-3">
                              <div className="flex justify-between items-start border-b border-gray-200 pb-2">
                                  <span className="text-xs text-gray-500 font-medium">Tên hàng</span>
                                  <span className="text-sm font-bold text-gray-800 text-right w-2/3">{pendingDetails.cargo?.name}</span>
                              </div>
                              <div className="flex justify-between items-center">
                                  <span className="text-xs text-gray-500 font-medium">Lượng gán</span>
                                  <span className="text-lg font-black text-blue-600">{pendingDetails.weight.toLocaleString()} Tấn</span>
                              </div>
                              <div className="flex justify-between items-center">
                                  <span className="text-xs text-gray-500 font-medium">Hầm hàng</span>
                                  <span className="text-xs font-bold bg-white border border-gray-200 px-2 py-0.5 rounded text-gray-700">{pendingDetails.cargo?.hold}</span>
                              </div>
                          </div>

                          <div className="bg-blue-50 rounded-xl p-4 border border-blue-100 space-y-3">
                              <div className="flex justify-between items-center border-b border-blue-200 pb-2">
                                  <span className="text-xs text-blue-600 font-medium">Vị trí</span>
                                  <span className="text-lg font-black text-blue-800">{pendingDetails.targetSlot?.code}</span>
                              </div>
                              <div className="flex justify-between items-center">
                                  <span className="text-xs text-blue-600 font-medium">Sức chứa max</span>
                                  <span className="text-sm font-bold text-blue-800">{pendingDetails.targetSlot?.maxCap.toLocaleString()} T</span>
                              </div>
                              <div className="flex justify-between items-center">
                                  <span className="text-xs text-blue-600 font-medium">Trạng thái</span>
                                  <span className="text-xs font-bold bg-white text-blue-700 px-2 py-0.5 rounded border border-blue-100">
                                      {pendingDetails.targetSlot?.status === 'occupied' ? 'Ghép hàng' : 'Trống'}
                                  </span>
                              </div>
                          </div>

                      </div>

                      <div className="p-5 border-t border-gray-100 bg-gray-50 flex gap-3">
                          <button 
                              onClick={cancelAllocation}
                              className="flex-1 py-2.5 bg-white border border-gray-300 text-gray-600 rounded-xl text-sm font-bold hover:bg-gray-100 transition-colors"
                          >
                              Hủy
                          </button>
                          <button 
                              onClick={confirmAllocation}
                              className="flex-1 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 shadow-md shadow-blue-200 transition-colors"
                          >
                              Xác nhận
                          </button>
                      </div>
                  </>
              )}
          </div>

      </div>
    </div>
  );
};

export const OperationPlan: React.FC<OperationPlanProps> = ({ viewId }) => {
  switch (viewId) {
    case 'plan-yard':
      return <YardPlanView />;
    case 'plan-vessel-def':
      return <VesselDefinitionView />;
    case 'plan-berth-ops':
      return <BerthPlanView />;
    case 'plan-eqp-unified':
      return <UnifiedResourcePlanView />;
    default:
      return (
        <div className="flex flex-col items-center justify-center h-full text-slate-400 bg-[#F5F7FB]">
          <div className="text-6xl mb-4 opacity-20">
             <GanttChart size={64} />
          </div>
          <div className="text-2xl mb-2 font-bold text-slate-400">Chức năng đang phát triển</div>
          <div className="text-sm text-slate-400">Module ID: <span className="font-mono bg-slate-100 px-2 py-1 rounded">{viewId}</span></div>
          <p className="mt-4 text-slate-400 max-w-md text-center">
             Vui lòng quay lại sau hoặc chọn <b>Kế hoạch bãi (Yard Plan)</b> hoặc <b>Định nghĩa tàu</b> để xem bản demo.
          </p>
        </div>
      );
  }
};
