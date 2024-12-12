import tensorflow as tf
import os

_model = None

# Path ke Google Cloud Storage atau lokal
MODEL_PATH = "https://storage.googleapis.com/backstone/bismillah_modelfix.h5"

def get_model():
    global _model
    if _model is None:
        try:
            print("Loading model from", MODEL_PATH)
            _model = tf.keras.models.load_model(MODEL_PATH)
            print("Model loaded successfully.")
        except Exception as e:
            print(f"Failed to load model: {e}")
            raise e
    return _model
