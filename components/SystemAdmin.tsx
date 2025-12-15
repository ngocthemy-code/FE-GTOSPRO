import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Shield, 
  UserPlus, 
  Edit, 
  Trash2, 
  Search, 
  CheckCircle, 
  XCircle, 
  Save, 
  Filter,
  Key,
  MoreVertical,
  Lock,
  Eye,
  FileEdit,
  CheckSquare,
  Plus,
  ChevronRight,
  ChevronDown,
  Folder,
  File,
  CornerDownRight
} from 'lucide-react';
import { MENU_ITEMS } from '../constants';
import { MenuItem, SubMenuItem } from '../types';

interface SystemAdminProps {
  viewId: string;
}

// Mock Data based on user request departments
const DEPARTMENTS = [
  { id: 'dept-acc', name: 'Kế toán', code: 'ACC', members: 5, status: 'Active' },
  { id: 'dept-biz', name: 'Thương vụ', code: 'BIZ', members: 8, status: 'Active' },
  { id: 'dept-wh', name: 'Kho hàng', code: 'WH', members: 12, status: 'Active' },
  { id: 'dept-ops', name: 'Khai thác', code: 'OPS', members: 20, status: 'Active' },
  { id: 'dept-tally', name: 'Hiện trường Tally', code: 'TALLY', members: 15, status: 'Active' },
  { id: 'dept-yard', name: 'Hiện trường Bãi', code: 'YARD', members: 10, status: 'Active' },
  { id: 'dept-gate', name: 'Cổng (Gate)', code: 'GATE', members: 6, status: 'Active' },
  { id: 'dept-admin', name: 'Quản trị hệ thống', code: 'ADMIN', members: 2, status: 'Active' },
];

const USERS = [
  { id: 1, name: 'Nguyễn Văn A', username: 'anv', email: 'anv@gtos.vn', group: 'Kế toán', role: 'Trưởng phòng', status: 'Active', lastLogin: '10:30 14/12/2023' },
  { id: 2, name: 'Trần Thị B', username: 'btt', email: 'btt@gtos.vn', group: 'Thương vụ', role: 'Nhân viên', status: 'Active', lastLogin: '08:00 14/12/2023' },
  { id: 3, name: 'Lê Văn C', username: 'clv', email: 'clv@gtos.vn', group: 'Hiện trường Tally', role: 'Tally trưởng', status: 'Inactive', lastLogin: '16:45 12/12/2023' },
  { id: 4, name: 'Phạm Văn D', username: 'dpv', email: 'dpv@gtos.vn', group: 'Cổng (Gate)', role: 'Nhân viên', status: 'Active', lastLogin: '09:15 14/12/2023' },
  { id: 5, name: 'Hoàng Thị E', username: 'eht', email: 'eht@gtos.vn', group: 'Khai thác', role: 'Điều độ', status: 'Active', lastLogin: '07:30 14/12/2023' },
];

export const SystemAdmin: React.FC<SystemAdminProps> = ({ viewId }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGroupForPerm, setSelectedGroupForPerm] = useState(DEPARTMENTS[0].id);

  // Permission State
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set(['category', 'cat-system']));
  
  // Mock permissions data: { menuId: { view: true, create: false... } }
  // In a real app, this would come from an API based on selectedGroupForPerm
  const [permissions, setPermissions] = useState<Record<string, Record<string, boolean>>>({});

  const toggleExpand = (id: string) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedRows(newExpanded);
  };

  const handleCheck = (menuId: string, type: string) => {
    setPermissions(prev => {
      const current = prev[menuId] || {};
      const newValue = !current[type];
      
      // If "All" is clicked
      if (type === 'all') {
         return {
            ...prev,
            [menuId]: {
                view: newValue,
                create: newValue,
                edit: newValue,
                delete: newValue,
                approve: newValue
            }
         };
      }

      // If specific action is clicked
      return {
        ...prev,
        [menuId]: {
            ...current,
            [type]: newValue
        }
      };
    });
  };

  // Helper to get checked state safely
  const isChecked = (menuId: string, type: string) => {
    return permissions[menuId]?.[type] || false;
  };

  // --- Render Functions ---

  const renderGroups = () => (
    <div className="flex flex-col h-full bg-white">
      {/* Toolbar */}
      <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-white">
         <div className="flex items-center gap-4">
            <h2 className="text-lg font-bold text-[#0F1B3D] flex items-center gap-2">
                <Users size={20} className="text-blue-600"/> Nhóm Người Dùng & Phòng Ban
            </h2>
            <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/>
                <input 
                    className="pl-9 pr-4 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-400 w-64" 
                    placeholder="Tìm kiếm nhóm..."
                />
            </div>
         </div>
         <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 shadow-md shadow-blue-200 transition-all text-sm font-medium">
            <Plus size={16} /> Thêm Nhóm Mới
         </button>
      </div>

      {/* Content */}
      <div className="p-6 overflow-auto bg-[#F0F4F8] h-full">
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {DEPARTMENTS.map(dept => (
                <div key={dept.id} className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow group relative">
                    <div className="flex justify-between items-start mb-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm shadow-sm
                            ${dept.code === 'ADMIN' ? 'bg-slate-700 text-white' : 'bg-blue-50 text-blue-600 border border-blue-100'}
                        `}>
                            {dept.code}
                        </div>
                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded"><Edit size={14}/></button>
                            <button className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded"><Trash2 size={14}/></button>
                        </div>
                    </div>
                    <h3 className="text-[#0F1B3D] font-bold text-base mb-1">{dept.name}</h3>
                    <p className="text-slate-500 text-sm mb-4">Nhóm quyền truy cập dành cho bộ phận {dept.name.toLowerCase()}.</p>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="flex -space-x-2">
                            {[...Array(Math.min(4, dept.members))].map((_, i) => (
                                <div key={i} className="w-6 h-6 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs text-gray-500 font-bold">
                                    {String.fromCharCode(65+i)}
                                </div>
                            ))}
                            {dept.members > 4 && (
                                <div className="w-6 h-6 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-xs text-gray-500 font-bold">+{dept.members - 4}</div>
                            )}
                        </div>
                        <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded-full">{dept.members} Users</span>
                    </div>
                </div>
            ))}
         </div>
      </div>
    </div>
  );

  const renderUsers = () => (
    <div className="flex flex-col h-full bg-white">
        {/* Toolbar */}
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
            <div className="flex items-center gap-4">
                <h2 className="text-lg font-bold text-[#0F1B3D] flex items-center gap-2">
                    <UserPlus size={20} className="text-blue-600"/> Quản Lý Người Dùng
                </h2>
                <div className="relative">
                    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/>
                    <input 
                        className="pl-9 pr-4 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-400 w-64" 
                        placeholder="Tìm theo tên, email..."
                    />
                </div>
                <button className="flex items-center gap-2 px-3 py-1.5 border border-gray-200 rounded-lg hover:bg-gray-50 text-sm text-gray-600">
                    <Filter size={14} /> Bộ lọc
                </button>
            </div>
            <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 shadow-md shadow-blue-200 transition-all text-sm font-medium">
                <UserPlus size={16} /> Thêm Người Dùng
            </button>
        </div>

        {/* Table */}
        <div className="flex-1 overflow-auto p-6 bg-[#F0F4F8]">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-[#EFF6FF] border-b border-blue-100 text-xs uppercase text-blue-800 font-bold">
                        <tr>
                            <th className="px-6 py-4">Họ và Tên</th>
                            <th className="px-6 py-4">Tài khoản / Email</th>
                            <th className="px-6 py-4">Phòng ban / Nhóm</th>
                            <th className="px-6 py-4">Vai trò</th>
                            <th className="px-6 py-4">Trạng thái</th>
                            <th className="px-6 py-4">Đăng nhập cuối</th>
                            <th className="px-6 py-4 text-center">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {USERS.map(user => (
                            <tr key={user.id} className="hover:bg-blue-50/50 transition-colors group">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-400 to-indigo-500 flex items-center justify-center text-white font-bold text-xs">
                                            {user.name.split(' ').pop()?.substring(0,2).toUpperCase()}
                                        </div>
                                        <span className="font-medium text-gray-800">{user.name}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex flex-col">
                                        <span className="text-sm font-semibold text-gray-700">{user.username}</span>
                                        <span className="text-xs text-gray-400">{user.email}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
                                        {user.group}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-600">{user.role}</td>
                                <td className="px-6 py-4">
                                    {user.status === 'Active' ? (
                                        <div className="flex items-center gap-1.5 text-green-600 text-sm font-medium">
                                            <CheckCircle size={14} /> Hoạt động
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-1.5 text-gray-400 text-sm font-medium">
                                            <XCircle size={14} /> Đã khóa
                                        </div>
                                    )}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-500">{user.lastLogin}</td>
                                <td className="px-6 py-4 text-center">
                                    <div className="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button title="Chỉnh sửa" className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"><Edit size={16}/></button>
                                        <button title="Đặt lại mật khẩu" className="p-1.5 text-amber-500 hover:bg-amber-50 rounded"><Key size={16}/></button>
                                        <button title="Xóa" className="p-1.5 text-red-500 hover:bg-red-50 rounded"><Trash2 size={16}/></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  );

  const renderPermissions = () => {

    const renderPermissionRow = (item: MenuItem | SubMenuItem, level: number = 0) => {
        const hasChildren = item.submenu && item.submenu.length > 0;
        const isExpanded = expandedRows.has(item.id);
        const paddingLeft = level * 30 + 16;
        
        // Visual styles based on level
        const rowBg = level === 0 ? 'bg-blue-50/50 font-bold text-gray-800 border-b border-blue-100' : 'bg-white hover:bg-blue-50/30 border-b border-gray-100';
        const iconColor = level === 0 ? 'text-blue-600' : 'text-gray-400';
        
        return (
            <React.Fragment key={item.id}>
                <tr className={`transition-colors ${rowBg}`}>
                    <td className="py-3 pr-4" style={{ paddingLeft: `${paddingLeft}px` }}>
                        <div className="flex items-center gap-2">
                            {hasChildren ? (
                                <button 
                                    onClick={() => toggleExpand(item.id)}
                                    className="p-1 rounded hover:bg-blue-100 text-blue-500 transition-colors"
                                >
                                    {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                                </button>
                            ) : (
                                <div className="w-6"></div> // Spacer for alignment
                            )}
                            
                            {/* Icon based on level */}
                            {level === 0 ? (
                                <Folder size={16} className={iconColor} />
                            ) : hasChildren ? (
                                <Folder size={14} className="text-amber-500" />
                            ) : (
                                <CornerDownRight size={14} className="text-gray-300 ml-1" />
                            )}
                            
                            <span className={`text-sm ${level === 0 ? 'uppercase tracking-wide text-blue-900' : 'text-gray-700'}`}>
                                {item.label}
                            </span>
                        </div>
                    </td>
                    
                    {/* Permission Checkboxes */}
                    {['view', 'create', 'edit', 'delete', 'approve'].map((action) => (
                        <td key={action} className="px-4 py-3 text-center border-l border-gray-100/50">
                             {!hasChildren && (
                                <input 
                                    type="checkbox" 
                                    checked={isChecked(item.id, action)}
                                    onChange={() => handleCheck(item.id, action)}
                                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                                />
                             )}
                        </td>
                    ))}

                    <td className="px-4 py-3 text-center border-l border-gray-100/50">
                        {!hasChildren && (
                             <input 
                                type="checkbox" 
                                checked={['view', 'create', 'edit', 'delete', 'approve'].every(a => isChecked(item.id, a))}
                                onChange={() => handleCheck(item.id, 'all')}
                                className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 cursor-pointer"
                            />
                        )}
                    </td>
                </tr>
                
                {/* Recursive render for children */}
                {hasChildren && isExpanded && item.submenu?.map(child => renderPermissionRow(child, level + 1))}
            </React.Fragment>
        );
    };

    return (
    <div className="flex flex-col h-full bg-white">
        {/* Toolbar */}
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-white shadow-sm z-10">
            <h2 className="text-lg font-bold text-[#0F1B3D] flex items-center gap-2">
                <Shield size={20} className="text-blue-600"/> Ma Trận Phân Quyền Chi Tiết
            </h2>
            <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600">Đang chọn nhóm:</span>
                <select 
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-56 p-2"
                    value={selectedGroupForPerm}
                    onChange={(e) => setSelectedGroupForPerm(e.target.value)}
                >
                    {DEPARTMENTS.map(dept => (
                        <option key={dept.id} value={dept.id}>{dept.name}</option>
                    ))}
                </select>
                <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium ml-4">
                    <Save size={16} /> Lưu Thay Đổi
                </button>
            </div>
        </div>

        {/* Matrix Tree Table */}
        <div className="flex-1 overflow-auto p-6 bg-[#F0F4F8]">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden w-full">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-[#EFF6FF] sticky top-0 z-20 shadow-sm border-b border-blue-100">
                        <tr>
                            <th className="px-6 py-4 w-[40%] text-blue-900 font-bold text-sm">Chức năng / Màn hình</th>
                            <th className="px-2 py-4 text-center w-20 text-xs uppercase font-bold text-blue-800">Xem</th>
                            <th className="px-2 py-4 text-center w-20 text-xs uppercase font-bold text-blue-800">Thêm</th>
                            <th className="px-2 py-4 text-center w-20 text-xs uppercase font-bold text-blue-800">Sửa</th>
                            <th className="px-2 py-4 text-center w-20 text-xs uppercase font-bold text-blue-800">Xóa</th>
                            <th className="px-2 py-4 text-center w-20 text-xs uppercase font-bold text-blue-800">Duyệt</th>
                            <th className="px-2 py-4 text-center w-20 text-xs uppercase font-bold text-white bg-blue-600">Tất cả</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {MENU_ITEMS.map(item => renderPermissionRow(item, 0))}
                    </tbody>
                </table>
            </div>
            
            <div className="mt-6 w-full p-4 bg-blue-50 border border-blue-100 rounded-lg text-sm text-blue-800 flex items-start gap-2">
                <CheckSquare size={18} className="mt-0.5 flex-shrink-0" />
                <div>
                    <strong>Lưu ý:</strong> Thay đổi quyền hạn sẽ có hiệu lực ngay lập tức đối với tất cả người dùng thuộc nhóm 
                    <span className="font-bold mx-1">
                        {DEPARTMENTS.find(d => d.id === selectedGroupForPerm)?.name}
                    </span>. 
                    Tích vào cột "Tất cả" để cấp toàn quyền cho chức năng đó.
                </div>
            </div>
        </div>
    </div>
  );
  };

  switch (viewId) {
    case 'admin-groups': return renderGroups();
    case 'admin-users': return renderUsers();
    case 'admin-permissions': return renderPermissions();
    default: return <div className="p-6">View not found</div>;
  }
};