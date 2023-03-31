const { exportDataToExcel } = require('./service');
const { userLogger, userErrorLogger } = require('./logger');

async function exportToExcel(req, res) {
  // throw 'error'
  try {
    const result = await exportDataToExcel(500);
    res.send(result);
    userLogger.log('info','Successfully converted to excel');
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while exporting data to Excel!');
    userErrorLogger.log('error','Cannot be converted');
  }
}

module.exports = { exportToExcel };
