
async function getResource(){

    const urlPrefixTextBox = document.getElementById('input_enterURL');
    const urlPrefix = urlPrefixTextBox.value;
    const queryTextBoxKey = document.getElementById('input_queryString-key');
    const queryKey = queryTextBoxKey.value;
    const queryTextBoxVal = document.getElementById('input_queryString-val');
    const queryVal = queryTextBoxVal.value;

    let queryParams = {}
    queryParams[queryKey] = queryVal;

    console.log(urlPrefix);
    console.log(queryParams);

    //const APIresponse = await axios.get(urlPrefix, queryParams);
    const APIresponse = await axios.post(urlPrefix, queryParams);
    console.log(APIresponse);


}

function load(){
    document.getElementById('button_submit').addEventListener('click', getResource);
}

document.addEventListener('DOMContentLoaded',load);