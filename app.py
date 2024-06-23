import os
import cv2
import numpy as np
import matplotlib.pyplot as plt
import tensorflow as tf
from flask import Flask, request, jsonify, render_template

app = Flask(__name__)

model = tf.keras.models.load_model('numberguesserModel.keras')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/process_image', methods=['POST'])
def recive_image():
    try:
        image_data = request.files['file'].read()
        nparr = np.frombuffer(image_data, np.uint8)
        image = cv2.imdecode(nparr, cv2.IMREAD_GRAYSCALE) 

        resultNumber = process_image(image)
        return jsonify({'result': int(resultNumber)})
    
    except Exception as e:
        return jsonify({'error': str(e)})

def process_image(image):

    img = np.invert(image)
    img = img.reshape(1, 28, 28, 1)

    prediction = model.predict(img)
    return np.argmax(prediction)

if __name__ == '__main__':
    app.run(debug=True)
