from flask import Flask, request, render_template;
from stories import Story, story;

app = Flask(__name__);

# to persist stories, just store it into a file for now and 
#   check for the file when the application starts with a 'try/finally' or 'with'

# example story fetched from the database
appStory = story;

@app.route('/', methods=['GET'])
def homeView():
    return render_template('madlibs.html', prompts=appStory.prompts);

@app.route('/story', methods=['POST'])
def storyView():
    return render_template('story.html', generatedStory=appStory.generate(request.form));
