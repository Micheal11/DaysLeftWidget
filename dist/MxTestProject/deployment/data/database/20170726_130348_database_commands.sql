ALTER TABLE "testsuite$event" RENAME TO "193a00a11dcf4d2eb09063f7192e82ac";
ALTER TABLE "testsuite$person" RENAME TO "testsuite$deadline";
DELETE FROM "mendixsystem$entity" 
 WHERE "id" = '12482fde-2a94-4392-8bb8-ef889b60253e';
DELETE FROM "mendixsystem$entityidentifier" 
 WHERE "id" = '12482fde-2a94-4392-8bb8-ef889b60253e';
DELETE FROM "mendixsystem$sequence" 
 WHERE "attribute_id" IN (SELECT "id"
 FROM "mendixsystem$attribute"
 WHERE "entity_id" = '12482fde-2a94-4392-8bb8-ef889b60253e');
DELETE FROM "mendixsystem$attribute" 
 WHERE "entity_id" = '12482fde-2a94-4392-8bb8-ef889b60253e';
ALTER TABLE "testsuite$deadline" ALTER COLUMN "name" RENAME TO "ba297ee6d624446193a1ef154927a89d";
ALTER TABLE "testsuite$deadline" ALTER COLUMN "ba297ee6d624446193a1ef154927a89d" RENAME TO "name";
ALTER TABLE "testsuite$deadline" ADD "date" TIMESTAMP NULL;
UPDATE "mendixsystem$entity"
 SET "entity_name" = 'TestSuite.Deadline', 
"table_name" = 'testsuite$deadline', 
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
 VALUES ('364ed7f3-5cf3-4313-9295-c2215e09263e', 
'71dce310-d1c4-4c8b-b11a-e44e6c39e467', 
'Date', 
'date', 
20, 
0, 
'', 
false);
UPDATE "mendixsystem$attribute"
 SET "entity_id" = '71dce310-d1c4-4c8b-b11a-e44e6c39e467', 
"attribute_name" = 'Name', 
"column_name" = 'name', 
"type" = 30, 
"length" = 200, 
"default_value" = '', 
"is_auto_number" = false
 WHERE "id" = 'eb779d60-93a5-47c3-b4be-f86186b55cb8';
DROP TABLE "193a00a11dcf4d2eb09063f7192e82ac";
UPDATE "mendixsystem$version"
 SET "versionnumber" = '4.1', 
"lastsyncdate" = '20170726 13:03:46';
