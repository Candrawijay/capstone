// controllers/predictController.js
'use strict';

const tf = require('@tensorflow/tfjs-node');
const { getModel } = require('../services/loadModel');

exports.predict = async (request, h) => {
  try {
    const inputData = request.payload;

    // Validasi input - pastikan data numerik
    if (typeof inputData.feature1 !== 'number' || typeof inputData.feature2 !== 'number') {
      return h.response({ error: 'Both feature1 and feature2 should be numbers' }).code(400);
    }

    // Load model dari Google Cloud Storage
    const model = await getModel();

    // Siapkan tensor input dengan shape yang sesuai
    const inputTensor = tf.tensor2d([[inputData.feature1, inputData.feature2]], [1, 2]);

    // Prediksi menggunakan model
    const prediction = model.predict(inputTensor);
    const result = prediction.dataSync()[0];

    // Mengkategorikan hasil prediksi ke dalam tiga kategori
    let category;
    if (result < 3) {
      category = 'low';
    } else if (result >= 3 && result < 5) {
      category = 'medium';
    } else {
      category = 'high';
    }

    return h.response({ prediction: result, category }).code(200);
  } catch (error) {
    console.error('Error during prediction:', error);
    return h.response({ error: 'Prediction failed' }).code(500);
  }
};
