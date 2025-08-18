document.addEventListener("DOMContentLoaded", function(event) {
    const buttons = document.querySelectorAll(".math-button")
    let display = document.querySelector(".numbers")


    // iterates over number buttons
    buttons.forEach(button => {

        // add listeners to button as it iterates over them
        button.addEventListener("click", () => {
            if(button.value === "c"){
                display.innerHTML =""
            } 
            else if(button.value === "="){
                const text = display.textContent;
                let answer = operation(text);
                display.textContent = answer
            } else if(button.value === "~"){
                display.textContent = display.textContent.slice(0, length-1)
            }
            else{
            display.textContent += `${button.value}`;
            }
        });
    });
});

// basic addition loop
function add(...num){
    let rVal = 0;
    // iterats over array adding to it.
    num.forEach(n => {
        rVal += Number(n);
    })
    return rVal

}

// the functions mostly all work the same from here
function sub(...num){
    let rVal = 0;
    num.forEach(n => {
        if(rVal === 0){
            rVal = Number(n);
        } else {
            rVal -= Number(n);
        }
    })
    return rVal
}

function mul(...num){
    let rVal = 0;
    num.forEach(n => {
        if(rVal === 0){
            rVal = Number(n);
        } else {
            rVal *= Number(n);
        }
    })
    return rVal
}

function div(...num){
    let rVal = 0;
    num.forEach(n => {
        if(rVal === 0){
            rVal = Number(n);
        } else {
            rVal /= Number(n);
        }
    })
    return rVal
}

function exp(...num){
    let rVal = 0;
    num.forEach(n => {
        if(rVal === 0){
            rVal = Number(n);
        } else {
            rVal **= n
        }
    })
    return rVal

}

// this part is still written by ai, will change later
// not sure how to make this mine, so i wont until i'm better.
function par(numArr) {
    while (numArr.includes("(")) {
        let openIndex = -1;

        for (let i = 0; i < numArr.length; i++) {
            if (numArr[i] === "(") openIndex = i;

            if (numArr[i] === ")") {
                let closeIndex = i;

                // get tokens inside parentheses
                let inside = numArr.slice(openIndex + 1, closeIndex);

                // compute the value
                let result = operation(inside.join("")); // join into string for tokenization

                // replace "( ... )" with result
                numArr.splice(openIndex, closeIndex - openIndex + 1, String(result));

                break; // restart loop in case of nested parentheses
            }
        }
    }

    return numArr;
}


function operation(num){
    let numArr = []
    let numStr = ""
    // iterate over length of inputed string
    for(let i = 0; i <= num.length; i++){
        // creates var = to currently iterated member of inputed string
        let char = num[i]
        // create duplicate variable but as a number
        let n = Number(char);
        // checks if var is number or decimal
        // adds to temp string
        if(!isNaN(n) || char === "."){
            // checks if there's already a decimal and removes additional
            if(char === "."){
                if(!numStr.includes(".")){
                    numStr += char
                }
                numStr += ""
            } else {
                numStr += char
            }
        // if a symbol and not a space/undefined, push into the array
        } else if(char !== " " && char !== undefined){
            if (numStr !== ""){
                numArr.push(numStr);
                numStr = "";
            }
            numArr.push(char);
        }
    }
    // if temp not empty push into array
    if(numStr !== "") numArr.push(numStr);

    // run array through par function
    numArr = par(numArr);

    // creates list of symbols for math
    const op = ["^","*","/","+","-"]

    // iterates over the length of operator array
    for(let l = 0; l < op.length; l++){
        // iterates over created number array * the amount of operators
        for(let i = 0; i < numArr.length; i++){
            // checks if array symbol is equal to operator    
            if(numArr[i] === op[l]){
                // sets two variable equal to previous and next char
                let num1 = numArr[i - 1]
                let num2 = numArr[i + 1]

                // empty variable for storage
                let opTemp

                // error handling to avoid 0 division and whatnot.
                const zOp = ["^","*","/"]
                if(num1 === "0" && zOp.includes(op[l])) return "0";

                // if symbol then math
                if(op[l] === "^") opTemp = exp(num1, num2)
                if(op[l] === "*") opTemp = mul(num1, num2)
                if(op[l] === "/") opTemp = div(num1, num2)
                if(op[l] === "+") opTemp = add(num1, num2)
                if(op[l] === "-") opTemp = sub(num1, num2)

                // this last two lines of code were written by and ai, but to change it, i'd have to make it worse.
                // it seems like the best possible method.
                // will revist when i'm not bad.

                // essentially clears numArr before inserting result,
                // of operation into first slot of numArr allowing continuous iteration
                // then resets back one iteration to continue.
                numArr.splice(i - 1, 3, opTemp);
                i--;
            }
        }
    }
    return numArr[0];
}


//UI
    // make a grid of buttons with symbols in them
    // create a dom logic to automatically populate the screen with the inputed numbers
    // and to clear when the c button is pressed
    // make it pretty





// logic
    // first i receive the the number / operator input
    // then i determine the correct function to use based on pemdas
    // for parenthesis, i'll have a seperate function that mirrors the standard operations,
    // but without the parenthesis
    // for exponents it should be rather simple
    // for the rest, i'll need to extract the numbers inputed and then starting form the begining
    // separating the number pairs by the symbol between them into and array i.e 1 + 1 = {1, "+", 1}
    // then determining which function to use by checking the symbol and removing it from the array before
    // plugging the numbers into the function
    // returning the product and chaining the rest of the problem, doing essentially the same thing with different functions.