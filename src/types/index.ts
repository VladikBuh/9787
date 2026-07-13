export type Phase = 'splash' | 'onboarding' | 'main';

export interface OnboardingSlide {
  key: string;
  image: string;
  title: string;
  description: string;
}

export type RequestStatus =
  | 'Submitted'
  | 'In Progress'
  | 'Accepted'
  | 'Completed';

export interface RequestCategory {
  id: string;
  label: string;
  icon: string;
  tint: string;
  accent: string;
}

export interface GuestRequest {
  id: string;
  categoryId: string;
  categoryLabel: string;
  description: string;
  roomNumber: string;
  status: RequestStatus;
  timeLabel: string;
}

export type RootStackParamList = {
  MainTabs: undefined;
  RequestForm: { categoryId: string };
  RequestsHistory: undefined;
};

export type TabParamList = {
  RequestsTab: undefined;
  ClimateTab: undefined;
  DineTab: undefined;
  ParkingTab: undefined;
  ConciergeTab: undefined;
};

export type ClimateMode = 'Cool' | 'Heat' | 'Auto';
export type FanSpeed = 'Low' | 'Medium' | 'High';

export type MenuCategory = 'Signatures' | 'Fresh & Light' | 'Desserts';

export interface MenuItem {
  id: string;
  name: string;
  category: MenuCategory;
  description: string;
  price: number;
  prepTime: string;
  ingredients: string[];
  image: string;
}

export interface CartLine {
  item: MenuItem;
  quantity: number;
  note: string;
}

export type DineStackParamList = {
  DineHome: undefined;
  MenuItemDetail: { itemId: string };
  Cart: undefined;
  OrderConfirmation: { estimatedTime: string };
};

export type ParkingFloor = 1 | 2 | 3;
export type ParkingSpotStatus = 'Available' | 'Occupied';

export interface ParkingSpot {
  id: string;
  label: string;
  floor: ParkingFloor;
  status: ParkingSpotStatus;
}

export type ReservationStatus = 'Active' | 'Completed';

export interface ParkingReservation {
  id: string;
  spotId: string;
  spotLabel: string;
  floor: ParkingFloor;
  status: ReservationStatus;
  start: string;
  end: string;
}

export interface ConciergeFaq {
  id: string;
  question: string;
  answer: string;
}
