import connection from "../api/src/database_client.js";

connection
  .raw("SELECT 1")
  .then(() => {
    console.log("Database connection successful!");
  })
  .catch((error) => {
    console.error("Database connection failed:", error);
  })
  .finally(() => {
    connection.destroy(); // Close the connection when done
  });
