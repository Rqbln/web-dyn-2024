function addition() {
    let num1 = parseFloat(document.getElementById("firstNumber").value);
    let num2 = parseFloat(document.getElementById("secondNumber").value);
    document.getElementById("result").innerHTML = num1 + num2;
}

function soustraction() {
    let num1 = parseFloat(document.getElementById("firstNumber").value);
    let num2 = parseFloat(document.getElementById("secondNumber").value);
    document.getElementById("result").innerHTML = num1 - num2;
}

function multiplication() {
    let num1 = parseFloat(document.getElementById("firstNumber").value);
    let num2 = parseFloat(document.getElementById("secondNumber").value);
    document.getElementById("result").innerHTML = num1 * num2;
}

function division() {
    let num1 = parseFloat(document.getElementById("firstNumber").value);
    let num2 = parseFloat(document.getElementById("secondNumber").value);
    if(num2 != 0) {
        document.getElementById("result").innerHTML = num1 / num2;
    } else {
        document.getElementById("result").innerHTML = "Division par zéro!";
    }
}
