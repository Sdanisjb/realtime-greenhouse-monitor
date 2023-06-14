DROP TABLE IF EXISTS parameters_log;

CREATE TABLE parameters_log(
    id integer primary key autoincrement,
    created timestamp not null default current_timestamp,
    ph_level int not null,
    temperature_level int not null,
    humidity_level int not null,
    luminosity_level int not null,
    water_level int not null
);