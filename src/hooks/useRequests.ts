import { useEffect, useState } from 'react';
import { GuestRequest } from '../types';
import { getCategory } from '../data/requestCategories';

let _requests: GuestRequest[] = [
  {
    id: 'seed-accepted',
    categoryId: 'transportation',
    categoryLabel: 'Transportation & Concierge',
    description: 'Please arrange a taxi to Heathrow at 08:00',
    roomNumber: '412',
    status: 'Accepted',
    timeLabel: '09:40',
  },
  {
    id: 'seed-in-progress',
    categoryId: 'housekeeping',
    categoryLabel: 'Housekeeping Services',
    description: 'Please replace towels and restock toiletries',
    roomNumber: '412',
    status: 'In Progress',
    timeLabel: '14:22',
  },
  {
    id: 'seed-completed',
    categoryId: 'room-comfort',
    categoryLabel: 'Room Comfort & Amenities',
    description: 'Extra pillows and a blanket please',
    roomNumber: '412',
    status: 'Completed',
    timeLabel: '11:05',
  },
  {
    id: 'seed-submitted',
    categoryId: 'room-comfort',
    categoryLabel: 'Room Comfort & Amenities',
    description: 'Extra blanket and a firmer pillow, please.',
    roomNumber: '305',
    status: 'Submitted',
    timeLabel: '10:15',
  },
];

let _listeners: Array<() => void> = [];

const notify = () => _listeners.forEach(fn => fn());

export const useRequests = () => {
  const [, forceUpdate] = useState(0);

  useEffect(() => {
    const listener = () => forceUpdate(n => n + 1);
    _listeners.push(listener);
    return () => {
      _listeners = _listeners.filter(fn => fn !== listener);
    };
  }, []);

  const addRequest = (
    categoryId: string,
    description: string,
    roomNumber: string,
  ) => {
    const category = getCategory(categoryId);
    const now = new Date();
    const timeLabel = `${String(now.getHours()).padStart(2, '0')}:${String(
      now.getMinutes(),
    ).padStart(2, '0')}`;

    _requests = [
      {
        id: `request-${_requests.length}-${roomNumber}`,
        categoryId,
        categoryLabel: category.label,
        description,
        roomNumber,
        status: 'Submitted',
        timeLabel,
      },
      ..._requests,
    ];
    notify();
  };

  return {
    requests: _requests,
    activeRequests: _requests.filter(r => r.status !== 'Completed'),
    addRequest,
  };
};
