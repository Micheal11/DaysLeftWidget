CREATE TABLE "testsuite$event" (
	"id" BIGINT NOT NULL,
	"name" VARCHAR_IGNORECASE(200) NULL,
	PRIMARY KEY("id"));
INSERT INTO "mendixsystem$entity" ("id", 
"entity_name", 
"table_name")
 VALUES ('12482fde-2a94-4392-8bb8-ef889b60253e', 
'TestSuite.event', 
'testsuite$event');
INSERT INTO "mendixsystem$attribute" ("id", 
"entity_id", 
"attribute_name", 
"column_name", 
"type", 
"length", 
"default_value", 
"is_auto_number")
 VALUES ('e8b35c45-a356-46ed-abba-6f6256c34cd7', 
'12482fde-2a94-4392-8bb8-ef889b60253e', 
'Name', 
'name', 
30, 
200, 
'', 
false);
UPDATE "mendixsystem$version"
 SET "versionnumber" = '4.1', 
"lastsyncdate" = '20170726 12:19:02';
