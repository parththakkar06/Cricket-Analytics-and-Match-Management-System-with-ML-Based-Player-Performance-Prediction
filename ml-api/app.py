from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np

app = Flask(__name__)
CORS(app)

@app.route("/predict", methods=["POST"])
def predict():
    data = request.json

    avg = data.get("avg_last_5", 0)
    trend = data.get("trend", 0)
    consistency = data.get("consistency", 0)
    max_score = data.get("max_score", 0)

    # 🔥 Better logic
    base = avg * 0.6

    # trend impact (controlled)
    trend_effect = max(min(trend * 0.3, 10), -10)

    # consistency penalty (not too harsh)
    consistency_penalty = consistency * 0.15

    # ceiling control
    ceiling = max_score * 0.2

    prediction = base + trend_effect + ceiling - consistency_penalty

    prediction = max(0, round(prediction))

    return jsonify({
        "predicted_runs": prediction
    })

if __name__ == "__main__":
    app.run(debug=True)