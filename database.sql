CREATE TABLE "person" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

CREATE TABLE "car_info" (
	"id" SERIAL PRIMARY KEY,
	"make" varchar(40) NOT NULL,
	"model" varchar(40) NOT NULL,
	"year" integer NOT NULL
); 

CREATE TABLE "auto_shop" (
	"id" serial PRIMARY KEY,
	"shop_name" varchar(100) NOT NULL,
	"shop_address" varchar(200) NOT NULL,
	"shop_number" varchar(20) NOT NULL
);

CREATE TABLE "junction_table" (
	"id" serial PRIMARY KEY,
	"user_id" integer REFERENCES "person"("id"),
	"car_id" integer REFERENCES "car_info"("id"),
	"auto_shop_id" integer REFERENCES "auto_shop"("id")
);

-- many to many joins
SELECT "person"."username", "auto_shop"."shop_name", "car_info".* FROM "person" 
JOIN "junction_table" ON "person"."id" = "junction_table"."user_id"
JOIN "car_info" ON "car_info"."id" = "junction_table"."car_id"
JOIN "auto_shop" ON "auto_shop"."id" = "junction_table"."auto_shop_id";

CREATE TABLE "sensors" (
	"id" serial PRIMARY KEY,
	"sensor_name" varchar(200) NOT NULL,
	"state" bool NOT NULL DEFAULT 'false',
	"refrences_car" integer REFERENCES "car_info"("id")
);



CREATE TABLE "fluid_levels" (
	"id" serial PRIMARY KEY,
	"fluid_name" varchar(100) NOT NULL,
	"fluid_level" integer NOT NULL,
	"references_car" integer REFERENCES "car_info"("id")
);

-- See each Cars sensors and fluids
SELECT "car_info".*, "sensors".sensor_name, "sensors".state, "fluid_levels".fluid_name, "fluid_levels".fluid_level FROM "car_info" 
JOIN "sensors" ON "sensors".refrences_car = "car_info".id
JOIN "fluid_levels" ON "fluid_levels".references_car = "car_info".id;