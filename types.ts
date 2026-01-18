import { LucideIcon } from 'lucide-react';

export interface SectionProps {
  id?: string;
  className?: string;
}

export interface Memory {
  id: number;
  Icon: LucideIcon;
  title: string;
  caption: string;
  rotation: number;
  color: string;
  date?: string;
}

export interface Reason {
  id: number;
  text: string;
}