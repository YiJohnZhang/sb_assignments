async function getGiphyImage(){

    const apiQuery = document.getElementById('inputText_searchGiphy').value;
    const requestURL = `https://api.giphy.com/v1/gifs/search?q=${apiQuery}&api_key=MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym`;
    const giphyAPIResponse = await axios.get(requestURL);
    
    //const parsedGiphyAPIResponse = JSON.parse(giphyAPIResponse);
    console.log(giphyAPIResponse);  //it is already parsed
    const randomImageNumber = Math.round(giphyAPIResponse.data.pagination.count*Math.random());

    try{

        //const giphyAPIResponse = await axios.get('https://api.giphy.com/v1/gifs/search/', {'q':apiQuery,'api_key':'MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym'});
        //for some reason inside try-catch doesn't work.

    }catch(err){

    }
    
    const newGIFElement = document.createElement('img');
    newGIFElement.src = giphyAPIResponse.data.data[randomImageNumber].images.downsized.url;  //.url is the incorrect property
    newGIFElement.id = giphyAPIResponse.data.data[randomImageNumber].id;
    newGIFElement.setAttribute('alt',giphyAPIResponse.data.data[randomImageNumber].title);
    
    const gifContainer = document.getElementById('div_gifContainer');   //30 min debugging and this is mispelt to 'div_giftContainer' ._.
    gifContainer.appendChild(newGIFElement);

}

function removeGIFChildren(){
    const gifContainer = document.getElementById('div_gifContainer');
    while(gifContainer.firstChild)
        gifContainer.removeChild(gifContainer.firstChild);
}

console.log("Let's get this party started!");

document.getElementById('button_searchGiphy').addEventListener('click',getGiphyImage);
document.getElementById('button_removeImages').addEventListener('click',removeGIFChildren);