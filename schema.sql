DROP TABLE IF EXISTS parameters_log;

CREATE TABLE parameters_log(
    id integer primary key autoincrement,
    created timestamp not null default current_timestamp,
    ph_level float not null,
    temperature_level float not null,
    humidity_level float not null,
    luminosity_level float not null,
    water_level float not null
);