create table temp_json (values text);
copy temp_json from '/Users/oliverhan/dev/system-design-capstone/nearby/dataList.json';

-- uncomment the line above to insert records into your table
-- insert into apateez_nearby ("name", "place_id", "google_rating", "zagat_rating", "photos", "neighborhood", "price_level", "types", "nearby")

  select values->>'name' as name,
         values->>'place_id' as place_id,
         CAST(values->>'google_rating' AS integer) AS google_rating,
         CAST(values->>'zagat_rating' AS integer) AS zagat_rating,
         CAST(values->>'photos' AS text[]) AS photos,
         values->>'neighborhood' as neighborhood,
         CAST(values->>'price_level' AS integer) AS price_level,
         values->>'types' as types,
         CAST(values->>'nearby' AS int[]) AS nearby

 from   (
            select json_array_elements(replace(values,'\','\\')::json) as values
            from   temp_json
        ) a;
