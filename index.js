const router = require('express').Router();
const { exportToExcel } = require('./controller');

router.get('/export', exportToExcel);
module.exports = router;

