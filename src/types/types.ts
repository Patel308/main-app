
export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  image?: string;
  features: string[];
}

export interface CaseStudy {
  id: string;
  client: string;
  category: string;
  image: string;
  result: string;
  description: string;
  link?: string;
}

export interface Resource {
  id: string;
  title: string;
  category: string;
  date: string;
  image: string;
  excerpt: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  bio: string;
  linkedin?: string;
}

export enum Role {
  USER = 'user',
  MODEL = 'model',
}

export interface ChatMessage {
  role: Role;
  text: string;
  isThinking?: boolean;
}

export interface BookingSlot {
  id: string;
  date: string; // ISO String
  time: string;
  available: boolean;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  company?: string;
  interest: string;
  status: 'New' | 'Contacted' | 'Qualified' | 'Converted';
  date: string;
}
