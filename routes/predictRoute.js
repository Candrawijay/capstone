// routes/predictRoute.js
'use strict';

const predictController = require('../controllers/predictController');  // Pastikan path ini sesuai

// Menambahkan console.log untuk debugging
console.log('Registering /predict route...');

module.exports = {
  method: 'POST',
  path: '/predict',  // Rute yang akan diakses
  handler: predictController.predict  // Handler untuk prediksi
};
