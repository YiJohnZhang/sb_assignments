from flask import Flask, request, render_template, redirect, flash;
app = Flask(__name__);

#from flask_debugtoolbar import DebugToolbarExtension
app.config['SECRET_KEY']='asfdaklsjdfKey';
#toolbar = DebugToolbarExtension(app);


# pretend database load
from surveys import surveys;

# pretend database storage
responses = [];

responseBreakpoints = [];   # store breakpoints for expected questions answered
surveyList = [survey for survey in surveys.values()];

for survey in surveyList:

    surveyQuestionCount = 0;

    for question in survey.questions:
        surveyQuestionCount += 1;

        if question.allow_text:
            surveyQuestionCount += 1;

    if responseBreakpoints:
        responseBreakpoints.append(responseBreakpoints[len(responseBreakpoints)-1]+surveyQuestionCount);

    else:
        responseBreakpoints.append(surveyQuestionCount);

print(responseBreakpoints);

@app.route('/')
def homeView():
    ''' Redirect to first question page '''
    return redirect('/questions/0');

@app.route('/questions/<int:questionID>', methods=['GET'])
def questionsView(questionID):
    ''' Questions View Function '''
    # Handling Attempts for Unintended Behaviors
    if questionID > len(surveyList) and (responseBreakpoints[len(responseBreakpoints)-1] > len(responses)):
        # redirect if the user tries to access a non-existent page without completing survey
        flash('page out of bounds', 'naughty');
        return redirect(f'/questions/{len(surveyList)-1}');
#    print(f'questionID: {questionID} and len(surveyList): {len(surveyList)}');
#    print(f'responseLenght:{responseBreakpoints[len(responseBreakpoints)-1]}');
#    print(f'len(responses): {len(responses)}');
    if questionID == len(surveyList) and (responseBreakpoints[len(responseBreakpoints)-1] == len(responses)):
        # survey completed
        return redirect('/thankyou');

    if questionID > 0 and (responseBreakpoints[questionID-1] > len(responses)):
        flash('please answer the questions in order', 'naughty');
        for testIndex in range(len(responseBreakpoints)):
            # flash_message
            if responseBreakpoints[testIndex] > len(responses):
                return redirect(f'/questions/{testIndex}');

    # Handling Intended Behaviors
    # Create a 'POST' view function for questions to prevent resubmissions
    return render_template('questions.html',
        surveyObject=surveyList[questionID],
        currentID = questionID, 
        lastSurveyPage = questionID == len(surveyList));   # form: action=get next question ID

@app.route('/questions/<int:questionID>', methods=['POST'])
def questionPOSTView(questionID):
    '''The purpose is to prevent form resubmission'''
    
    postValues = request.form.to_dict(flat=True).values();
    # see werkzeug multidict documentation: 
            #https://werkzeug.palletsprojects.com/en/2.0.x/datastructures/?highlight=to_dict#werkzeug.datastructures.MultiDict.to_dict

    if questionID >= 1 and responseBreakpoints[questionID-1] == len(responses)+len(postValues):
        # abort writing to responses if the latter boolean expression is not true
        for formEntry in postValues:
            responses.append(formEntry);
        print(responses);

    return redirect(f'/questions/{questionID}')

@app.route('/thankyou', methods=['GET'])
def thankyouView():
    return render_template('thankyou.html');