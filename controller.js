const { exportDataToExcel } = require('./service');
const logger = require('./logger');

async function exportToExcel(req, res) {
  try {
    const result = await exportDataToExcel(500);
    res.send(result);
    logger.userLogger.log('info','Successfully converted');
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while exporting data to Excel!');
    logger.userLogger.log('error','Cannot be converted');
  }
}

module.exports = { exportToExcel };
