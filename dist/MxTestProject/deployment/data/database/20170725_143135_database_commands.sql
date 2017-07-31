ALTER TABLE "testsuite$person" RENAME TO "testsuite$date";
ALTER TABLE "testsuite$date" ADD "date" TIMESTAMP NULL;
UPDATE "mendixsystem$entity"
 SET "entity_name" = 'TestSuite.Date', 
"table_name" = 'testsuite$date', 
"superentity_id" = NULL
 WHERE "id" = '71dce310-d1c4-4c8b-b11a-e44e6c39e467';
INSERT INTO "mendixsystem$attribute" ("id", 
"entity_id", 
"attribute_name", 
"column_name", 
"type", 
"length", 
"default_value", 
"is_auto_number")
 VALUES ('08c0bc95-36aa-4b87-b1a6-f046cebd998e', 
'71dce310-d1c4-4c8b-b11a-e44e6c39e467', 
'Date', 
'date', 
20, 
0, 
'', 
false);
UPDATE "mendixsystem$version"
 SET "versionnumber" = '4.1', 
"lastsyncdate" = '20170725 14:31:32';
