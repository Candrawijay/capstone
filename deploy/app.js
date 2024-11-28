const http = require('http');
const tf = require('@tensorflow/tfjs-node');

// Variabel global untuk model
let model;

// Fungsi untuk memuat model dari Google Cloud Storage
const loadModel = async () => {
  try {
    const bucketUrl = 'gs://my-model-bucket/mymodel.h5'; // Ubah sesuai bucket 
    model = await tf.loadLayersModel(bucketUrl);
    console.log('Model berhasil dimuat dari bucket');
  } catch (error) {
    console.error('Gagal memuat model:', error);
  }
};
loadModel();

// Fungsi untuk menangani prediksi
const handlePrediction = async (req, res, body) => {
  try {
    const requestData = JSON.parse(body);

    // Validasi input
    if (!requestData.input || !Array.isArray(requestData.input)) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Data input tidak valid' }));
      return;
    }

    // Ubah input ke tensor
    const inputTensor = tf.tensor2d([requestData.input]);

    // Lakukan prediksi
    const prediction = model.predict(inputTensor);
    const predictionArray = prediction.arraySync();

    // Kirim hasil prediksi
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ prediction: predictionArray }));
  } catch (error) {
    console.error('Error saat prediksi:', error);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Terjadi kesalahan saat memproses prediksi' }));
  }
};

// Buat server HTTP
const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/predict') {
    let body = '';

    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', () => {
      handlePrediction(req, res, body);
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Endpoint tidak ditemukan' }));
  }
});

// Gunakan port 3000
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
