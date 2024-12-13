const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000; // Gunakan port dari variabel lingkungan atau default ke 3000

let model = null;

// Fungsi untuk memuat model dari Google Cloud Storage
const loadModel = async () => {
  try {
    const response = await axios.get('https://storage.googleapis.com/bucket-capstone-project/model.json');
    model = response.data;
    console.log('Model loaded successfully.');
  } catch (error) {
    console.error('Error loading model:', error);
  }
};

// Panggil fungsi loadModel saat server dimulai
loadModel();

// Middleware untuk parsing JSON
app.use(express.json());

app.post('/predict', (req, res) => {
  const { pH, Temprature, Taste, Odor, Fat, Turbidity, Colour } = req.body;

  if (model === null) {
    return res.status(500).json({ error: 'Model not loaded' });
  }

  // Validasi input
  if (
    typeof pH !== 'number' ||
    typeof Temprature !== 'number' ||
    typeof Taste !== 'number' ||
    typeof Odor !== 'number' ||
    typeof Fat !== 'number' ||
    typeof Turbidity !== 'number' ||
    typeof Colour !== 'number'
  ) {
    return res.status(400).json({ error: 'Invalid input types' });
  }

  // Simulasi prediksi menggunakan model
  // Sesuaikan logika ini dengan model prediksi Anda
  let score = (pH + Temprature + Taste + Odor + Fat + Turbidity + Colour) / 7;

  let prediction;
  if (score <= model.low_threshold) {
    prediction = 'low';
  } else if (score <= model.medium_threshold) {
    prediction = 'medium';
  } else {
    prediction = 'high';
  }

  res.json({ prediction });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
