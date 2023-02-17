import mysql from "mysql2";

export const connection = mysql
  .createPool({
    host: "localhost",
    user: "root",
    password: "admin",
    database: "walks",
  })
  .promise();

// connection.connect((err) => {
//   if (err) throw err;
//   console.log("Connected to the database!");
// });
