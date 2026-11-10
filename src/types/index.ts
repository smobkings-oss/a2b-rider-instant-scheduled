export type RideStatus =
  | "requested"
  | "accepted"
  | "arriving"
  | "in_progress"
  | "completed"
  | "cancelled";

export interface Ride {
  id: string;
  rider_id: string;
  driver_id?: string;
  pickup_address: string;
  dropoff_address: string;
  pickup_lat?: number;
  pickup_lng?: number;
  dropoff_lat?: number;
  dropoff_lng?: number;
  status: RideStatus;
  scheduled_at?: string | null;
  estimated_price: number;
  final_price?: number;
  created_at: string;
}

export interface Driver {
  id: string;
  user_id: string;
  vehicle_make: string;
  vehicle_model: string;
  is_tesla: boolean;
  is_online: boolean;
  current_lat?: number;
  current_lng?: number;
}
