/**
 * 1. Initialize an XMLHttpRequest constructor
 * 2. Open a GET request, set the headers and response type
 * 3. Output successful response
 * 4. Output error state
 * 5. Combine with an event listener (button)
 * 6. Adjust UI states accordingly
 * 7. Bonus: change button CTA to indicate if it's the first joke or a "next" one
 */

const API_ENDPOINT = 'https://icanhazdadjoke.com/';
const xhml = new XMLHttpRequest();
const setButtonSelector = document.getElementById('button')
    
function showJoke(joke) {
    setButtonState(false);
    setLoadingPage(false);
        document.querySelector('#joke').innerHTML = joke;
    }
function showError(error) {
    setButtonState(false);
    setLoadingPage(false);
        document.querySelector('#error-message').innerHTML = error;
        document.getElementById('error-container').style.display = 'block';

    } 
function setLoadingPage(isVisible) {
    const stateOfPage = isVisible ? 'block' : 'none'
    document.getElementById('loader').style.display = stateOfPage;
}
function setButtonState(isDisabled) {
    if (isDisabled){
    setButtonSelector.getAttribute('disabled', 'disabled');
    } else {
    setButtonSelector.removeAttribute('disabled');
    }

    const buttonDisplayText = isDisabled ? 'none' : 'block';
      document.getElementById('cta').style.display = buttonDisplayText
}   

function setButtonCta(isError){
    const buttonCta = isError ? 'Try Again' : 'Get another one';
    buttonDisplayText.innerHTML = buttonCta;
}

function getJoke() {
    xhml.open('GET', API_ENDPOINT);

    xhml.setRequestHeader('Accept', 'application/json');
    xhml.responseType = 'json';
    
    xhml.onload = function() {
        showJoke( xhml.response.joke);
        setButtonCta(false);
    }

    xhml.onerror = function() {
        showError('An error occurred');
        setButtonCta(true);
    }

    xhml.send();
}
document.getElementById('button').addEventListener('click', function(){
    setButtonState(true);
    
    setLoadingPage(true);
    getJoke();
})  