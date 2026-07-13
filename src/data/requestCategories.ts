import { RequestCategory } from '../types';

export const requestCategories: RequestCategory[] = [
  {
    id: 'room-comfort',
    label: 'Room Comfort & Amenities',
    icon: '🛏️',
    tint: 'rgba(43,111,237,0.12)',
    accent: '#2B6FED',
  },
  {
    id: 'housekeeping',
    label: 'Housekeeping Services',
    icon: '🏠',
    tint: 'rgba(16,185,129,0.12)',
    accent: '#10B981',
  },
  {
    id: 'food-beverage',
    label: 'Food & Beverage Orders',
    icon: '🍽️',
    tint: 'rgba(245,158,11,0.12)',
    accent: '#F59E0B',
  },
  {
    id: 'laundry',
    label: 'Laundry & Garment Care',
    icon: '👕',
    tint: 'rgba(139,92,246,0.12)',
    accent: '#8B5CF6',
  },
  {
    id: 'maintenance',
    label: 'Maintenance & Technical Support',
    icon: '🔧',
    tint: 'rgba(239,68,68,0.12)',
    accent: '#EF4444',
  },
  {
    id: 'transportation',
    label: 'Transportation & Concierge',
    icon: '🧭',
    tint: 'rgba(6,182,212,0.12)',
    accent: '#06B6D4',
  },
  {
    id: 'special-requests',
    label: 'Special Requests & Celebrations',
    icon: '🎁',
    tint: 'rgba(236,72,153,0.12)',
    accent: '#EC4899',
  },
];

export const getCategory = (id: string): RequestCategory =>
  requestCategories.find(category => category.id === id) ??
  requestCategories[0];
