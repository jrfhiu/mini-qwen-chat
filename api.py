from flask import Flask, request, jsonify
import requests
from dotenv import load_dotenv
import os

load_dotenv()
app = Flask(__name__)

HF_TOKEN = os.getenv("HF_TOKEN")
MODEL_API = "https://api-inference.huggingface.co/models/wschdth/mini_qwen_1b"

@app.route("/chat", methods=["POST"])
def chat():
    msg = request.json.get("message")
    res = requests.post(
        MODEL_API,
        headers={"Authorization": f"Bearer {HF_TOKEN}"},
        json={"inputs": msg}
    )
    return jsonify(res.json())

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000)
