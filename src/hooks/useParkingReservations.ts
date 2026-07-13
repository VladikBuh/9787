import { useEffect, useState } from 'react';
import { ParkingReservation, ParkingSpot } from '../types';

let _reservations: ParkingReservation[] = [
  {
    id: 'seed-a2',
    spotId: '1-A2',
    spotLabel: 'A2',
    floor: 1,
    status: 'Active',
    start: '09.07.2026 13:13',
    end: '09.07.2026 23:13',
  },
  {
    id: 'seed-b3',
    spotId: '2-B3',
    spotLabel: 'B3',
    floor: 2,
    status: 'Active',
    start: '15.01.2025 09:00',
    end: '15.01.2025 18:00',
  },
  {
    id: 'seed-a4',
    spotId: '1-A4',
    spotLabel: 'A4',
    floor: 1,
    status: 'Completed',
    start: '10.01.2025 14:00',
    end: '10.01.2025 20:00',
  },
];

let _listeners: Array<() => void> = [];

const notify = () => _listeners.forEach(fn => fn());

export const useParkingReservations = () => {
  const [, forceUpdate] = useState(0);

  useEffect(() => {
    const listener = () => forceUpdate(n => n + 1);
    _listeners.push(listener);
    return () => {
      _listeners = _listeners.filter(fn => fn !== listener);
    };
  }, []);

  const addReservation = (spot: ParkingSpot, start: string, end: string) => {
    _reservations = [
      {
        id: `reservation-${spot.id}-${_reservations.length}`,
        spotId: spot.id,
        spotLabel: spot.label,
        floor: spot.floor,
        status: 'Active',
        start,
        end,
      },
      ..._reservations,
    ];
    notify();
  };

  const updateReservation = (id: string, start: string, end: string) => {
    _reservations = _reservations.map(reservation =>
      reservation.id === id ? { ...reservation, start, end } : reservation,
    );
    notify();
  };

  const cancelReservation = (id: string) => {
    _reservations = _reservations.filter(
      reservation => reservation.id !== id,
    );
    notify();
  };

  return {
    reservations: _reservations,
    addReservation,
    updateReservation,
    cancelReservation,
  };
};
