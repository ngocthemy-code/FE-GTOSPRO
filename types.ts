import { LucideIcon } from 'lucide-react';

export interface SubMenuItem {
  id: string;
  label: string;
  icon?: LucideIcon;
  submenu?: SubMenuItem[]; // Recursive structure for Level 3
}

export interface MenuItem {
  id: string;
  label: string;
  icon: LucideIcon;
  submenu?: SubMenuItem[];
}

export interface ShipmentData {
  id: string;
  pincode: string;
  billOfLading: string;
  booking: string;
  vesselName: string;
  status: 'In Yard' | 'Loaded' | 'Discharged' | 'Gate Out';
  commodity: string;
  weight: number; // in tonnes
  arrivalDate: string;
}

export enum TabType {
  PINCODE = 'PINCODE',
  BILL = 'BILL',
  BOOKING = 'BOOKING'
}

export interface ChartData {
  name: string;
  value: number;
}

// --- New Types for Category Manager ---

export type ColumnType = 'text' | 'number' | 'date' | 'select' | 'status' | 'checkbox';

export interface ColumnDefinition {
  key: string;
  label: string;
  type: ColumnType;
  options?: string[]; // For 'select' type
  width?: string;
}

export interface CategoryConfig {
  id: string;
  title: string;
  columns: ColumnDefinition[];
  initialData: any[];
}

// --- Types for Yard Map Designer ---
export interface YardBlock {
  id: string;
  name: string;
  x: number; // percentage (0-100)
  y: number; // percentage (0-100)
  width: number; // percentage
  height: number; // percentage
  capacity: number; // Max tons
  currentLoad: number; // Current tons
  color: string; // Hex color code for identification
  type: 'Bulk' | 'General' | 'Liquid';
}