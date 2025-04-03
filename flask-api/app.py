from flask import Flask, request, jsonify
import joblib
import pandas as pd
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/predict": {"origins": ["http://localhost:5173", "https://laptop-price-prediction-mern.vercel.app"]}})

# Load trained model and preprocessing tools
model = joblib.load('laptop_price_model.pkl')

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get user input
        data = request.get_json()
        df = pd.DataFrame([data])  # Convert JSON input to DataFrame

        # Manually add missing features
        df['spec_rating'] = 75.0  
        df['ppi'] = 150  
        df['ROM_type'] = "SSD"
        df['Ram_type'] = "DDR4"
        df['warranty'] = 1

        # Ensure correct column order
        expected_cols = ['brand', 'processor', 'CPU', 'Ram_type', 'ROM_type', 'GPU', 'OS', 
                         'Ram', 'ROM', 'warranty', 'spec_rating', 'ppi']
        df = df[expected_cols]

        # Use the saved pipeline to transform + predict in one step
        prediction = model.predict(df)
        
        return jsonify({'predicted_price': float(prediction[0])})
    
    except Exception as e:
        return jsonify({'error': str(e)}), 400