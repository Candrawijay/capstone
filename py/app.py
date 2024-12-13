# app.py
from flask import Flask, request, jsonify
from routes import predict_bp

app = Flask(__name__)

# Menambahkan route predict ke aplikasi
app.register_blueprint(predict_bp)

@app.route('/')
def home():
    return jsonify({"message": "Server is running"})

if __name__ == '__main__':
    try:
        app.run(host='0.0.0.0', port=8080, debug=True)
    except Exception as e:
        print(f"Error: {e}")
