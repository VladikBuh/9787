import { ParkingFloor, ParkingSpot } from '../types';

const ROWS = ['A', 'B', 'C', 'D'];
const COLS = [1, 2, 3, 4, 5];

const OCCUPIED_BY_FLOOR: Record<ParkingFloor, string[]> = {
  1: ['A1', 'A3', 'B1', 'B4', 'C2', 'C5', 'D3', 'D5'],
  2: ['A2', 'A4', 'B1', 'B3', 'C4', 'C5', 'D1', 'D2'],
  3: ['A1', 'A5', 'B2', 'B4', 'C1', 'C3', 'D4', 'D5'],
};

const buildFloorSpots = (floor: ParkingFloor): ParkingSpot[] => {
  const occupied = OCCUPIED_BY_FLOOR[floor];
  const spots: ParkingSpot[] = [];
  ROWS.forEach(row => {
    COLS.forEach(col => {
      const label = `${row}${col}`;
      spots.push({
        id: `${floor}-${label}`,
        label,
        floor,
        status: occupied.includes(label) ? 'Occupied' : 'Available',
      });
    });
  });
  return spots;
};

export const parkingSpotsByFloor: Record<ParkingFloor, ParkingSpot[]> = {
  1: buildFloorSpots(1),
  2: buildFloorSpots(2),
  3: buildFloorSpots(3),
};

export const getSpot = (floor: ParkingFloor, spotId: string): ParkingSpot | undefined =>
  parkingSpotsByFloor[floor].find(spot => spot.id === spotId);
