import tensorflow as tf
from flask import request, jsonify
from service import get_model

def predict():
    try:
        # Ambil input data dari payload
        input_data = request.get_json()

        # Validasi input - pastikan data numerik
        if not isinstance(input_data.get('feature1'), (int, float)) or not isinstance(input_data.get('feature2'), (int, float)):
            return jsonify({"error": "Both feature1 and feature2 should be numbers"}), 400

        # Load model dari Google Cloud Storage
        model = get_model()

        # Siapkan tensor input dengan shape yang sesuai
        input_tensor = tf.constant([[input_data['feature1'], input_data['feature2']]], dtype=tf.float32)

        # Prediksi menggunakan model
        prediction = model(input_tensor)
        result = prediction.numpy()[0][0]

        # Mengkategorikan hasil prediksi ke dalam tiga kategori
        if result < 3:
            category = 'low'
        elif 3 <= result < 5:
            category = 'medium'
        else:
            category = 'high'

        return jsonify({"prediction": result, "category": category}), 200
    except Exception as e:
        print(f"Error during prediction: {e}")
        return jsonify({"error": "Prediction failed"}), 500
