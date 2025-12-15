import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Trash2, 
  Save, 
  Search, 
  Filter, 
  Download,
  X,
  Check,
  ChevronUp,
  ChevronDown,
  XCircle,
  MoreVertical,
  RefreshCw,
  Edit2
} from 'lucide-react';
import { CategoryConfig, ColumnDefinition } from '../types';

interface CategoryManagerProps {
  config: CategoryConfig;
}

export const CategoryManager: React.FC<CategoryManagerProps> = ({ config }) => {
  const [data, setData] = useState<any[]>(config.initialData);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [newRow, setNewRow] = useState<any>({});
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [sortConfig, setSortConfig] = useState<{ key: string, direction: 'asc' | 'desc' } | null>(null);

  // Reset state when configuration changes
  useEffect(() => {
    setData(config.initialData);
    setSearchTerm('');
    setIsAdding(false);
    setNewRow({});
    setSelectedIds(new Set());
    setSortConfig(null);
  }, [config]);

  // Search logic
  const filteredData = data.filter(item => 
    Object.values(item).some(val => 
      String(val).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Sorting logic
  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortConfig) return 0;
    const { key, direction } = sortConfig;
    if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
    if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
    return 0;
  });

  const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Selection Logic
  const handleSelectAll = () => {
    const ids = new Set(filteredData.map(d => d.id));
    setSelectedIds(ids);
  };

  const handleDeselectAll = () => {
    setSelectedIds(new Set());
  };

  const toggleSelection = (id: number) => {
    const newSelected = new Set(selectedIds);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedIds(newSelected);
  };

  // CRUD Operations
  const handleNewRowChange = (key: string, value: any) => {
    setNewRow((prev: any) => ({ ...prev, [key]: value }));
  };

  const handleSaveNew = () => {
    const newId = Math.max(...data.map(d => d.id), 0) + 1;
    const itemToAdd = { id: newId, ...newRow };
    
    // Default checks
    config.columns.forEach(col => {
      if (col.type === 'checkbox' && itemToAdd[col.key] === undefined) {
        itemToAdd[col.key] = false;
      }
    });
    if (config.columns.some(c => c.key === 'status') && !itemToAdd.status) {
        itemToAdd.status = 'Active';
    }

    setData([itemToAdd, ...data]);
    setIsAdding(false);
    setNewRow({});
  };

  const handleDeleteSelected = () => {
    if (selectedIds.size === 0) {
      alert("Vui lòng chọn dòng cần xóa!");
      return;
    }
    if (confirm(`Bạn có chắc chắn muốn xóa ${selectedIds.size} dòng dữ liệu?`)) {
      setData(data.filter(item => !selectedIds.has(item.id)));
      setSelectedIds(new Set());
    }
  };

  // Alignment Helper
  const getCellAlignment = (type: string) => {
    if (type === 'checkbox' || type === 'number') return 'text-center';
    return 'text-left';
  };

  // Input Render Helper
  const renderInput = (col: ColumnDefinition) => {
    if (col.type === 'select') {
      return (
        <select
          className="w-full p-2 border border-blue-200 rounded-lg focus:outline-none focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6] text-sm bg-white"
          onChange={(e) => handleNewRowChange(col.key, e.target.value)}
          value={newRow[col.key] || ''}
        >
          <option value="">--</option>
          {col.options?.map(opt => <option key={opt} value={opt}>{opt}</option>)}
        </select>
      );
    }
    
    if (col.type === 'checkbox') {
      return (
        <div className="flex justify-center">
          <input 
            type="checkbox"
            className="w-4 h-4 text-[#3B82F6] rounded border-gray-300 focus:ring-[#3B82F6] cursor-pointer"
            onChange={(e) => handleNewRowChange(col.key, e.target.checked)}
            checked={!!newRow[col.key]}
          />
        </div>
      );
    }

    return (
      <input 
        type={col.type === 'number' ? 'number' : 'text'}
        className="w-full p-2 border border-blue-200 rounded-lg focus:outline-none focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6] text-sm"
        onChange={(e) => handleNewRowChange(col.key, e.target.value)}
        value={newRow[col.key] || ''}
        placeholder={`Nhập ${col.label.toLowerCase()}...`}
      />
    );
  };

  const renderCellContent = (item: any, col: ColumnDefinition) => {
    if (col.type === 'status') {
      const isMap = {
          'Active': 'bg-emerald-50 text-emerald-700 border border-emerald-100',
          'Có': 'bg-red-50 text-red-700 border border-red-100',
          'Inactive': 'bg-slate-100 text-slate-500 border border-slate-200',
          'Không': 'bg-blue-50 text-blue-700 border border-blue-100'
      };
      const val = item[col.key];
      const style = isMap[val as keyof typeof isMap] || 'bg-blue-50 text-blue-700';
      
      return (
          <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${style}`}>
              {val}
          </span>
      );
    }
    
    if (col.type === 'checkbox') {
       return (
         <div className="flex justify-center h-full items-center">
            {item[col.key] ? (
                <CheckCircleIcon active />
            ) : (
                <div className="w-4 h-4 rounded-full border border-slate-300"></div>
            )}
         </div>
       );
    }

    return <span className="text-[#1A1A1A] font-medium">{item[col.key]}</span>;
  };

  // Custom Checkbox Component
  const CheckCircleIcon = ({ active }: { active?: boolean }) => (
    <div className={`w-4 h-4 rounded-full flex items-center justify-center border transition-all duration-200
        ${active ? 'bg-[#3B82F6] border-[#3B82F6]' : 'bg-white border-slate-300 group-hover:border-[#3B82F6]'}
    `}>
        {active && <Check size={10} className="text-white" strokeWidth={3} />}
    </div>
  );

  const isCustomerScreen = config.id === 'ops-cust';

  return (
    <div className="p-6 h-full flex flex-col bg-[#F5F7FA]">
      
      {/* HEADER SECTION (Title + Main Actions) */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <div>
            <h2 className="text-2xl font-bold text-[#0F1B3D] tracking-tight">{config.title}</h2>
            <p className="text-slate-500 text-sm mt-1">Quản lý danh mục và dữ liệu hệ thống</p>
        </div>
        <div className="flex items-center gap-3">
             <button 
                onClick={handleDeleteSelected}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-[#E35253] text-[#E35253] rounded-lg hover:bg-red-50 shadow-sm transition-all text-sm font-semibold"
             >
                <Trash2 size={16} />
                <span>Xóa dòng</span>
             </button>
             
             <button 
                onClick={() => alert("Dữ liệu đã được lưu!")}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-[#3B82F6] text-[#3B82F6] rounded-lg hover:bg-[#EFF6FF] shadow-sm transition-all text-sm font-semibold"
             >
                <Save size={16} />
                <span>Lưu thay đổi</span>
             </button>

             <button 
                onClick={() => setIsAdding(true)}
                className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-[#3B82F6] to-[#60A5FA] text-white rounded-lg shadow-md hover:shadow-lg hover:translate-y-[-1px] transition-all text-sm font-semibold"
             >
                <Plus size={18} strokeWidth={2.5} />
                <span>Thêm mới</span>
             </button>
        </div>
      </div>

      {/* SPECIAL FORM (Customer Screen Only) */}
      {isCustomerScreen && (
        <div className="mb-6 bg-white rounded-2xl p-6 shadow-[0_2px_6px_rgba(0,0,0,0.05)] border border-slate-100">
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-4">
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold text-[#0F1B3D] uppercase tracking-wider">Loại khách hàng</label>
                        <select className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:border-[#3B82F6] outline-none transition-colors text-slate-700">
                            <option>-- Chọn loại --</option>
                            <option>Đại lý</option>
                            <option>Chủ hàng</option>
                        </select>
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold text-[#0F1B3D] uppercase tracking-wider">Mã Khách Hàng</label>
                        <input className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:border-[#3B82F6] outline-none transition-colors" placeholder="Nhập mã..." />
                    </div>
                </div>
                <div className="space-y-4">
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold text-[#0F1B3D] uppercase tracking-wider">Tên Khách Hàng</label>
                        <input className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:border-[#3B82F6] outline-none transition-colors" placeholder="Nhập tên..." />
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold text-[#0F1B3D] uppercase tracking-wider">Mã Số Thuế</label>
                        <input className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:border-[#3B82F6] outline-none transition-colors" placeholder="Nhập MST..." />
                    </div>
                </div>
                <div className="space-y-4">
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold text-[#0F1B3D] uppercase tracking-wider">Loại Thanh Toán</label>
                        <select className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:border-[#3B82F6] outline-none transition-colors text-slate-700">
                            <option>Thu Ngay</option>
                            <option>Thu Sau</option>
                        </select>
                    </div>
                    <div className="flex items-end h-full pb-1">
                        <button className="w-full py-2.5 bg-white border border-[#3B82F6] text-[#3B82F6] rounded-lg font-semibold text-sm hover:bg-[#EFF6FF] transition-colors flex items-center justify-center gap-2">
                            <Search size={16} /> Tìm kiếm nâng cao
                        </button>
                    </div>
                </div>
             </div>
        </div>
      )}

      {/* MAIN TABLE CARD */}
      <div className="flex-1 bg-white rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.06)] border border-slate-100 flex flex-col overflow-hidden">
        
        {/* Table Toolbar (Search & Selection Info) */}
        <div className="px-5 py-3 border-b border-slate-100 flex items-center justify-between bg-white">
            <div className="relative w-72">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                    type="text" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Tìm kiếm dữ liệu..." 
                    className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-[#3B82F6] focus:bg-white transition-all"
                />
            </div>
            
            <div className="flex items-center gap-4">
                 {selectedIds.size > 0 && (
                     <div className="flex items-center gap-2 px-3 py-1 bg-[#EFF6FF] rounded-full text-[#3B82F6] text-xs font-bold animate-fade-in">
                        <span>Đã chọn {selectedIds.size} dòng</span>
                        <button onClick={handleDeselectAll}><XCircle size={14} className="hover:text-blue-700"/></button>
                     </div>
                 )}
                 <div className="text-slate-400 text-sm">
                    Tổng: <span className="text-slate-700 font-semibold">{filteredData.length}</span>
                 </div>
                 <div className="h-4 w-px bg-slate-200"></div>
                 <button className="p-1.5 text-slate-400 hover:text-[#3B82F6] rounded-md hover:bg-slate-50 transition-colors">
                    <Filter size={18} />
                 </button>
                 <button className="p-1.5 text-slate-400 hover:text-[#3B82F6] rounded-md hover:bg-slate-50 transition-colors">
                    <Download size={18} />
                 </button>
            </div>
        </div>

        {/* The Table */}
        <div className="flex-1 overflow-auto">
            <table className="w-full text-left border-collapse">
                <thead className="bg-[#F0F6FF] sticky top-0 z-10 shadow-sm">
                    <tr>
                        <th className="w-14 px-4 py-3 text-center border-b border-[#E2E8F0]">
                            <div className="flex justify-center">
                                <button 
                                    onClick={selectedIds.size === filteredData.length ? handleDeselectAll : handleSelectAll}
                                    className="group"
                                >
                                    <CheckCircleIcon active={filteredData.length > 0 && selectedIds.size === filteredData.length} />
                                </button>
                            </div>
                        </th>
                        <th className="w-14 px-4 py-3 text-center border-b border-[#E2E8F0] text-sm font-bold text-[#0F1B3D] tracking-wide">STT</th>
                        {config.columns.map((col) => (
                            <th 
                                key={col.key} 
                                className={`px-4 py-3 border-b border-[#E2E8F0] text-sm font-bold text-[#0F1B3D] uppercase tracking-wide cursor-pointer hover:bg-[#E1EDFF] transition-colors group select-none ${getCellAlignment(col.type)}`}
                                onClick={() => handleSort(col.key)}
                            >
                                <div className={`flex items-center gap-1.5 ${getCellAlignment(col.type) === 'text-center' ? 'justify-center' : ''}`}>
                                    {col.label}
                                    <div className="flex flex-col opacity-30 group-hover:opacity-100 transition-opacity">
                                        <ChevronUp size={8} className={sortConfig?.key === col.key && sortConfig.direction === 'asc' ? 'text-[#3B82F6]' : ''} />
                                        <ChevronDown size={8} className={sortConfig?.key === col.key && sortConfig.direction === 'desc' ? 'text-[#3B82F6]' : ''} />
                                    </div>
                                </div>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-[#F1F5F9]">
                    {/* Add Row Input */}
                    {isAdding && (
                        <tr className="bg-[#F0F7FF] animate-fade-in">
                            <td className="px-4 py-3 text-center"></td>
                            <td className="px-4 py-3 text-center text-[#3B82F6] font-bold">+</td>
                            {config.columns.map((col) => (
                                <td key={col.key} className="px-4 py-3">
                                    {renderInput(col)}
                                </td>
                            ))}
                        </tr>
                    )}
                    {isAdding && (
                        <tr className="bg-[#F0F7FF] border-b border-blue-100">
                             <td colSpan={config.columns.length + 2} className="px-4 py-2">
                                <div className="flex justify-end gap-3">
                                    <button onClick={() => setIsAdding(false)} className="px-3 py-1.5 text-xs font-semibold text-slate-500 hover:text-slate-700">Hủy bỏ</button>
                                    <button onClick={handleSaveNew} className="px-4 py-1.5 bg-[#3B82F6] text-white text-xs font-bold rounded shadow-sm hover:bg-blue-600">Lưu dòng mới</button>
                                </div>
                             </td>
                        </tr>
                    )}

                    {/* Data Rows */}
                    {sortedData.map((item, index) => {
                        const isSelected = selectedIds.has(item.id);
                        return (
                            <tr 
                                key={item.id} 
                                onClick={() => toggleSelection(item.id)}
                                className={`group h-[48px] transition-colors cursor-pointer relative
                                    ${isSelected ? 'bg-[#EAF3FF]' : 'bg-white hover:bg-[#F8FAFC]'}
                                `}
                            >
                                {/* Selection Indicator Border */}
                                {isSelected && <td className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#3B82F6]"></td>}

                                <td className="px-4 py-3 text-center" onClick={(e) => e.stopPropagation()}>
                                    <button onClick={() => toggleSelection(item.id)} className="flex justify-center">
                                        <CheckCircleIcon active={isSelected} />
                                    </button>
                                </td>
                                <td className="px-4 py-3 text-center text-slate-500 font-medium text-sm">{index + 1}</td>
                                
                                {config.columns.map((col) => (
                                    <td key={col.key} className={`px-4 py-3 text-sm text-slate-700 ${getCellAlignment(col.type)}`}>
                                        <div className="flex items-center gap-2 relative">
                                            {renderCellContent(item, col)}
                                            {/* Hover Edit Icon hint */}
                                            {col.type === 'text' && (
                                                <Edit2 size={12} className="text-slate-300 opacity-0 group-hover:opacity-100 hover:text-[#3B82F6] cursor-pointer ml-auto transition-opacity" />
                                            )}
                                        </div>
                                    </td>
                                ))}
                            </tr>
                        );
                    })}

                    {/* Empty State */}
                    {sortedData.length === 0 && !isAdding && (
                        <tr>
                            <td colSpan={config.columns.length + 2} className="py-12 text-center">
                                <div className="flex flex-col items-center justify-center text-slate-400">
                                    <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-3">
                                        <Search size={24} className="text-slate-300"/>
                                    </div>
                                    <p className="text-sm font-medium">Không tìm thấy dữ liệu phù hợp</p>
                                </div>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
      </div>
    </div>
  );
};