const pgPromise = require("pg-promise");

const db = pgPromise()("postgres://postgres:postgres@localhost:5432/lezioni");

const setupDb = async () => {
  try {
    await db.none(`
    DROP TABLE IF EXISTS planets;

    CREATE TABLE planets(
      id SERIAL NOT NULL PRIMARY KEY,
      name TEXT NOT NULL
    );
  `);
    console.log("PostgresDb connected");
  } catch (error) {
    console.log(error);
  }
};

module.exports = { db, setupDb };
