// categories is the main data structure for the app; it looks like this:

//  [
//    { title: "Math",
//      clues: [
//        {question: "2+2", answer: 4, showing: null},
//        {question: "1+1", answer: 2, showing: null}
//        ...
//      ],
//    },
//    { title: "Literature",
//      clues: [
//        {question: "Hamlet Author", answer: "Shakespeare", showing: null},
//        {question: "Bell Jar Author", answer: "Plath", showing: null},
//        ...
//      ],
//    },
//    ...
//  ]

let categoryTable = [];
let CATEGORYCOUNT = 6;  //ease of future refactoring, how many categories on this jeopardy board. CATEGORYCOUNT<=RANDOMCATEGORIESTOSELECT.
let RANDOMCATEGORIESTOSELECT = 10;  //ease of future reactoring, for selecting the number of random categories; RANDOMCATEGORIESTOSELECT>=CATEGORYCOUNT.

function randomSelectorHandler(datasetToHandle, subSelector, selectionCount, selectionPool){

    if(selectionCount > selectionPool){
        return new Error('Number of elements in selection pool must be larger than the number of elements to select.');
    }

    const selectedCategoriesIDs = new Set();
    while(selectedCategoriesIDs.size < selectionCount){
        const randomIndex = Math.round(Math.random()*(selectionPool-1));
        selectedCategoriesIDs.add(datasetToHandle[randomIndex][subSelector]);
    }

    return [...selectedCategoriesIDs];

}

/** Get NUM_CATEGORIES random category from API.
 *
 * Returns array of category ids
 */
async function getCategoryIDs() {

    const randomCategories = await axios.get('https://jservice.io/api/categories',{params:{'count':RANDOMCATEGORIESTOSELECT}});

    //const selectedCategoriesIDs = [];
    // for(let i=0;i<CATEGORYCOUNT;i++){    

    //     let randomCategoryIndex = Math.round(Math.random()*RANDOMCATEGORIESTOSELECT);
    //     //console.log(randomCategories.data[randomCategoryIndex].id);
         
    //     if(i){
    //         for(categoryID of selectedCategoriesIDs){   //make sure that there is no repeat ID amogus selectedCategoriesIDs.
                
    //             while(categoryID == randomCategories.data[randomCategoryIndex].id){
    //                 randomCategoryIndex = Math.round(Math.random()*RANDOMCATEGORIESTOSELECT);
    //             }
    //         }
    //     }
        
    //     selectedCategoriesIDs.push(randomCategories.data[randomCategoryIndex].id);

    // }


    // created a general random category selector
    return randomSelectorHandler(randomCategories.data, 'id', CATEGORYCOUNT, RANDOMCATEGORIESTOSELECT);

}

/** Return object with data about a category:
 *
 *  Returns { title: "Math", clues: clue-array }
 *
 * Where clue-array is:
 *   [
 *      {question: "Hamlet Author", answer: "Shakespeare", showing: null},
 *      {question: "Bell Jar Author", answer: "Plath", showing: null},
 *      ...
 *   ]
 */
async function getCategoryData() {
    
    const clueTable = []; //[{title:selectedTitle, selectedClues:cluesArray}]
    let cluesArray = []; //[[//5 questions from category 1],...,[//5 questions from category 6]]
    
    const selectedCategoriesIDs = await getCategoryIDs();
    for(selectedCategoryID of selectedCategoriesIDs){

        cluesArray = [];

        const categoryQuestionResponse = await axios.get('https://jservice.io/api/category',{params:{'id':selectedCategoryID}});
        
        //if there are more than 5 to choose from, randomly select 5 non-repeating questions
        //this is because Jeopardy value assignment system is inconsistent, i.e. 100-500, increment 100; or 200 - 1000, incrmement 200
        //moreover in the jservice.io API, popular/109 (State Capitals), some questions are duplicated in the API
        if(categoryQuestionResponse.data.clues_count > 5){

            const randomlySelectedClues = randomSelectorHandler(categoryQuestionResponse.data.clues, 'id', 5, categoryQuestionResponse.data.clues_count);

            let randomClue;
            while(randomlySelectedClues.length){
            
                randomClue = randomlySelectedClues.pop();
                let {question, answer} = categoryQuestionResponse.data.clues.find((element) => element.id == randomClue);
                cluesArray.push({question,answer,'showing':false});
            
            }

        }else{

            for(clue of categoryQuestionResponse.data.clues){
            
                cluesArray.push({'question':clue.question,'answer':clue.answer, 'showing':false});
        
            }

        }

        clueTable.push({'title':categoryQuestionResponse.data.title,'clues':cluesArray});

    }

    //console.log(clueTable);
    return clueTable;

}

/** Fill the HTML table#jeopardy with the categories & cells for questions.
 *
 * - The <thead> should be filled w/a <tr>, and a <td> for each category
 * - The <tbody> should be filled w/NUM_QUESTIONS_PER_CAT <tr>s,
 *   each with a question for each category in a <td>
 *   (initally, just show a "?" where the question/answer would go.)
 */
async function fillTable() {

    //{'title':randomCategories.data[randomCategoryIndex].id}
    let tableHeaderInnerHTML = '<thead><tr>';
    
    const clueTable = await getCategoryData();
    categoryTable = clueTable;      //handleClick needs to be able to have this variable

    for (category of clueTable){

        tableHeaderInnerHTML = tableHeaderInnerHTML + `<th>${category.title}</th>`; 
        
    }
        
    tableHeaderInnerHTML = tableHeaderInnerHTML + '</tr></thead>';

    let temporaryTableRowsInnerHTML = '';
    for(let row=0; row<5; row++){

        let temporaryTableRowInnerHTML = '<tr>';

        for(let column = 0; column<CATEGORYCOUNT; column++){

            temporaryTableRowInnerHTML = temporaryTableRowInnerHTML + `<td id=\"${row}-${column}\">?</td>`

        }
        temporaryTableRowsInnerHTML += temporaryTableRowInnerHTML + '</tr>';
    }

    let $jeopardyTable = $(`<table>${tableHeaderInnerHTML+temporaryTableRowsInnerHTML}</table>`);
    $jeopardyTable.
        attr('id','jeopardyTable').
        on('click', 'td', handleClick);  //event delegation

    $(document.body).prepend($jeopardyTable);

}

/** Handle clicking on a clue: show the question or answer.
 *
 * Uses .showing property on clue to determine what to show:
 * - if currently null, show question & set .showing to "question"
 * - if currently "question", show answer & set .showing to "answer"
 * - if currently "answer", ignore click
 * */
function handleClick() {

    const $clickedElement = $(this);
    const clickedElementID = $clickedElement.attr('id');

    const [selectedRow, selectedColumn] = clickedElementID.split('-');
    const selectedQuestion = categoryTable[selectedColumn].clues[selectedRow];

    if(!selectedQuestion.showing){

        if($clickedElement.text() === '?'){

            $clickedElement.text(selectedQuestion.question);

        }else{

            selectedQuestion.showing = true;
            $clickedElement.
                css('backgroundColor','#28a200').
                text(selectedQuestion.answer);

        }

    }

}


/** Start game:
 *
 * - get random category Ids
 * - get data for each category
 * - create HTML table
 * */
async function setupAndStart(evt) {
    
    evt.preventDefault();

    try{

        $('#jeopardyTable').remove();

    }catch(error){}

    fillTable();
}

/** On click of start / restart button, set up game. */

$(document).ready(function(){

    fillTable();

    let $restartButton = $('<button id="button_restartGame">Restart Game</button>');
    $restartButton.on('click', setupAndStart);

    $(document.body).append($restartButton);

})