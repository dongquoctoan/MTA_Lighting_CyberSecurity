
from flask import Flask, request
import xmltodict
from Model.prediction import predict,makeTokens

import Model.prediction

app = Flask(__name__)

@app.route('/extension', methods=['POST'])
def receive_xml():
    x = request.args.get('url')
    print(x)
    if predict(x) == 0:
        return "SAFE"
    if predict(x) == 1:
        return "PHISHING"

if __name__ == '__main__':
    app.run()
