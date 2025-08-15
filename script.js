document.addEventListener('DOMContentLoaded', function(event) {
    const container = document.querySelector(".container")
    const text = document.querySelector(".math-input")
    const button = document.querySelector(".math-button")
    // Code to execute when the DOM is ready
    console.log('DOM is ready!');
    button.addEventListener("click", function (){
        alert(operation(text.value));
        console.log(operation(text.value))
    });
});

function add(...num){
    let rVal
    num.forEach(n => {
        rVal += Number(n)
    });
    return rVal

}

function sub(num){
    return num

}

function mul(num){
    return num
}

function div(num){
    return num
}

function exp(num){
    return num + num

}

function operation(num){
    num = num.split(" ")
    let temp = ""
    //let par = num.filter(pOp)
    num.forEach((char, index, num) => {
        //alert(char)
        //alert(typeof(char))
        if(index > 0){
            if(char == ")"){
                return "notyet"
            }
            if(char == "e"){
                let expTemp =""

                if(temp == ""){
                    expTemp += num[index - 1]
                } else {
                    expTemp += temp
                }

                expTemp += num[index + 1]
                temp = exp(expTemp)
            }
            if(char == "*"){
                let mulTemp =""

                if(temp == ""){
                    mulTemp += num[index - 1];
                } else {
                    mulTemp += temp;
                }
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

                addTemp += num[index + 1]
                temp = add(addTemp)
            }
            if(char == "-"){
                let subTemp=""

                if(temp == ""){
                    subTemp += num[index - 1]
                } else {
                    subTemp += temp
                }

                subTemp += num[index + 1]
                temp = sub(subTemp)
            }
        }
    });
    return temp;
}

function pOp(num){
    let exp = num.filter()
    let mul = num.filter()
    let div = num.filter()
    let add = num.filter()
    let sub = num.filter()
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