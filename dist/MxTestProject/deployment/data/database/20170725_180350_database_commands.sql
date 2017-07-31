ALTER TABLE "testsuite$date" RENAME TO "testsuite$person";
ALTER TABLE "testsuite$person" DROP COLUMN "date";
DELETE FROM "mendixsystem$attribute" 
 WHERE "id" = '08c0bc95-36aa-4b87-b1a6-f046cebd998e';
UPDATE "mendixsystem$entity"
 SET "entity_name" = 'TestSuite.person', 
"table_name" = 'testsuite$person', 
"superentity_id" = NULL
 WHERE "id" = '71dce310-d1c4-4c8b-b11a-e44e6c39e467';
UPDATE "mendixsystem$version"
 SET "versionnumber" = '4.1', 
"lastsyncdate" = '20170725 18:03:45';
