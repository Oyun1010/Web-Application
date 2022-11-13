let words = ["word", "program", "javascript", "application", "hello", "world"];
let correctCount = 0;
function randomNumber(length) {
    return  Math.floor(Math.random() * length);
} 

function listIndexRan(wordlength, n) {
    let hintIndex = [];
    for(let i = 0; i < n; i++ ) {
        hintIndex[i] =  randomNumber(wordlength);
    }
    for(let i = 0; i < hintIndex.length; i++) {
        if(hintIndex[i] == hintIndex[i + 1]) {
            hintIndex[i] = randomNumber(wordlength);
        }
    }
    return hintIndex;
}

function randomWordIndex(guessWord) {
    if(guessWord.length <= 5) {
        return listIndexRan(guessWord.length, 2);        
    }
    else if(guessWord.length > 5 && guessWord.length  <= 8) {
       return listIndexRan(guessWord.length, 3);
    }
    else if(guessWord.length >= 9) {
        return listIndexRan(guessWord.length, 4);
    }
}

function randomWord() {
    let wordIndex = Math.floor(Math.random() * words.length);   
    let guessWord = ""; 
    for(let i = 0; i < words.length; i++) {
       if(words[i] == words[wordIndex]) {
           guessWord = words[i];
           break;
       }
   }
   return guessWord;
}

function correctLetters(count) {
    for(let i = 0; i < 5; i++) {
        console.log("wrong count " + count);
        let circle = document.createElement("div");
        if(i >= 5 - count) {
            circle.setAttribute("class", "remLife");
        }
        else {
            circle.setAttribute("class", "toLife");
        }
        document.getElementById("vit").appendChild(circle);   
    }
}

function correctAnswer(corCount) {
    document.getElementById("correctCount").innerHTML = "5 - " + corCount;
    guessGame.innerHTML = "";
    document.getElementById("container").innerHTML = "";
    document.getElementById("vit").innerHTML = "";
    if(corCount == 5) {
        window.location.href = "winner.html";
    } 
    else {        
      body();
    }    
}

function body() {
    let guessGame = document.createElement("div");
    guessGame.setAttribute("id", "guessGame");   
   
    let wrongCount = 5;
   
    let correctLetter = 0;
    let press = 0;
    let guessWord = randomWord().toLowerCase();
    let hintIndex = randomWordIndex(guessWord);
    let inputCount = hintIndex.length;
    console.log("guessWord " + guessWord);
    let pressedKeys = [];
 
    for(let i = 0 ; i < guessWord.length; i++) {
        let cell = document.createElement("input");   
          
        for(let j = 0; j < hintIndex.length; j++) {
            if(i == hintIndex[j]) {  
                cell.setAttribute("class", "hint"); 
                cell.textContent = guessWord[i];
                cell.value = guessWord[i];
                console.log("content "  + cell.textContent);
                cell.disabled = true;
                cell.value = guessWord[i];
            }
        }
    
        if(cell.textContent == "") {
            cell.setAttribute("class", "inputText");  
            cell.maxLength = 1;
            cell.addEventListener("keydown", checkKeyPress);
            function checkKeyPress(e) {
                console.log("space " + e.key);
                if(e.key != "Backspace" && e.key != "CapsLock" && e.key != "Tab") {
                    cell.textContent = e.key;
                    cell.value = e.key;
                    
                    console.log("cell textContent " + cell.textContent);
                    console.log("i " + i + " " + guessWord[i]);
                    if(guessWord[i] == cell.textContent.toLowerCase()) {
                        press++;
                        cell.setAttribute("class", "ok");
                        cell.style.borderColor = "green";   
                        cell.disabled = true;
                        cell.value = e.key;
                        if(press == 1) {
                            inputCount++;
                            press = 0; 
                            console.log("ok")
                        }                    
                        console.log("input Count " + inputCount);
                    }
                    else {
                        pressedKeys.push(e.key);
                        cell.style.borderColor = "red"; 
                        if(pressedKeys[pressedKeys.length - 2] == e.key) {

                        }
                        else {
                            wrongCount--;
                        }      
                        document.getElementById("vit").innerHTML = "";
                        correctLetters(wrongCount);
                    }
                    if(wrongCount == 0) {                
                        window.location.href = "game_over.html";
                    }  
                 
                    if(inputCount == guessWord.length) {                    
                        for(let k = 0; k < guessWord.length; k++) {                           
                            if(cell.textContent.toLowerCase() == guessWord[i]) {
                                 correctLetter++;                            
                            }
                        }
                        console.log("correct letter count : " + correctLetter);
                        setTimeout(() => {
                            if(correctLetter == guessWord.length) {
                                correctCount++;
                                correctAnswer(correctCount);
                            }   
                        }, 500);
                                    
                    }
                    console.log("guessWord " + guessWord.length);
                    console.log("visible index " + hintIndex.length);          
                }
                else if(e.key == "Backspace") {                    
                    if(guessWord[i] == cell.textContent.toLowerCase()) {
                       cell.textContent = "";
                       inputCount--;
                       console.log("input Count " + inputCount);
                    }
                }     
      
            }     
        }      
        guessGame.appendChild(cell);
    }
    correctLetters(wrongCount);
    document.getElementById("container").appendChild(guessGame);
}

body();





