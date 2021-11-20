# Put your app in here.
from flask import Flask, request;
from operations import *;

app = Flask(__name__);

@app.route('/add', methods=['GET'])
def addView():
    return f"{add(int(request.args['a']), int(request.args['b']))}";

@app.route('/sub', methods=['GET'])
def subView():
    return f"{sub(int(request.args['a']), int(request.args['b']))}";

@app.route('/mult', methods=['GET'])
def multView():
    return f"{mult(int(request.args['a']), int(request.args['b']))}";

@app.route('/div', methods=['GET'])
def divView():
    return f"{div(int(request.args['a']), int(request.args['b']))}";
