const mysql = require("mysql2");
const EventEmitter = require("events");

class MysqlClient extends EventEmitter {
  constructor(options) {
    super();
    this._events = {
      Ready: "ready",
      Disconnected: "disconnected",
      Error: "error",
    };
    this._eventsCount = 3;
    this._config = {
      host: options.host,
      user: options.user,
      password: options.password,
      database: options.database,
      waitForConnections: true,
      debug: false,
      charset: options.charset ?? "UTF8MB4_TURKISH_CI",
      connectionLimit: 30,
    };

    try {
      this.pool = mysql.createPool(this._config);
      this.pool.getConnection((err, connection) => {});
    } catch (error) {
      this.emit("error", error);
    }

    this.readyCount = 0;
    this.pool.on("connection", (mysql) => {
        if (this.readyCount == 0) {
          this.emit("ready", mysql);
          this.readyCount++
        }
    });

    this.pool.on("error", (error) => {
        this.emit("error", error);
      });

    this.pool.on("end", (mysql) => {
      this.emit("disconnected", mysql);
      this.readyCount--;
    });
  }

  async select(table, columns, condition) {
    const query = `SELECT ${columns} FROM ${table} WHERE ${condition}`;
    const result = await this.query(query);
    return result;
  }

  async selectAll(table, columns) {
    const query = `SELECT ${columns} FROM ${table}`;
    const result = await this.query(query);
    return result;
  }

  async selectOne(table, columns, condition) {
    const result = await this.select(table, columns, condition);
    if (Array.isArray(result) && result.length > 0) {
      return result[0];
    } else {
      return null;
    }
  }

  async insert(table, data) {
    const query = `INSERT INTO ${table} SET ?`;
    const result = await this.query(query, data);
    return result;
  }

  async update(table, data, condition) {
    const query = `UPDATE ${table} SET ? WHERE ${condition}`;
    const result = await this.query(query, data);
    return result;
  }

  async remove(table, condition) {
    const query = `DELETE FROM ${table} WHERE ${condition}`;
    const result = await this.query(query);
    return result;
  }
  
  async query(sql, values) {
    return new Promise((resolve, reject) => {
      this.pool.getConnection((err, connection) => {
        if (err) {
          reject(err);
          return;
        }
        connection.query(sql, values, (error, results) => {
          connection.release();
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        });
      });
    });
  }

  destroy() {
    this.pool.end();
  }
}

module.exports = {
  Mysql: MysqlClient,
};
