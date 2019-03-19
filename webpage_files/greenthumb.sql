create database greenthumb;
use greenthumb;
create table users  (
	uid int,
	email varchar(30) not null,
    password binary(64) not null
);

create table plants (
	ownerID int,
    waterInterval time,
    notes tinytext,
    image varchar(50)
);

insert into users values(
	'1',
    'test@email.com',
    '0'
);

insert into plants values(
	'1',
    '24:00:00',
    'This is a test note',
    '/img/testplant.jpg'
);

select * from users;

select * from plants 
	where ownerid = (
    select uid from users
		where email = "test@email.com")