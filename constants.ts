

import { 
  LayoutDashboard, 
  Settings, 
  List, 
  Calendar, 
  Workflow, 
  FileBarChart, 
  MoreHorizontal,
  Users,
  User,
  ShieldCheck,
  Cog,
  Anchor,
  Package,
  BadgeDollarSign,
  Globe,
  Compass,
  CalendarClock,
  Warehouse,
  Map,
  LifeBuoy,
  BoxSelect,
  Share2,
  Settings2,
  ClipboardList,
  ArrowLeftRight,
  ArrowRightLeft,
  RefreshCw,
  Wrench,
  Tag,
  ScanLine,
  Users2,
  UserCog,
  UserCircle,
  Contact,
  Truck,
  Network,
  CreditCard,
  Percent,
  FileInput,
  FileOutput,
  FileText,
  Edit,
  Printer,
  Ban,
  History,
  PenTool,
  Car,
  Barcode,
  FileSpreadsheet,
  DoorOpen,
  Database,
  TrendingUp,
  Grid,
  ClipboardCheck,
  Clipboard,
  Ship,
  Monitor,
  MapPin,
  Upload,
  Scale
} from 'lucide-react';
import { MenuItem, ShipmentData, CategoryConfig } from './types';

export const MENU_ITEMS: MenuItem[] = [
  { 
    id: 'dashboard', 
    label: 'DASHBOARDS', 
    icon: LayoutDashboard 
  },
  { 
    id: 'admin', 
    label: 'QUẢN TRỊ HỆ THỐNG', 
    icon: Settings, 
    submenu: [
      { id: 'admin-groups', label: 'Nhóm người dùng', icon: Users },
      { id: 'admin-users', label: 'Người dùng', icon: User },
      { id: 'admin-permissions', label: 'Phân quyền', icon: ShieldCheck },
    ]
  },
  { 
    id: 'category', 
    label: 'DANH MỤC', 
    icon: List, 
    submenu: [
      { 
        id: 'cat-system', 
        label: 'Hệ thống', 
        icon: Cog,
        submenu: [
          { id: 'sys-port', label: 'Cảng', icon: Anchor },
          { id: 'sys-rate', label: 'Tỷ giá', icon: BadgeDollarSign },
          { id: 'sys-country', label: 'Quốc gia', icon: Globe },
        ]
      },
      { 
        id: 'cat-port', 
        label: 'Dữ liệu cảng', 
        icon: Anchor,
        submenu: [
          { id: 'port-shift', label: 'Ca làm việc', icon: CalendarClock },
          { id: 'port-yard', label: 'Bãi', icon: Warehouse },
          { id: 'port-map', label: 'Định nghĩa sơ đồ bãi', icon: Map },
          { id: 'port-service', label: 'Dịch vụ', icon: LifeBuoy },
          { id: 'port-unit', label: 'Đơn vị tính', icon: BoxSelect },
          { id: 'port-plan', label: 'Phương án', icon: Share2 },
          { id: 'port-stevedore', label: 'Phương án xếp dỡ', icon: Settings2 },
          { id: 'port-jobtype', label: 'Loại công việc', icon: ClipboardList },
          { id: 'port-direction', label: 'Hướng nhập xuất', icon: ArrowLeftRight },
          { id: 'port-transport', label: 'Loại hình vận chuyển', icon: RefreshCw },
          { id: 'port-spec', label: 'Quy cách', icon: Wrench },
          { id: 'port-condition', label: 'Tình trạng hàng hóa', icon: Tag },
        ]
      },
      { 
        id: 'cat-ops', 
        label: 'Dữ liệu khai thác', 
        icon: Package,
        submenu: [
          { id: 'ops-cargotype', label: 'Loại hàng hóa', icon: ScanLine },
          { id: 'ops-cargo', label: 'Hàng hóa', icon: Package },
          { id: 'ops-teamtype', label: 'Loại tổ đội công nhân', icon: Users2 },
          { id: 'ops-team', label: 'Tổ đội công nhân', icon: UserCog },
          { id: 'ops-custtype', label: 'Loại khách hàng', icon: UserCircle },
          { id: 'ops-cust', label: 'Khách hàng', icon: Contact },
          { id: 'ops-eqptype', label: 'Loại thiết bị', icon: Settings },
          { id: 'ops-eqp', label: 'Thiết bị', icon: Truck },
          { id: 'ops-carrier', label: 'Hãng khai thác', icon: Network },
          { id: 'ops-id', label: 'ID', icon: CreditCard },
          { id: 'ops-loadpercent', label: 'Phần trăm tải trọng', icon: Percent },
        ]
      },
    ]
  },
  { 
    id: 'plan', 
    label: 'KẾ HOẠCH KHAI THÁC', 
    icon: Calendar,
    submenu: [
      { id: 'plan-yard', label: 'Kế hoạch bãi', icon: Warehouse },
      { id: 'plan-vessel-def', label: 'Định nghĩa tàu', icon: Ship },
      { id: 'plan-berth-ops', label: 'Quản lý kế hoạch cầu bến', icon: Anchor },
      { id: 'plan-eqp-unified', label: 'Kế hoạch Cơ giới & Nhân sự', icon: Truck }, // Unified Item
      { id: 'plan-port-auth', label: 'Cập nhật thông tin cảng vụ', icon: Database },
      { id: 'plan-voyage', label: 'Hành trình tàu', icon: MapPin },
    ]
  },
  { 
    id: 'process', 
    label: 'QUY TRÌNH KHAI THÁC', 
    icon: Workflow,
    submenu: [
      { id: 'proc-import', label: 'Nhập', icon: FileInput },
      { id: 'proc-yard', label: 'Bãi/Kho hàng', icon: Warehouse },
      { id: 'proc-export', label: 'Xuất', icon: FileOutput },
      { id: 'proc-weighing', label: 'Trạm Cân Điện Tử', icon: Scale },
    ]
  },
  { 
    id: 'report', 
    label: 'BÁO CÁO', 
    icon: FileBarChart,
    submenu: [
      { id: 'rpt-invoice-issue', label: 'Phát hành hóa đơn', icon: FileText },
      { id: 'rpt-invoice-adjust', label: 'Điều chỉnh/Thay thế hóa đơn', icon: Edit },
      { id: 'rpt-reprint', label: 'In lại chứng từ', icon: Printer },
      { id: 'rpt-invoice-cancel', label: 'Hủy hóa đơn', icon: Ban },
      { id: 'rpt-history', label: 'Lịch sử thay đổi dữ liệu', icon: History },
      { id: 'rpt-manual-invoice', label: 'Tạo hoá đơn tay', icon: PenTool },
      { id: 'rpt-delivery-note', label: 'In phiếu giao nhận', icon: Printer },
      { id: 'rpt-internal-truck', label: 'Điều hành Xe Nội Bộ', icon: Car },
      { id: 'rpt-barcode', label: 'Danh sách Barcode', icon: Barcode },
      { id: 'rpt-vessel-settle', label: 'Biên bản kết toán tàu', icon: FileSpreadsheet },
      { id: 'rpt-gate', label: 'Ra vào cổng', icon: DoorOpen },
      { id: 'rpt-vessel-io', label: 'Nhập xuất tàu', icon: ArrowLeftRight },
      { id: 'rpt-inventory', label: 'Tồn kho bãi', icon: Database },
      { id: 'rpt-berth', label: 'Khai thác cầu bến', icon: Anchor },
      { id: 'rpt-rev-invoice', label: 'Doanh thu hóa đơn', icon: TrendingUp },
      { id: 'rpt-rev-cust', label: 'Doanh thu theo khách hàng', icon: Users },
      { id: 'rpt-hatch', label: 'Sản lượng theo hầm', icon: Grid },
      { id: 'rpt-tally-vessel', label: 'Kiểm nhận hàng với tàu', icon: ClipboardCheck },
      { id: 'rpt-cargo-list', label: 'Danh sách hàng hóa nhập tàu', icon: ClipboardList },
      { id: 'rpt-eqp-vol', label: 'Sản lượng phương tiện thiết bị', icon: Truck },
      { id: 'rpt-tally-wh', label: 'Kiểm đếm hàng trong kho', icon: Warehouse },
      { id: 'rpt-cargo-io', label: 'Hàng hóa nhập xuất', icon: ArrowRightLeft },
      { id: 'rpt-export-list', label: 'Bảng kê xuất hàng', icon: FileText },
      { id: 'rpt-shift-handover', label: 'Báo cáo giao ca', icon: Clipboard },
      { id: 'rpt-change-gate', label: 'Thay đổi công việc cổng', icon: Edit },
      { id: 'rpt-change-vessel', label: 'Thay đổi công việc tàu', icon: Edit },
    ]
  },
  { id: 'others', label: 'KHÁC', icon: MoreHorizontal },
];

export const MOCK_SHIPMENTS: ShipmentData[] = [
  {
    id: '1',
    pincode: 'PC-100234',
    billOfLading: 'BL-HK-8821',
    booking: 'BK-99210',
    vesselName: 'GLOBAL PIONEER',
    status: 'In Yard',
    commodity: 'Than đá (Coal)',
    weight: 12500,
    arrivalDate: '2023-10-15'
  },
  {
    id: '2',
    pincode: 'PC-100235',
    billOfLading: 'BL-US-1120',
    booking: 'BK-99211',
    vesselName: 'OCEAN DRAGON',
    status: 'Discharged',
    commodity: 'Thép cuộn (Steel Coils)',
    weight: 8400,
    arrivalDate: '2023-10-18'
  },
  {
    id: '3',
    pincode: 'PC-100236',
    billOfLading: 'BL-VN-4451',
    booking: 'BK-99212',
    vesselName: 'VIET SUN 09',
    status: 'Gate Out',
    commodity: 'Gỗ dăm (Wood Chips)',
    weight: 21000,
    arrivalDate: '2023-10-20'
  }
];

// --- Configuration Data for Category Screens ---

export const CATEGORY_CONFIG: Record<string, CategoryConfig> = {
  // --- SYSTEM ---
  'sys-port': {
    id: 'sys-port',
    title: 'Danh mục Cảng Biển',
    columns: [
      { key: 'code', label: 'Mã Cảng', type: 'text' },
      { key: 'name', label: 'Tên Cảng', type: 'text' },
      { key: 'country', label: 'Quốc gia', type: 'text' },
      { key: 'status', label: 'Trạng thái', type: 'status' },
    ],
    initialData: [
      { id: 1, code: 'VNCLI', name: 'Cảng Cát Lái', country: 'Vietnam', status: 'Active' },
      { id: 2, code: 'VNHPH', name: 'Cảng Hải Phòng', country: 'Vietnam', status: 'Active' },
      { id: 3, code: 'SGSIN', name: 'Singapore Port', country: 'Singapore', status: 'Active' },
    ]
  },
  'sys-rate': {
    id: 'sys-rate',
    title: 'Danh mục Tỷ Giá',
    columns: [
      { key: 'code', label: 'Mã Tiền Tệ', type: 'text' },
      { key: 'rate', label: 'Tỷ Giá (VND)', type: 'number' },
      { key: 'date', label: 'Ngày Áp Dụng', type: 'date' },
    ],
    initialData: [
      { id: 1, code: 'USD', rate: 24500, date: '2023-10-25' },
      { id: 2, code: 'EUR', rate: 26100, date: '2023-10-25' },
    ]
  },
  'sys-country': {
    id: 'sys-country',
    title: 'Danh mục Quốc Gia',
    columns: [
      { key: 'code', label: 'Mã QG', type: 'text' },
      { key: 'name', label: 'Tên Quốc Gia', type: 'text' },
      { key: 'region', label: 'Khu Vực', type: 'select', options: ['Asia', 'Europe', 'America'] },
    ],
    initialData: [
      { id: 1, code: 'VN', name: 'Việt Nam', region: 'Asia' },
      { id: 2, code: 'US', name: 'United States', region: 'America' },
    ]
  },

  // --- PORT DATA ---
  'port-shift': {
    id: 'port-shift',
    title: 'Danh mục Ca Làm Việc',
    columns: [
      { key: 'code', label: 'Mã Ca', type: 'text' },
      { key: 'name', label: 'Tên Ca', type: 'text' },
      { key: 'start', label: 'Giờ Bắt Đầu', type: 'text' },
      { key: 'end', label: 'Giờ Kết Thúc', type: 'text' },
    ],
    initialData: [
      { id: 1, code: 'C1', name: 'Ca 1', start: '06:00', end: '14:00' },
      { id: 2, code: 'C2', name: 'Ca 2', start: '14:00', end: '22:00' },
      { id: 3, code: 'C3', name: 'Ca 3', start: '22:00', end: '06:00' },
    ]
  },
  'port-yard': {
    id: 'port-yard',
    title: 'Danh mục Bãi (Yard)',
    columns: [
      { key: 'location', label: 'Vị trí', type: 'text' },
      { key: 'description', label: 'Diễn giải', type: 'text' },
      { key: 'capacity', label: 'Sức chứa (Tấn)', type: 'number' },
      { key: 'isLeased', label: 'Thuê (Ngoại)', type: 'checkbox' },
    ],
    initialData: [
      { id: 1, location: 'Khu A - Bãi 1', description: 'Bãi than chuyên dụng', capacity: 50000, isLeased: false },
      { id: 2, location: 'Khu B - Kho 2', description: 'Kho hàng tổng hợp', capacity: 30000, isLeased: true },
      { id: 3, location: 'Cảng Phụ 1', description: 'Bãi thuê ngoài', capacity: 20000, isLeased: true },
    ]
  },
  'port-service': {
    id: 'port-service',
    title: 'Danh mục Dịch Vụ Cảng',
    columns: [
      { key: 'code', label: 'Mã DV', type: 'text' },
      { key: 'name', label: 'Tên Dịch Vụ', type: 'text' },
      { key: 'unit', label: 'ĐVT', type: 'text' },
      { key: 'price', label: 'Đơn Giá Chuẩn', type: 'number' },
    ],
    initialData: [
      { id: 1, code: 'DV01', name: 'Bốc xếp tại cầu', unit: 'Tấn', price: 45000 },
      { id: 2, code: 'DV02', name: 'Lưu bãi', unit: 'Tấn/Ngày', price: 2000 },
    ]
  },
  'port-unit': {
    id: 'port-unit',
    title: 'ĐƠN VỊ TÍNH',
    columns: [
      { key: 'code', label: 'Mã đơn vị tính', type: 'text' },
      { key: 'name', label: 'Tên đơn vị', type: 'text' },
    ],
    initialData: [
      { id: 1, code: 'BAG', name: 'Bao' },
      { id: 2, code: 'Bdls', name: 'Kiện' },
      { id: 3, code: 'Ben', name: 'Ben' },
      { id: 4, code: 'BINH', name: 'Bình' },
      { id: 5, code: 'BO1', name: 'Bộ' },
      { id: 6, code: 'BO2', name: 'Bó' },
      { id: 7, code: 'BON', name: 'Bồn' },
      { id: 8, code: 'BON/NGAY', name: 'Bồn/ngày' },
      { id: 9, code: 'ca', name: 'Ca' },
      { id: 10, code: 'CAI', name: 'Cái' },
      { id: 11, code: 'Can', name: 'Can' },
      { id: 12, code: 'CAP', name: 'Cặp' },
      { id: 13, code: 'CAY', name: 'Cây' },
      { id: 14, code: 'Cbm', name: 'Cbm' },
      { id: 15, code: 'CH', name: 'Ch/ngày' },
      { id: 16, code: 'Chai', name: 'Chai' },
      { id: 17, code: 'CHAU', name: 'Chậu' },
      { id: 18, code: 'CHIEC', name: 'Chiếc' },
      { id: 19, code: 'CHIEC/NGAY', name: 'Chiếc/ngày' },
    ]
  },
  'port-plan': {
    id: 'port-plan',
    title: 'PHƯƠNG ÁN',
    columns: [
      { key: 'direction', label: 'Hướng Nhập/Xuất', type: 'select', options: ['Nhập', 'Xuất'] },
      { key: 'transitId', label: 'TransitID', type: 'text' },
      { key: 'inOut', label: 'Vào/Ra', type: 'select', options: ['Vào', 'Ra'] },
      { key: 'code', label: 'Mã phương án', type: 'text' },
      { key: 'name', label: 'Tên phương án', type: 'text' },
      { key: 'isYard', label: 'Bãi', type: 'checkbox' },
      { key: 'isVessel', label: 'Tàu', type: 'checkbox' },
      { key: 'hqCode', label: 'Mã hình thức (HQ)', type: 'number' },
      { key: 'note', label: 'Ghi chú', type: 'text' },
    ],
    initialData: [
      { id: 1, direction: 'Xuất', transitId: '', inOut: 'Vào', code: 'HBAI', name: 'HẠ TẬP KẾT', isYard: true, isVessel: false, hqCode: 0, note: '' },
      { id: 2, direction: 'Nhập', transitId: '', inOut: 'Ra', code: 'LAYN', name: 'XUẤT BÃI', isYard: true, isVessel: false, hqCode: 0, note: '' },
      { id: 3, direction: 'Nhập', transitId: '', inOut: 'Ra', code: 'NGTH', name: 'GIAO THẲNG', isYard: false, isVessel: true, hqCode: 0, note: '' },
      { id: 4, direction: 'Nhập', transitId: '', inOut: 'Vào', code: 'NTAU', name: 'NHẬP BÃI', isYard: true, isVessel: true, hqCode: 0, note: '' },
      { id: 5, direction: 'Xuất', transitId: '', inOut: 'Ra', code: 'XGTH', name: 'XUẤT GIAO THẲNG', isYard: false, isVessel: true, hqCode: 0, note: '' },
      { id: 6, direction: 'Xuất', transitId: '', inOut: 'Ra', code: 'XTAU', name: 'XUẤT TÀU', isYard: true, isVessel: false, hqCode: 0, note: '' },
    ]
  },

  // --- OPS DATA ---
  'ops-cargo': {
    id: 'ops-cargo',
    title: 'Danh mục Hàng Hóa',
    columns: [
      { key: 'code', label: 'Mã Hàng', type: 'text' },
      { key: 'name', label: 'Tên Hàng Hóa', type: 'text' },
      { key: 'group', label: 'Nhóm Hàng', type: 'select', options: ['Nông Sản', 'Khoáng Sản', 'Xây Dựng'] },
      { key: 'dangerous', label: 'Hàng Nguy Hiểm', type: 'select', options: ['Có', 'Không'] },
    ],
    initialData: [
      { id: 1, code: 'COAL', name: 'Than đá Indonesia', group: 'Khoáng Sản', dangerous: 'Không' },
      { id: 2, code: 'RICE', name: 'Gạo xá', group: 'Nông Sản', dangerous: 'Không' },
      { id: 3, code: 'FERT', name: 'Phân bón DAP', group: 'Nông Sản', dangerous: 'Có' },
    ]
  },
  'ops-team': {
    id: 'ops-team',
    title: 'Danh mục Tổ Đội Công Nhân',
    columns: [
      { key: 'code', label: 'Mã Đội', type: 'text' },
      { key: 'name', label: 'Tên Đội', type: 'text' },
      { key: 'leader', label: 'Đội Trưởng', type: 'text' },
      { key: 'members', label: 'Số Lượng', type: 'number' },
    ],
    initialData: [
      { id: 1, code: 'TD01', name: 'Tổ Bốc Xếp 1', leader: 'Nguyễn Văn A', members: 12 },
      { id: 2, code: 'TD02', name: 'Tổ Cơ Giới 2', leader: 'Trần Văn B', members: 8 },
    ]
  },
  'ops-custtype': {
    id: 'ops-custtype',
    title: 'LOẠI KHÁCH HÀNG',
    columns: [
      { key: 'code', label: 'Mã loại khách hàng', type: 'text' },
      { key: 'name', label: 'Tên loại khách hàng', type: 'text' },
    ],
    initialData: [
      { id: 1, code: 'AGENT', name: 'Đại lý' },
      { id: 2, code: 'CNS', name: 'Chủ hàng' },
      { id: 3, code: 'TRANS', name: 'Vận tải' },
    ]
  },
  'ops-cust': {
    id: 'ops-cust',
    title: 'KHÁCH HÀNG',
    columns: [
      { key: 'custType', label: 'Loại khách hàng', type: 'select', options: ['Đại lý', 'Chủ hàng', 'Vận tải'] },
      { key: 'code', label: 'Mã khách hàng', type: 'text' },
      { key: 'name', label: 'Tên khách hàng', type: 'text' },
      { key: 'taxCode', label: 'Mã số thuế', type: 'text' },
      { key: 'paymentType', label: 'Loại thanh toán', type: 'select', options: ['Thu ngay', 'Thu sau'] },
      { key: 'phone', label: 'Số điện thoại', type: 'text' },
      { key: 'address', label: 'Địa chỉ', type: 'text' },
      { key: 'email', label: 'Email', type: 'text' },
      { key: 'status', label: 'Tình trạng', type: 'status' },
    ],
    initialData: [] 
  },
  'ops-eqptype': {
    id: 'ops-eqptype',
    title: 'LOẠI THIẾT BỊ',
    columns: [
      { key: 'code', label: 'Mã loại thiết bị', type: 'text' },
      { key: 'name', label: 'Tên loại thiết bị', type: 'text' },
    ],
    initialData: [
      { id: 1, code: 'FL', name: 'Folk Lift' },
      { id: 2, code: 'QC', name: 'Gantry Crane' },
      { id: 3, code: 'RM', name: 'Romooc' },
      { id: 4, code: 'TC', name: 'Tranfer Crane' },
      { id: 5, code: 'VC', name: 'Vessel Crane' },
      { id: 6, code: 'YT', name: 'Yard Tractor' },
    ]
  },
  'ops-eqp': {
    id: 'ops-eqp',
    title: 'THIẾT BỊ',
    columns: [
      { key: 'type', label: 'Loại thiết bị', type: 'select', options: ['Folk Lift', 'Gantry Crane', 'Yard Tractor', 'Romooc'] },
      { key: 'code', label: 'Mã thiết bị', type: 'text' },
      { key: 'name', label: 'Tên thiết bị', type: 'text' },
      { key: 'owner', label: 'Thuê', type: 'text' },
      { key: 'note', label: 'Ghi chú', type: 'text' },
    ],
    initialData: [
      { id: 1, type: 'Folk Lift', code: 'ABA', name: 'AN BẢO ANH', owner: 'Tân Thuận 2', note: 'haizo' },
      { id: 2, type: 'Gantry Crane', code: 'B100', name: 'B100', owner: 'Thuê', note: 'haizo' },
      { id: 3, type: 'Yard Tractor', code: 'CK', name: 'CÔNG TY CP CƠ KHÍ', owner: 'Thuê', note: '' },
      { id: 4, type: 'Yard Tractor', code: 'CP1', name: 'CP1', owner: 'Tân Thuận 1', note: '' },
      { id: 5, type: 'Yard Tractor', code: 'CP2', name: 'CP2', owner: 'Tân Thuận 1', note: '' },
      { id: 6, type: 'Yard Tractor', code: 'CP3', name: 'CP3', owner: 'Tân Thuận 1', note: '' },
      { id: 7, type: 'Yard Tractor', code: 'CP4', name: 'CP4', owner: 'Tân Thuận 1', note: '' },
      { id: 8, type: 'Yard Tractor', code: 'CP6', name: 'CP6', owner: 'Tân Thuận 1', note: '' },
      { id: 9, type: 'Folk Lift', code: 'CPHH', name: 'CP HÀNG HẢI', owner: 'Thuê', note: '' },
      { id: 10, type: 'Gantry Crane', code: 'CT01', name: 'CT01', owner: 'Tân Thuận 1', note: '' },
      { id: 11, type: 'Gantry Crane', code: 'GW 01', name: 'GW 01', owner: 'Tân Thuận 1', note: '' },
      { id: 12, type: 'Gantry Crane', code: 'GW 02', name: 'GW 02', owner: 'Tân Thuận 1', note: '' },
      { id: 13, type: 'Gantry Crane', code: 'GW 03', name: 'GW 03', owner: 'Tân Thuận 1', note: '' },
      { id: 14, type: 'Gantry Crane', code: 'GW 04', name: 'GW 04', owner: 'Tân Thuận 1', note: '' },
      { id: 15, type: 'Gantry Crane', code: 'GW 05', name: 'GW 05', owner: 'Tân Thuận 1', note: '' },
      { id: 16, type: 'Romooc', code: 'GW05', name: 'GW05', owner: 'Tân Thuận 1', note: '' },
      { id: 17, type: 'Yard Tractor', code: 'GW-05', name: 'GW-05', owner: 'Tân Thuận 1', note: '' },
    ]
  }
};