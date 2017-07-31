ALTER TABLE "testsuite$deadline" DROP COLUMN "date";
ALTER TABLE "testsuite$deadline" ADD "date" VARCHAR_IGNORECASE(200) NULL;
UPDATE "mendixsystem$attribute"
 SET "entity_id" = '71dce310-d1c4-4c8b-b11a-e44e6c39e467', 
"attribute_name" = 'Date', 
"column_name" = 'date', 
"type" = 30, 
"length" = 200, 
"default_value" = '', 
"is_auto_number" = false
 WHERE "id" = '364ed7f3-5cf3-4313-9295-c2215e09263e';
UPDATE "mendixsystem$version"
 SET "versionnumber" = '4.1', 
"lastsyncdate" = '20170727 15:42:25';
