drop schema if exists mba_design_patterns cascade;

create schema mba_design_patterns;

create table mba_design_patterns.contracts (
  id uuid not null default uuid_generate_v4() primary key,
  description text,
  amount numeric,
  periods integer,
  date timestamp
);

create table mba_design_patterns.payments (
  id uuid not null default uuid_generate_v4() primary key,
  id_contract uuid references mba_design_patterns.contracts (id),
  amount numeric,
  date timestamp
);

insert into mba_design_patterns.contracts values ('2c0391ea-c647-4934-abb3-060ed3cd3a29', 'Prestação de serviços escolares', 6000, 12, '2022-01-01T10:00:00');
insert into mba_design_patterns.payments values ('55de06c9-6d88-4f4c-a237-39f26eea8718', '2c0391ea-c647-4934-abb3-060ed3cd3a29', 6000, '2022-01-05T10:00:00');
