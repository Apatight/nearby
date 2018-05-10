CREATE DATABASE apateez IF NOT EXISTS;

\connect apateez;

DROP TABLE IF EXISTS nearby;

CREATE TABLE nearby (
    "place_id" int,
    "name" text,
    "google_rating" int,
    "zagat_rating" int,
    "photos" text[],
    "neighborhood" text,
    "price_level" int,
    "types" text,
    "nearby" int[],
    PRIMARY KEY ("place_id")
);
