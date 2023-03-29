const Sequelize = require('sequelize');
const { DataTypes } = require('sequelize');
const fs = require('fs');
const fastcsv = require('fast-csv');

const connection = new Sequelize('conversion', 'root', 'abcd@123', {
    dialect: 'mysql',
    logging: false
})

const User = connection.define('user', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING,
        allowNull:false
    }
},{
    freezeTableName:true
});

const fs = require("fs");
const ws = fs.createWriteStream("output.csv");

app.get("/exportcsv", async (req, res) => {

    let offset = 0;
    let chunkSize = 500;
    const data = await User.findAll({
        offset,
        limit: chunkSize
      });
  
      const jsonData = data.map(user => user.dataValues);
      console.log("jsonData", jsonData);

      //csv
      fastcsv
        .write(jsonData, { headers: true })
        .on("finish", function () {
          console.log("Write to output.csv successfully!");
        })
        .pipe(ws);
});
