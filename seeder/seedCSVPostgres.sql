
\connect apateez_nearby;

DROP TABLE IF EXISTS nearby;

CREATE TABLE apateez_nearby (
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

COPY apateez_nearby
FROM '/Users/oliverhan/dev/system-design-capstone/nearby/dataList.csv' DELIMITER ',' csv;
