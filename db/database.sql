create database pxldb;
\c pxldb

create user secadv with password 'ilovesecurity';
grant all privileges on database pxldb to secadv;
BEGIN;

create table users (id serial primary key, user_name text not null unique, password text not null);
grant all privileges on table users to secadv;

insert into users (user_name, password) values ('pxl-admin', '$2a$12$0dcGPT5RTTKtUJbpvu/E/uUpV19gW3UPYK1moV7eApa7GCDUoLJCG') ;
insert into users (user_name, password) values ('george', '$2a$12$SWYcOpaW66XPWoR1Rw746eHIsDuRtYlu1i40MqZaXZNaZpCKSbYU6') ;

COMMIT;