# MySQL Query Module

This Node.js module is designed to facilitate interaction with a MySQL database. The module offers essential features for connection management, query operations, and event tracking.

## Installation

To install this module, run the following command:

```bash
npm install @imehmetgenc/mysql.js
```

## Usage

Utilizing the module involves the following steps:

1. **Import the Module:**

```javascript
const { Mysql } = require("@imehmetgenc/mysql.js");

const mysql = new Mysql({
  host: "localhost",
  user: "your_user",
  password: "your_password",
  database: "your_database",
});

//Event Usage
mysql.on("ready", (db) => {
  console.log("I'm ready");
});
mysql.on("error", (error) => {
  console.log("Mysql Error: ", error);
});
mysql.on("disconnected", (db) => {
  console.log("Mysql disconnected.");
});
```

2. **Executing Queries:**

```javascript
// Query execution example
mysql.query("SELECT * FROM users WHERE id = ?", [1])
.then((result) => {
console.log("Query Results:", result);
})
.catch((error) => {
console.error("Query Error:", error);
});
```

3. **Basic MySQL Operations:**

```javascript
// Insert a new user
const newUser = { username: "mehmet", email: "mehmet@muzik.red" };
mysql.insert("users", newUser)
  .then((result) => {
    console.log("Insert Result:", result);
  })
  .catch((error) => {
    console.error("Error:", error);
  });

// Select a user from the database
mysql.selectOne("users", "*", "id = 1")
  .then((result) => {
    console.log("User:", result);
  })
  .catch((error) => {
    console.error("Error:", error);
  });

// Select all data from a table
mysql.selectAll("user", "*")
  .then((result) => {
    console.log("All Users:", result);
  })
  .catch((error) => {
    console.error("Error:", error);
  });

// Update data in a table
const updatedData = { name: "Mehmet Genç" };
mysql.update("users", updatedData, "id = 1")
  .then((result) => {
    console.log("Update Result:", result);
  })
  .catch((error) => {
    console.error("Error:", error);
  });

// Remove data from a table
mysql.remove("users", "id = 1")
  .then((result) => {
    console.log("Removal Result:", result);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
```

4. **Closing the Connection Pool:**

```javascript
mysql.destroy();
```

These examples demonstrate how to use this module to interact with a MySQL database.

## Lisans

This project is licensed under the MIT license. For more information, please refer to the [LICENSE file](LICENSE) .
