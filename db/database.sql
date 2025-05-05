create database pxldb;
\c pxldb

create user secadv with password 'ilovesecurity';
grant all privileges on database pxldb to secadv;
BEGIN;

create table users (id serial primary key, user_name text not null unique, password text not null);
grant all privileges on table users to secadv;

-- changed passwords to bcrypt 12 round hashes using https://bcrypt-generator.com, was insecureandlovinit and iwishihadbetteradmins
insert into users (user_name, password) values ('pxl-admin', '$2a$12$JAOY5cWc0WBlZ5iPzXAqa.C2VF44mFCwF6dtHrv3DDAT1k2B3Ngti') ;
insert into users (user_name, password) values ('george', '$2a$12$2IT4LdYiShAOyppHI7yX6OJQ3ck3dtSTre8wjlDgWQ2WpWMU0eKXK') ;

COMMIT;