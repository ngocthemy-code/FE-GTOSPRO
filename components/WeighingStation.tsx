
import React, { useState, useEffect } from 'react';
import { 
  Scale, 
  Truck, 
  Container, 
  Activity, 
  RefreshCw, 
  Database, 
  Server, 
  CheckCircle, 
  XCircle, 
  Search, 
  Filter, 
  ArrowRight,
  Wifi,
  Clock,
  Code
} from 'lucide-react';

interface WeighRecord {
  id: string;
  ticketNo: string;
  vehicle: string;
  mooc: string;
  cargo: string;
  gross: number;
  tare: number;
  net: number;
  timeIn: string;
  timeOut: string;
  status: 'Completed' | 'Pending' | 'Error';
}

interface ApiLog {
  id: string;
  timestamp: string;
  method: string;
  endpoint: string;
  status: number;
  latency: string;
  payload: string;
}

export const WeighingStation: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'monitor' | 'api'>('monitor');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Mock Data
  const [records, setRecords] = useState<WeighRecord[]>([
    { id: '1', ticketNo: 'TK-2506-001', vehicle: '15C-123.45', mooc: '15R-00123', cargo: 'Than đá', gross: 45000, tare: 12000, net: 33000, timeIn: '08:15', timeOut: '08:30', status: 'Completed' },
    { id: '2', ticketNo: 'TK-2506-002', vehicle: '29H-888.99', mooc: '29R-05678', cargo: 'Thép cuộn', gross: 38500, tare: 14000, net: 24500, timeIn: '08:45', timeOut: '09:05', status: 'Completed' },
    { id: '3', ticketNo: 'TK-2506-003', vehicle: '51D-456.78', mooc: '51R-33321', cargo: 'Gỗ dăm', gross: 0, tare: 11500, net: 0, timeIn: '09:10', timeOut: '--', status: 'Pending' },
  ]);

  const [logs, setLogs] = useState<ApiLog[]>([
    { id: 'log-101', timestamp: '2023-12-15 08:30:05', method: 'POST', endpoint: '/api/v1/weighing/submit', status: 200, latency: '45ms', payload: '{"truck":"15C-123.45", "weight":45000, "station":"S01"}' },
    { id: 'log-102', timestamp: '2023-12-15 09:05:12', method: 'POST', endpoint: '/api/v1/weighing/submit', status: 200, latency: '52ms', payload: '{"truck":"29H-888.99", "weight":38500, "station":"S01"}' },
    { id: 'log-103', timestamp: '2023-12-15 09:10:01', method: 'POST', endpoint: '/api/v1/gate/check-in', status: 201, latency: '38ms', payload: '{"truck":"51D-456.78", "gate":"G02"}' },
    { id: 'log-104', timestamp: '2023-12-15 09:15:22', method: 'GET', endpoint: '/api/v1/sync/master-data', status: 500, latency: '1200ms', payload: '{"error": "Timeout"}' },
  ]);

  const [currentWeight, setCurrentWeight] = useState(0);

  // Simulate Live Scale Weight
  useEffect(() => {
    const interval = setInterval(() => {
      // Fluctuate weight slightly to simulate live scale
      setCurrentWeight(prev => {
         const base = 32000; 
         const fluctuation = Math.floor(Math.random() * 50) - 25;
         return base + fluctuation;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSimulateApiCall = () => {
      // Add a new mock record
      const newRecord: WeighRecord = {
          id: Date.now().toString(),
          ticketNo: `TK-2506-00${records.length + 1}`,
          vehicle: `15C-${Math.floor(Math.random()*900)+100}.${Math.floor(Math.random()*90)}`,
          mooc: `15R-${Math.floor(Math.random()*90000)}`,
          cargo: Math.random() > 0.5 ? 'Than đá' : 'Quặng sắt',
          gross: Math.floor(Math.random() * 20000) + 30000,
          tare: 12000,
          net: 0,
          timeIn: new Date().toLocaleTimeString('vi-VN', {hour: '2-digit', minute:'2-digit'}),
          timeOut: new Date().toLocaleTimeString('vi-VN', {hour: '2-digit', minute:'2-digit'}),
          status: 'Completed'
      };
      newRecord.net = newRecord.gross - newRecord.tare;
      setRecords([newRecord, ...records]);

      // Add a new log
      const newLog: ApiLog = {
          id: `log-${Date.now()}`,
          timestamp: new Date().toLocaleString('vi-VN'),
          method: 'POST',
          endpoint: '/api/v1/weighing/submit',
          status: 200,
          latency: `${Math.floor(Math.random() * 50) + 20}ms`,
          payload: JSON.stringify({
              truck: newRecord.vehicle,
              gross: newRecord.gross,
              tare: newRecord.tare,
              cargo: newRecord.cargo,
              station: "S01"
          })
      };
      setLogs([newLog, ...logs]);
  };

  const renderMonitorTab = () => (
    <div className="space-y-6 animate-fade-in">
        {/* Live Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Scale 1 Display */}
            <div className="bg-slate-900 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
                <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-2">
                        <Scale className="text-green-400" />
                        <span className="font-bold text-lg">Cầu Cân Số 01</span>
                    </div>
                    <span className="flex items-center gap-1.5 px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-bold uppercase animate-pulse border border-green-500/30">
                        <Wifi size={12} /> Online
                    </span>
                </div>
                <div className="text-center py-6">
                    <div className="text-6xl font-mono font-black tracking-tighter text-green-400 tabular-nums">
                        {currentWeight.toLocaleString()} <span className="text-2xl text-gray-500">kg</span>
                    </div>
                    <p className="text-gray-400 mt-2 text-sm">Đang chờ ổn định...</p>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500/0 via-green-500 to-green-500/0 opacity-50"></div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                        <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><Truck size={20} /></div>
                        <span className="text-xs font-bold text-gray-400 uppercase">Hôm nay</span>
                    </div>
                    <div>
                        <div className="text-3xl font-bold text-gray-800 mt-2">{records.length}</div>
                        <div className="text-xs text-gray-500">Lượt xe qua cân</div>
                    </div>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                        <div className="p-2 bg-orange-50 text-orange-600 rounded-lg"><Database size={20} /></div>
                        <span className="text-xs font-bold text-gray-400 uppercase">Tổng lượng</span>
                    </div>
                    <div>
                        <div className="text-3xl font-bold text-gray-800 mt-2">
                            {(records.reduce((acc, curr) => acc + (curr.status === 'Completed' ? curr.net : 0), 0) / 1000).toFixed(1)}
                        </div>
                        <div className="text-xs text-gray-500">Tấn hàng hóa</div>
                    </div>
                </div>
            </div>
        </div>

        {/* History Table */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                <h3 className="font-bold text-gray-700 uppercase text-sm">Lịch sử cân xe</h3>
                <div className="flex gap-2">
                    <input 
                        className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-500 w-64" 
                        placeholder="Tìm số xe, số phiếu..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button className="p-1.5 bg-white border border-gray-200 rounded hover:bg-gray-50 text-gray-600"><Filter size={16}/></button>
                </div>
            </div>
            <table className="w-full text-left text-sm">
                <thead className="bg-white text-gray-500 font-bold border-b border-gray-100 text-xs uppercase">
                    <tr>
                        <th className="px-6 py-3">Số Phiếu</th>
                        <th className="px-6 py-3">Số Xe / Mooc</th>
                        <th className="px-6 py-3">Hàng Hóa</th>
                        <th className="px-6 py-3 text-right">Tổng (Gross)</th>
                        <th className="px-6 py-3 text-right">Bì (Tare)</th>
                        <th className="px-6 py-3 text-right">Hàng (Net)</th>
                        <th className="px-6 py-3 text-center">Giờ Cân</th>
                        <th className="px-6 py-3 text-center">Trạng thái</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                    {records.filter(r => r.vehicle.includes(searchTerm) || r.ticketNo.includes(searchTerm)).map((row) => (
                        <tr key={row.id} className="hover:bg-blue-50/30 transition-colors group">
                            <td className="px-6 py-3 font-mono text-blue-600 font-bold">{row.ticketNo}</td>
                            <td className="px-6 py-3">
                                <div className="font-bold text-gray-800">{row.vehicle}</div>
                                <div className="text-xs text-gray-400">{row.mooc}</div>
                            </td>
                            <td className="px-6 py-3 font-medium text-gray-700">{row.cargo}</td>
                            <td className="px-6 py-3 text-right text-gray-600">{row.gross.toLocaleString()}</td>
                            <td className="px-6 py-3 text-right text-gray-600">{row.tare.toLocaleString()}</td>
                            <td className="px-6 py-3 text-right font-bold text-blue-700">{row.net.toLocaleString()}</td>
                            <td className="px-6 py-3 text-center text-gray-500 text-xs">
                                <div>In: {row.timeIn}</div>
                                {row.timeOut !== '--' && <div>Out: {row.timeOut}</div>}
                            </td>
                            <td className="px-6 py-3 text-center">
                                {row.status === 'Completed' ? (
                                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                                        Hoàn tất
                                    </span>
                                ) : (
                                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
                                        Đang cân
                                    </span>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
  );

  const renderApiTab = () => (
    <div className="space-y-6 animate-fade-in">
        <div className="bg-slate-900 rounded-xl p-6 text-white shadow-md border border-slate-700">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-slate-800 rounded-lg text-blue-400"><Server size={24} /></div>
                    <div>
                        <h3 className="font-bold text-lg">API Integration Monitor</h3>
                        <p className="text-slate-400 text-xs">Giám sát các gói tin từ hệ thống cân điện tử</p>
                    </div>
                </div>
                <div className="text-right">
                    <div className="text-2xl font-mono font-bold text-green-400">99.8%</div>
                    <div className="text-xs text-slate-500">Uptime (24h)</div>
                </div>
            </div>
            <div className="h-px bg-slate-700 my-4"></div>
            <div className="flex gap-6 text-sm">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span className="text-slate-300">Total Req: <b className="text-white">{logs.length}</b></span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    <span className="text-slate-300">Avg Latency: <b className="text-white">45ms</b></span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                    <span className="text-slate-300">Errors: <b className="text-white">{logs.filter(l => l.status >= 400).length}</b></span>
                </div>
            </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                <h3 className="font-bold text-gray-700 uppercase text-sm flex items-center gap-2">
                    <Activity size={16} className="text-blue-600"/> Nhật ký API (Inbound Logs)
                </h3>
                <button 
                    onClick={handleSimulateApiCall}
                    className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700 text-xs font-bold transition-colors shadow-sm"
                >
                    <RefreshCw size={14} /> Mô phỏng API Data
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm font-mono">
                    <thead className="bg-slate-50 text-slate-500 font-bold border-b border-gray-200 text-xs uppercase">
                        <tr>
                            <th className="px-6 py-3 w-48">Timestamp</th>
                            <th className="px-6 py-3 w-24">Method</th>
                            <th className="px-6 py-3">Endpoint</th>
                            <th className="px-6 py-3 w-24 text-center">Status</th>
                            <th className="px-6 py-3 w-24 text-right">Latency</th>
                            <th className="px-6 py-3">Payload (Preview)</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {logs.map((log) => (
                            <tr key={log.id} className="hover:bg-slate-50 transition-colors cursor-pointer group">
                                <td className="px-6 py-3 text-slate-500 text-xs">{log.timestamp}</td>
                                <td className="px-6 py-3 font-bold text-purple-600">{log.method}</td>
                                <td className="px-6 py-3 text-slate-700">{log.endpoint}</td>
                                <td className="px-6 py-3 text-center">
                                    <span className={`px-2 py-0.5 rounded text-xs font-bold border ${
                                        log.status >= 200 && log.status < 300 
                                            ? 'bg-green-50 text-green-700 border-green-200' 
                                            : 'bg-red-50 text-red-700 border-red-200'
                                    }`}>
                                        {log.status}
                                    </span>
                                </td>
                                <td className="px-6 py-3 text-right text-slate-500 text-xs">{log.latency}</td>
                                <td className="px-6 py-3 max-w-xs truncate text-slate-400 text-xs group-hover:text-blue-600 transition-colors">
                                    {log.payload}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  );

  return (
    <div className="flex flex-col h-full bg-[#F5F7FA]">
        {/* Header Toolbar */}
        <div className="bg-white px-6 py-4 border-b border-gray-200 shrink-0 flex justify-between items-center sticky top-0 z-20 shadow-sm">
            <div>
                <h2 className="text-xl font-bold text-[#0F1B3D] flex items-center gap-2">
                    <Scale className="text-blue-600" size={24} /> Trạm Cân Điện Tử (E-Scale Station)
                </h2>
                <p className="text-sm text-gray-500 mt-1 flex items-center gap-2">
                    <Clock size={12}/> Last Sync: {new Date().toLocaleTimeString()}
                </p>
            </div>
            
            <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200">
                <button 
                    onClick={() => setActiveTab('monitor')}
                    className={`px-4 py-2 rounded-md text-sm font-bold flex items-center gap-2 transition-all ${activeTab === 'monitor' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                >
                    <Activity size={16} /> Giám sát
                </button>
                <button 
                    onClick={() => setActiveTab('api')}
                    className={`px-4 py-2 rounded-md text-sm font-bold flex items-center gap-2 transition-all ${activeTab === 'api' ? 'bg-white text-purple-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                >
                    <Code size={16} /> Lịch sử API
                </button>
            </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-auto p-6">
            {activeTab === 'monitor' ? renderMonitorTab() : renderApiTab()}
        </div>
    </div>
  );
};
