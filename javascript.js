const btn = document.getElementById("btn-verify");
const clean = document.getElementById("btn-clean");
const box = document.querySelector("#pincode");
const resultEl = document.querySelector('#result');
const btnnumbers = document.querySelectorAll(".number");
const message = document.getElementById("yellow");
const eye = document.querySelector(".visible");
const modal = document.getElementById("welcome");
const introduce = document.getElementById("introduce");
const cross1 = document.getElementById("cross1");
const cross2 = document.getElementById("cross2");

let validpin = false;
let password = 0;
let attempts = 0;
let code = "";

function validatePin() {
    const pin = document.getElementById("pincode").value;
    box.style.fontSize = "64px";
    var numbers = /^[0-9]+$/;
    if(pin.match(numbers)) {
        if(pin.length == 6) {            
            box.value = "Saved";
            validpin = true;
            password = pin;
            introduce.classList.remove('modal--close');
            box.value = "";
            box.placeholder = "";
            btn.value = "OK";
            eye.src = "assets/eye-off.ico";
        }
        else {
            eye.style.visibility = 'hidden';
            box.value = "";
            box.placeholder = "Error";
            box.classList.add('error-red');
        }
    }
    else {
        eye.style.visibility = 'hidden';
        box.value = "";
        box.style.fontSize = "40px";
        box.classList.add('error-red');
        box.placeholder = "Not a number";
        validpin = false;
    }   
    return validpin;
}

function comparePin(password) {
    if (attempts < 3) {
        if(password == code) {
            eye.style.visibility = 'hidden';
            box.value = "";
            box.placeholder = "Correct";
            window.open("https://www.codebay-innovation.com/");
            validpin = false;
            password = 0;
            attempts = 0;
            btn.value = "Save";
            eye.src = "assets/eye.ico";
        }
        else {
            eye.style.visibility = 'hidden';
            box.value = "";
            box.placeholder = "Wrong";  
            box.classList.add('error-red');
            attempts = attempts + 1;
            message.classList.remove('modal--close');
            if(attempts < 3) {                
                message.innerHTML = `¡El pin no es correcto, te quedan ${4-attempts} intentos!`;              
            }
            else if (attempts == 3) {
                message.innerHTML = `¡El pin no es correcto, te queda ${4-attempts} intento!`;
            }
            code = "";
        }
    }
    else if (attempts == 3) {
        window.open("https://www.policia.es/");
        code = "";
    }
}

box.addEventListener("click", ()=>{
    box.placeholder = "";
    box.classList.remove('error-red');
    eye.style.visibility = 'visible';
    box.style.fontSize = "64px";
})


btn.addEventListener("click", ()=>{
    if(validpin == false)
        validatePin();
    else if (validpin == true)
        comparePin(password);
})

clean.addEventListener("click", ()=>{
    box.value = "";
    box.placeholder = "";    
})

function convertpassword(){
    if (validpin) {        
        code = code + box.value.charAt(box.value.length - 1);        
        const pass = Array(box.value.length).fill('*').join('');
        box.value = pass;              
    }
}

box.addEventListener("keyup", ()=>{
    convertpassword();
})



function addnumber(number) {
    box.classList.remove('error-red');
    if(box.value.length < 6) {
        box.value = box.value + number;
        convertpassword();
    }
}

btnnumbers.forEach(boton => {
    
    boton.addEventListener('click', () => addnumber(boton.value));
});

cross1.addEventListener("click", ()=>{
    modal.classList.add('modal--close');    
})

cross2.addEventListener("click", ()=>{
    introduce.classList.add('modal--close');    
})












