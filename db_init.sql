create database guestbook;

drop table if exists record;
create table record(
    'fname' varchar(255),
    'lname' varchar(255), 
    'email' varchar(255),
    'address' varchar(255),
    'location' varchar(255),
    'mailing' varchar(255),
    'format' varchar(255),
    'other' varchar(255),
    'message' varchar(255),
    timestamp datetime default now()
);

insert into record ('fname', 'lname', 'email', 'address', 'location', 'mailing','format','other','message')
values ('Joe', 'Shmo', 'jshmo@gmail.com','addressTesting','locationTesting','mailingTesting','formatTesting','otherTesting','messageTesting');
