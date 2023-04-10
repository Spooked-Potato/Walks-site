use walks;

create table user(
	id int not null auto_increment primary key,
	user_name varchar(100) not null,
	admin bool DEFAULT true
);


create table walkPost(
	id int not null auto_increment primary key,
	walk_title varchar(100) not null,
	description text  not null,
	image_url varchar(255) NOT NULL,
	walk_date varchar(100) null,
	created_at datetime NOT NULL DEFAULT current_timestamp(),
	updated_at datetime NOT NULL DEFAULT current_timestamp()
);


create table walkUser(
	id int not null auto_increment primary key,
	user_id int not null,
	walk_id int not null,
	FOREIGN key (user_id) REFERENCES user(id),
	FOREIGN key (walk_id) REFERENCES walkPost(id)
);
