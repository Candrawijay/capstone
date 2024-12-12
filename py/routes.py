# routes/predict_route.py
from flask import Blueprint
from controller import predict

# Membuat Blueprint untuk route predict
predict_bp = Blueprint('predict', __name__)

# Menambahkan route /predict ke blueprint
@predict_bp.route('/predict', methods=['POST'])
def predict_route():
    return predict()
