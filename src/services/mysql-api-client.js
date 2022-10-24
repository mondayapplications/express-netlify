const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "http://lior-kedem.com",
  user: "kedem_fbm",
  password: "slaslamjam77",
  database: "kedem_fbm",
});

class MySqlApiClient {
  static async getVersions() {
    connection.connect();

    connection.query(
      "SELECT * FROM VERSIONS ORDER BY VCODE ASC",
      function (error, results, fields) {
        if (error) throw error;
        console.log("The solution is: ", results[0].solution);
      }
    );

    connection.end();
  }
}

module.exports = MySqlApiClient;
