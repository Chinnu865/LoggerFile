const { DataTypes } = require('sequelize');
const ExcelJS = require('exceljs');
const Sequelize = require('sequelize');
const { parentPort } = require('worker_threads');

const connection = new Sequelize('conversion', 'root', 'abcd@123', {
  dialect: 'mysql',
  logging: false
});

const User = connection.define('user', {
  name: {
    type: DataTypes.STRING,
  },
  phone: {
    type: DataTypes.STRING
  }
}, {
  freezeTableName: true
});

async function exportDataToExcel(chunks) {
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet(`My_Sheet`);

  const chunkSize = chunks[0];
  const totalCount = await User.count();
  let offset = 0;
  let remainingCount = totalCount;

  while (remainingCount > 0) {
    const data = await User.findAll({
      offset,
      limit: chunkSize
    });

    const jsonData = data.map(user => user.dataValues);

    if (offset === 0) {
      const headerRow = Object.keys(jsonData[0]);
      sheet.addRow(headerRow);
    }

    jsonData.forEach((item) => {
      sheet.addRow(Object.values(item));
    });

    await workbook.xlsx.writeFile(`./excel/data.xlsx`);
    remainingCount -= jsonData.length;
    offset += chunkSize;

    const progress = Math.round((offset / totalCount) * 100);
    parentPort.postMessage({ progress });
  }

  parentPort.postMessage({ done: true });
}

connection.sync({ alter: true })
  .then(() => {
    parentPort.on('message', (msg) => {
      if (msg.cmd && msg.cmd === 'start') {
        exportDataToExcel(msg.chunks);
      }
    });
  });
