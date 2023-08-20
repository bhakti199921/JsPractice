const form =document.getElementById("form");
const username=document.getElementById("username");
const email =document.getElementById("email");
const password=document.getElementById("password");
const password2=document.getElementById("password2");
const eyeclose =document.getElementById("eyeclose");
const eyeclose1 =document.getElementById("eyeclose1");


// show input error

function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
  }

// Show success outline
function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
  }

// Check email is valid

function checkEmail(input){
    const re=/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(re.test(input.value.trim())){
        showSuccess(input)
    }
    else{
        showError(input,"email is not valid");
    }
}

// Check required fields

function checkRequired(inputArr) {
    let isRequired = false;
    inputArr.forEach(function(input) {
      if (input.value.trim() === '') {
        showError(input, `${getFieldName(input)} is required`);
        isRequired = true;
      } else {
        showSuccess(input);
      }
    });
  
    return isRequired;
  }

// Check input length
 function checkLength(input,min,max){
    if (input.value.length < min){
        showError(input,`${getFieldName(input)} must be atleast ${min} character`);
    }
    else if(input.value.length > max){
        showError(input,`${getFieldName(input)} must be less than ${max} character`);
    }
    else{
        showSuccess(input);
    }
 }

 // Check passwords match
function checkPasswordMatch(input1,input2){
if(input1.value !== input2.value){
    showError(input2,"password do not match");
}
else if(password !== password2){
  showError(input2,"password do not match");
}
}

// Get fieldname
function getFieldName(input){
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}   

function onChange(){

  if(password.type==="password"){
    password.type="text";
    eyeclose.src="eye_open.svg";
  }
  else{
    password.type="password";
    eyeclose.src="eye_close.svg";

  }

}

function onChangeS(){
  

  if(password2.type==="password"){
    password2.type="text";
    eyeclose1.src="eye_open.svg";
  }
  else{
    password2.type="password";
    eyeclose1.src="eye_close.svg";

  }

}

// Event listeners
form.addEventListener('submit',function(e){
    e.preventDefault();
    
    if(checkRequired([username,email,password,password2])){
        checkLength(username,3,15);
        checkLength(password,6,25);
        checkEmail(email);
        checkPasswordMatch(password,password2);
    }
});