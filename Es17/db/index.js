const pgPromise = require("pg-promise");

const db = pgPromise()("postgres://postgres:postgres@localhost:5432/lezioni");

const setupDb = async () => {
  try {
    await db.none(`
    DROP TABLE IF EXISTS users;
    DROP TABLE IF EXISTS planets;

    CREATE TABLE users (
      id SERIAL NOT NULL PRIMARY KEY,
      username TEXT NOT NULL,
      password TEXT NOT NULL,
      token TEXT
    );

     CREATE TABLE planets(
      id SERIAL NOT NULL PRIMARY KEY,
      name TEXT NOT NULL,
      image TEXT
    );
  `);
    console.log("PostgresDb connected");
  } catch (error) {
    console.log(error);
  }
};

module.exports = { db, setupDb };
