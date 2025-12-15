import React, { useState, useRef, useEffect } from 'react';
import { 
  Save, 
  Plus, 
  Trash2, 
  ZoomIn, 
  ZoomOut, 
  Move, 
  Maximize, 
  Settings,
  Info
} from 'lucide-react';
import { YardBlock } from '../types';

export const YardMapDesigner: React.FC = () => {
  // Mock Data for Initial Layout
  const [blocks, setBlocks] = useState<YardBlock[]>([
    { id: '1', name: 'Bãi Than A1', x: 5, y: 10, width: 20, height: 30, capacity: 5000, currentLoad: 3500, color: '#3b82f6', type: 'Bulk' },
    { id: '2', name: 'Bãi Than A2', x: 28, y: 10, width: 20, height: 30, capacity: 5000, currentLoad: 1200, color: '#3b82f6', type: 'Bulk' },
    { id: '3', name: 'Kho Tổng Hợp', x: 55, y: 10, width: 40, height: 20, capacity: 2000, currentLoad: 1800, color: '#10b981', type: 'General' },
    { id: '4', name: 'Bãi Chứa B1', x: 5, y: 50, width: 25, height: 25, capacity: 3000, currentLoad: 0, color: '#f59e0b', type: 'Bulk' },
  ]);

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const selectedBlock = blocks.find(b => b.id === selectedId);

  // --- Handlers ---

  const handleAddBlock = () => {
    const newBlock: YardBlock = {
      id: Date.now().toString(),
      name: `Bãi Mới ${blocks.length + 1}`,
      x: 40,
      y: 40,
      width: 15,
      height: 20,
      capacity: 1000,
      currentLoad: 0,
      color: '#64748b',
      type: 'Bulk'
    };
    setBlocks([...blocks, newBlock]);
    setSelectedId(newBlock.id);
  };

  const handleDeleteBlock = () => {
    if (selectedId && confirm('Xóa bãi này khỏi sơ đồ?')) {
      setBlocks(blocks.filter(b => b.id !== selectedId));
      setSelectedId(null);
    }
  };

  const updateSelectedBlock = (field: keyof YardBlock, value: any) => {
    if (!selectedId) return;
    setBlocks(blocks.map(b => b.id === selectedId ? { ...b, [field]: value } : b));
  };

  // --- Drag Logic ---
  const handleMouseDown = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setSelectedId(id);
    setIsDragging(true);
    
    // Calculate offset within the block
    const block = blocks.find(b => b.id === id);
    if (block && containerRef.current) {
        // We are using percentages for positions, but mouse is in pixels.
        // We need to convert mouse movement to percentage relative to container size.
        // For simplicity in start, just tracking that we are dragging.
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !selectedId || !containerRef.current) return;
    
    const containerRect = containerRef.current.getBoundingClientRect();
    const xPercent = ((e.clientX - containerRect.left) / containerRect.width) * 100;
    const yPercent = ((e.clientY - containerRect.top) / containerRect.height) * 100;

    // Constrain to 0-100
    const clampedX = Math.max(0, Math.min(90, xPercent)); 
    const clampedY = Math.max(0, Math.min(90, yPercent));

    // Center the block on cursor roughly (simplification)
    // To do it perfectly we need original offset, but this is a quick editor
    setBlocks(blocks.map(b => {
        if (b.id === selectedId) {
            // Snap to grid (optional, say 1% steps)
            return { ...b, x: Math.round(clampedX), y: Math.round(clampedY) };
        }
        return b;
    }));
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // --- Visualization Helpers ---
  const getUsageColor = (current: number, max: number) => {
    const ratio = current / max;
    if (ratio > 0.9) return 'bg-red-500'; // Critical
    if (ratio > 0.75) return 'bg-orange-400'; // High
    if (ratio > 0.5) return 'bg-blue-500'; // Moderate
    return 'bg-green-500'; // Low
  };

  return (
    <div className="flex h-full bg-slate-100 overflow-hidden" onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}>
      
      {/* LEFT: Map Canvas Area */}
      <div className="flex-1 flex flex-col relative">
        {/* Toolbar */}
        <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shadow-sm z-10">
          <div className="flex items-center gap-4">
             <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                <Settings className="text-blue-600" />
                Thiết Kế Sơ Đồ Bãi (Yard Layout)
             </h2>
             <div className="h-6 w-px bg-gray-300 mx-2"></div>
             <div className="flex bg-slate-100 rounded-lg p-1">
                <button onClick={() => setZoomLevel(Math.max(0.5, zoomLevel - 0.1))} className="p-1.5 hover:bg-white rounded shadow-sm text-slate-600"><ZoomOut size={18} /></button>
                <span className="px-3 py-1.5 text-xs font-bold text-slate-600 flex items-center">{Math.round(zoomLevel * 100)}%</span>
                <button onClick={() => setZoomLevel(Math.min(2, zoomLevel + 0.1))} className="p-1.5 hover:bg-white rounded shadow-sm text-slate-600"><ZoomIn size={18} /></button>
             </div>
          </div>
          <div className="flex items-center gap-3">
             <button onClick={handleAddBlock} className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 border border-blue-200 rounded-lg hover:bg-blue-100 font-medium transition-colors">
                <Plus size={18} /> Thêm Bãi
             </button>
             <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium shadow-md">
                <Save size={18} /> Lưu Sơ Đồ
             </button>
          </div>
        </div>

        {/* Canvas */}
        <div className="flex-1 overflow-auto p-8 bg-slate-200 relative">
          <div 
            ref={containerRef}
            className="bg-white shadow-2xl relative transition-transform origin-top-left mx-auto border-2 border-dashed border-slate-300"
            style={{ 
              width: '1200px', 
              height: '800px', 
              transform: `scale(${zoomLevel})`,
              backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)',
              backgroundSize: '20px 20px'
            }}
            onClick={() => setSelectedId(null)}
          >
            {/* Grid Lines Helper */}
            <div className="absolute inset-0 pointer-events-none opacity-10">
                {Array.from({ length: 12 }).map((_, i) => (
                    <div key={`v-${i}`} className="absolute top-0 bottom-0 border-l border-slate-900" style={{ left: `${i * 8.33}%` }}></div>
                ))}
                {Array.from({ length: 8 }).map((_, i) => (
                    <div key={`h-${i}`} className="absolute left-0 right-0 border-t border-slate-900" style={{ top: `${i * 12.5}%` }}></div>
                ))}
            </div>

            {/* Blocks */}
            {blocks.map((block) => {
              const usagePercent = (block.currentLoad / block.capacity) * 100;
              const isSelected = selectedId === block.id;

              return (
                <div
                  key={block.id}
                  onMouseDown={(e) => handleMouseDown(e, block.id)}
                  className={`absolute group rounded-lg shadow-sm border transition-shadow cursor-move overflow-hidden
                    ${isSelected ? 'ring-2 ring-blue-500 ring-offset-2 z-20 shadow-xl' : 'border-slate-300 hover:shadow-md z-10'}
                  `}
                  style={{
                    left: `${block.x}%`,
                    top: `${block.y}%`,
                    width: `${block.width}%`,
                    height: `${block.height}%`,
                    backgroundColor: 'rgba(255,255,255,0.95)'
                  }}
                >
                  {/* Header Color Strip */}
                  <div className="h-1.5 w-full" style={{ backgroundColor: block.color }}></div>
                  
                  {/* Content */}
                  <div className="p-3 flex flex-col h-full">
                    <div className="flex justify-between items-start mb-2">
                        <span className="font-bold text-slate-700 text-sm truncate" title={block.name}>{block.name}</span>
                        {isSelected && <Move size={12} className="text-slate-400" />}
                    </div>
                    
                    {/* Capacity Visual */}
                    <div className="mt-auto">
                        <div className="flex justify-between text-[10px] text-slate-500 mb-1 font-medium">
                            <span>{block.currentLoad.toLocaleString()} T</span>
                            <span>{block.capacity.toLocaleString()} T</span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden border border-slate-200">
                            <div 
                                className={`h-full rounded-full transition-all duration-500 ${getUsageColor(block.currentLoad, block.capacity)}`}
                                style={{ width: `${Math.min(100, usagePercent)}%` }}
                            ></div>
                        </div>
                        <div className="text-right text-[9px] text-slate-400 mt-0.5">{Math.round(usagePercent)}% Load</div>
                    </div>
                  </div>

                  {/* Handles for resizing (Visual only for now) */}
                  {isSelected && (
                    <>
                        <div className="absolute top-0 left-0 w-2 h-2 bg-blue-500 cursor-nw-resize"></div>
                        <div className="absolute top-0 right-0 w-2 h-2 bg-blue-500 cursor-ne-resize"></div>
                        <div className="absolute bottom-0 left-0 w-2 h-2 bg-blue-500 cursor-sw-resize"></div>
                        <div className="absolute bottom-0 right-0 w-2 h-2 bg-blue-500 cursor-se-resize"></div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* RIGHT: Properties Panel */}
      <div className="w-80 bg-white border-l border-gray-200 shadow-lg flex flex-col z-20">
        <div className="p-5 border-b border-gray-100">
            <h3 className="font-bold text-slate-800 text-lg">Thuộc Tính (Properties)</h3>
            <p className="text-xs text-slate-500">Chỉnh sửa thông số bãi</p>
        </div>

        <div className="flex-1 overflow-y-auto p-5">
            {selectedBlock ? (
                <div className="space-y-6 animate-fade-in">
                    {/* Basic Info */}
                    <div className="space-y-3">
                        <label className="block text-sm font-medium text-slate-700">Tên Bãi / Kho</label>
                        <input 
                            type="text" 
                            value={selectedBlock.name}
                            onChange={(e) => updateSelectedBlock('name', e.target.value)}
                            className="w-full p-2.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>

                    <div className="space-y-3">
                        <label className="block text-sm font-medium text-slate-700">Loại Bãi</label>
                        <select 
                            value={selectedBlock.type}
                            onChange={(e) => updateSelectedBlock('type', e.target.value)}
                            className="w-full p-2.5 border border-slate-300 rounded-lg text-sm bg-white"
                        >
                            <option value="Bulk">Hàng Rời (Than, Quặng)</option>
                            <option value="General">Hàng Tổng Hợp</option>
                            <option value="Liquid">Hàng Lỏng</option>
                        </select>
                    </div>

                    {/* Capacity */}
                    <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-4">
                        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Sức Chứa & Tải Trọng</h4>
                        <div>
                            <label className="block text-xs font-medium text-slate-700 mb-1">Sức Chứa Tối Đa (Tấn)</label>
                            <input 
                                type="number" 
                                value={selectedBlock.capacity}
                                onChange={(e) => updateSelectedBlock('capacity', Number(e.target.value))}
                                className="w-full p-2 border border-slate-300 rounded text-sm text-right font-mono"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-slate-700 mb-1">Đang Lưu Kho (Tấn)</label>
                            <input 
                                type="number" 
                                value={selectedBlock.currentLoad}
                                onChange={(e) => updateSelectedBlock('currentLoad', Number(e.target.value))}
                                className="w-full p-2 border border-slate-300 rounded text-sm text-right font-mono text-blue-600 font-bold"
                            />
                        </div>
                        <div className="pt-2 border-t border-slate-200 flex justify-between items-center text-xs">
                            <span className="text-slate-500">Tỷ lệ lấp đầy:</span>
                            <span className={`font-bold ${getUsageColor(selectedBlock.currentLoad, selectedBlock.capacity).replace('bg-', 'text-')}`}>
                                {Math.round((selectedBlock.currentLoad / selectedBlock.capacity) * 100)}%
                            </span>
                        </div>
                    </div>

                    {/* Appearance */}
                    <div className="space-y-3">
                        <label className="block text-sm font-medium text-slate-700">Màu Định Danh</label>
                        <div className="flex gap-2">
                            {['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#64748b', '#8b5cf6'].map(color => (
                                <button
                                    key={color}
                                    onClick={() => updateSelectedBlock('color', color)}
                                    className={`w-8 h-8 rounded-full border-2 ${selectedBlock.color === color ? 'border-slate-800 scale-110' : 'border-transparent'}`}
                                    style={{ backgroundColor: color }}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Dimensions & Position (Sliders for quick edit) */}
                    <div className="space-y-4 pt-4 border-t border-slate-100">
                        <h4 className="text-xs font-bold text-slate-500 uppercase">Kích Thước & Vị Trí (%)</h4>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-[10px] text-slate-500">Chiều Ngang (W)</label>
                                <input type="number" value={selectedBlock.width} onChange={e => updateSelectedBlock('width', Number(e.target.value))} className="w-full p-1 border rounded text-xs"/>
                            </div>
                            <div>
                                <label className="text-[10px] text-slate-500">Chiều Dọc (H)</label>
                                <input type="number" value={selectedBlock.height} onChange={e => updateSelectedBlock('height', Number(e.target.value))} className="w-full p-1 border rounded text-xs"/>
                            </div>
                            <div>
                                <label className="text-[10px] text-slate-500">Vị Trí X</label>
                                <input type="number" value={selectedBlock.x} onChange={e => updateSelectedBlock('x', Number(e.target.value))} className="w-full p-1 border rounded text-xs"/>
                            </div>
                            <div>
                                <label className="text-[10px] text-slate-500">Vị Trí Y</label>
                                <input type="number" value={selectedBlock.y} onChange={e => updateSelectedBlock('y', Number(e.target.value))} className="w-full p-1 border rounded text-xs"/>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="h-full flex flex-col items-center justify-center text-slate-400 text-center">
                    <Maximize size={48} className="mb-4 opacity-20" />
                    <p className="text-sm">Chọn một bãi trên bản đồ<br/>để xem và chỉnh sửa thông tin.</p>
                </div>
            )}
        </div>
        
        {selectedBlock && (
            <div className="p-5 border-t border-gray-200 bg-gray-50">
                <button 
                    onClick={handleDeleteBlock}
                    className="w-full py-2.5 bg-white border border-red-200 text-red-600 rounded-lg hover:bg-red-50 flex items-center justify-center gap-2 text-sm font-medium transition-colors"
                >
                    <Trash2 size={16} /> Xóa Bãi Này
                </button>
            </div>
        )}
      </div>
    </div>
  );
};