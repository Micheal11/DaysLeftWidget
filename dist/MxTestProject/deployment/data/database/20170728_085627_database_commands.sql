ALTER TABLE "testsuite$deadline" ALTER COLUMN "name" RENAME TO "event";
UPDATE "mendixsystem$attribute"
 SET "entity_id" = '71dce310-d1c4-4c8b-b11a-e44e6c39e467', 
"attribute_name" = 'Event', 
"column_name" = 'event', 
"type" = 30, 
"length" = 200, 
"default_value" = '', 
"is_auto_number" = false
 WHERE "id" = 'eb779d60-93a5-47c3-b4be-f86186b55cb8';
UPDATE "mendixsystem$version"
 SET "versionnumber" = '4.1', 
"lastsyncdate" = '20170728 08:54:54';
