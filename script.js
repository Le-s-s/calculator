document.addEventListener('DOMContentLoaded', function(event) {
    // dom logic, not sure how many of these i actually need.
    let display = document.querySelector(".display");
    const buttons = document.querySelectorAll(".math-button")
    const opButtons = document.querySelectorAll(".math-button-op")
    const enter = document.querySelector(".math-submit")
    const clear = document.querySelector(".math-clear")

    // could probably just add this to html
    let currentMath = document.createElement("h1");
    display.appendChild(currentMath)
    //

    // when = button is clicked set the 
    // result of the math function as content of specific element
    enter.addEventListener("click", function (){
        const text = currentMath.textContent;
        let answer = operation(text);
        currentMath.textContent = answer
    });

    // simple clear function
    clear.addEventListener("click", function (){
        currentMath.innerHTML =""
    });

    // iterates over number buttons
    buttons.forEach(button => {

        // add listeners to button as it iterates over them
        button.addEventListener('click', () => {

            currentMath.textContent += `${button.value}`;
        });
    });

    opButtons.forEach(button => {

        button.addEventListener('click', () => {

            currentMath.textContent += ` ${button.value} `;
        });
    });
});

// basic addition loop
function add(num){
    num = num.split(" ")
    let rVal = 0;
    // iterats over array adding to it.
    num.forEach(n => {
        rVal += Number(n);
    })
    return rVal

}

// the functions mostly all work the same from here
function sub(num){
    num = num.split(" ")
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

function mul(num){
    num = num.split(" ")
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

function div(num){
    num = num.split(" ")
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

function exp(num){
    num = num.split(" ")
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

// i will admit this was written by and ai
// and will stay written by an ai until i have more time.
function par(num) {
    // loops until all para's are gone
    while (num.includes("(")) {
        // find location of first (
        let openIndex = -1;
        //iterate over the entire array of strings
        for (let i = 0; i < num.length; i++) {
            // sets first para as var
            if (num[i] === "(") openIndex = i;
            // sets end para as sepearte var
            if (num[i] === ")") {
                let closeIndex = i;

                // creates var using the content of the by using previous vars
                let inside = num.slice(openIndex + 1, closeIndex);

                // sends joined result of previous through operation logic
                let result = operation(inside.join(" "));

                // overwrites the paras and inserts results
                num.splice(openIndex, closeIndex - openIndex + 1, String(result));

                // keeps looking for other paras
                break;
            }
        }
    }
    return num;
}

// over complicated operand function/nightmare
function operation(num){
    // split string into array on space
    num = num.split(" ")
    // run array through par function
    num = par(num);
    // creates temp string for shenanigans
    let temp = ""
    // iterate through each member of array
    num.forEach((char, index, num) => {
        // all operands basically perform the same
        // i tried to impliment pemdas through oop
        // likely failed
            if(char == "^"){
                // creates temp string
                let expTemp =""

                // if temp string is empty
                if(temp == ""){
                    // insert previous number in array into opTemp
                    expTemp += num[index - 1]
                } else {
                    // if not then add temp
                    expTemp += temp
                }

                // insert space into opTemp
                expTemp += " "
                // add next number to opTemp
                expTemp += num[index + 1]
                // run the string example(11 12) through the math functions
                temp = exp(expTemp)
            }
            if(char == "*"){
                let mulTemp =""

                if(temp == ""){
                    mulTemp += num[index - 1];
                } else {
                    mulTemp += temp;
                }

                mulTemp += " "
                mulTemp += num[index + 1];
                temp = mul(mulTemp);
            }
            if(char == "/"){
                let divTemp =""

                if(temp == ""){
                    divTemp += num[index - 1]
                } else {
                    divTemp += temp;
                }
                divTemp += " "
                divTemp += num[index + 1]
                temp = div(divTemp)
            }
            if(char == "+"){
                let addTemp=""

                if(temp == ""){
                    addTemp += num[index - 1]
                } else{
                    addTemp += temp;
                }
                addTemp += " "
                addTemp += num[index + 1]
                temp = add(addTemp)
            }
            if(char == "-"){
                let subTemp=""

                if(temp === ""){
                    subTemp += num[index - 1]
                } else {
                    subTemp += temp
                }
                subTemp += " "
                subTemp += num[index + 1]
                temp = sub(subTemp)
            }
    });
    // return answer
    return temp;
}

// ai made better version
//function operation(input) {
//    let tokens = input.split(" ").filter(t => t.length > 0);
//    tokens = par(tokens);  // resolve parentheses first

//    const precedence = [
//        ["^"],
//        ["*", "/"],
//        ["+", "-"]
//    ];

//    for (let ops of precedence) {
//        let i = 0;
//        while (i < tokens.length) {
//            if (ops.includes(tokens[i])) {
//                const a = Number(tokens[i - 1]);
//                const b = Number(tokens[i + 1]);
//               let result;
//                switch(tokens[i]) {
//                    case "^": result = a ** b; break;
//                    case "*": result = a * b; break;
//                    case "/": result = a / b; break;
//                    case "+": result = a + b; break;
//                    case "-": result = a - b; break;
//                }
//                tokens.splice(i - 1, 3, result.toString());
//                i = 0; // start over after splice
//            } else {
//                i++;
//            }
//        }
//    }

//    return tokens[0];
//}


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