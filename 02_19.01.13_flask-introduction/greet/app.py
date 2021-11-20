from flask import Flask;

app = Flask(__name__);

@app.route('/welcome',methods=['GET'])
def welcomeView():
    return 'welcome';

@app.route('/welcome/home',methods=['GET'])
def welcomeHome():
    return 'welcome home';

@app.route('/welcome/back', methods=['GET'])
def welcomeBack():
    return 'welcome back';

