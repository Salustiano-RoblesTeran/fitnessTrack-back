const express = require("express");

//DB
const { dbConnection } = require("../database/config");

class Server {
  constructor() {
    this.app = express();

    //Puerto
    this.port = process.env.PORT;


    //DB
    this.conectarDB();

  }

  //Base de datos
  async conectarDB() {
    await dbConnection();
  }


  listen() {
    this.app.listen(this.port, () => {
      console.log("Server Online", this.port);
    });
  }
}

module.exports = Server;
