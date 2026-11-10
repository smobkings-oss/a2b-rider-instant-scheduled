-- A2B Rides Supabase Schema (run in SQL editor)

-- Enable extensions
create extension if not exists "uuid-ossp";
create extension if not exists "postgis";

-- Profiles
create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  full_name text,
  phone text,
  role text check (role in ('rider', 'driver', 'admin')) default 'rider',
  avatar_url text,
  created_at timestamptz default now()
);

-- Drivers
create table drivers (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references profiles(id) on delete cascade unique,
  vehicle_make text,
  vehicle_model text,
  vehicle_year int,
  license_plate text,
  is_tesla boolean default false,
  is_online boolean default false,
  current_location geography(point, 4326),
  rating numeric(3,2) default 5.0,
  total_rides int default 0,
  created_at timestamptz default now()
);

-- Rides
create table rides (
  id uuid primary key default uuid_generate_v4(),
  rider_id uuid references profiles(id),
  driver_id uuid references drivers(id),
  pickup_address text not null,
  dropoff_address text not null,
  pickup_location geography(point, 4326),
  dropoff_location geography(point, 4326),
  status text check (status in ('requested', 'accepted', 'arriving', 'in_progress', 'completed', 'cancelled')) default 'requested',
  scheduled_at timestamptz,
  estimated_price numeric(10,2),
  final_price numeric(10,2),
  payment_intent_id text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- RLS Policies (example)
alter table profiles enable row level security;
alter table rides enable row level security;
alter table drivers enable row level security;

-- Riders can see their own rides
create policy "Riders can view own rides" on rides
  for select using (auth.uid() = rider_id);

-- Drivers can see available and assigned rides
create policy "Drivers can view relevant rides" on rides
  for select using (
    status = 'requested' or auth.uid() in (
      select user_id from drivers where id = driver_id
    )
  );

-- Enable realtime
alter publication supabase_realtime add table rides;
alter publication supabase_realtime add table drivers;
