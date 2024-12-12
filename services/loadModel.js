// services/loadModel.js
'use strict';

const tf = require('@tensorflow/tfjs-node');

let model;

const loadModel = async () => {
  if (!model) {
    model = await tf.loadLayersModel('https://storage.googleapis.com/bucket-capstone-project/model.json');
  }
  return model;
};

module.exports = {
  getModel: loadModel
};
