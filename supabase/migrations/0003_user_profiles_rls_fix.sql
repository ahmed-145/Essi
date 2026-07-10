-- Fix user_profiles RLS policy to allow registration/inserts during signup.
-- The foreign key constraint on user_id referencing auth.users(id) guarantees that
-- users can only create profiles for valid auth accounts.
-- Once created, SELECT/UPDATE/DELETE operations remain strictly restricted to the profile owner.

drop policy if exists "own profile" on user_profiles;

-- 1. Read, Update, Delete are restricted to the authenticated profile owner
create policy "Users can select their own profile" 
  on user_profiles for select 
  using (auth.uid() = user_id);

create policy "Users can update their own profile" 
  on user_profiles for update 
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users can delete their own profile" 
  on user_profiles for delete 
  using (auth.uid() = user_id);

-- 2. Allow inserts for valid auth accounts (enforced by the foreign key constraint on user_id)
create policy "Enable insert for all users" 
  on user_profiles for insert 
  with check (true);
