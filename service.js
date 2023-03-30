const ExcelJS = require('exceljs');
const { User } = require('./model');

async function exportDataToExcel(chunkSize) {
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet(`My_Sheet`);

  const totalCount = await User.count();
  let offset = 0;
  let remainingCount = totalCount;

  while (remainingCount > 0) {
    const data = await User.findAll({
      offset,
      limit: chunkSize
    });

    const jsonData = data.map(user => user.toJSON());

    if (offset === 0) {
      const headerRow = Object.keys(jsonData[0]);
      sheet.addRow(headerRow);
    }

    jsonData.forEach((item) => {
      sheet.addRow(Object.values(item));
    });

    await workbook.xlsx.writeFile(`./excel/data.xlsx`);
    remainingCount -= jsonData.length;
    offset += jsonData.length;
  }

  return 'Data exported to Excel successfully!';
}

module.exports = { exportDataToExcel };
