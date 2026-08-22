
alter table profiles enable row level security;
alter table players enable row level security;
alter table news enable row level security;
alter table matches enable row level security;

create policy "public read players" on players for select using (true);
create policy "public read news" on news for select using (true);
create policy "public read matches" on matches for select using (true);
