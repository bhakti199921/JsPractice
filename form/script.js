const form =document.getElementById("form");
const username=document.getElementById("username");
const email =document.getElementById("email");
const password=document.getElementById("password");
const password2=document.getElementById("password2");
const eyeclose =document.getElementById("eyeclose");
const eyeclose1 =document.getElementById("eyeclose1");

function showError(input,message){
    const formControl=input.parentElement;
    formControl.className='form-control error';
    const small=formControl.querySelector('samll');
    small.innerText=message;
}

function showSuccess(input){
    const formControl=input.parentElement;
    formControl.className='form-control success';
}

function checkEmail(input){
    const re=/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(re.test(input.value.trim())){
        showSuccess(input)
    }
    else{
        showError(input,"email is not valid");
    }
}

// check requird
function checkRequired(inputArr){
    let isRequired=false;
    inputArr.forEach(function(input){
        if(input.value.trim()==""){
            showError(input,`${getFieldName(input)} is required`);
            isRequired=true;
        }
        else{
            showSuccess(input);
        }
    });
        
    return isRequired;
    
}

function getFieldName(input){
return input.id.charAt(0).toUpperCase()+input.id.slice(1);
}


function checkLength(input,min,max){
    if(input.value.length <min){
        showError(input,`${getFieldName(input)},must be atleast ${min} character`);
    }
    else if(input.value.length>max){
        showError(input,`${getFieldName(input)},must be atleast ${max} character`);
    }
    else{
        showSuccess(input);
    }
}

function checkPasswordMatch(input1,input2){
    if(input1.value !== input2.value){
        showError(input2,"password do not match")
    }else if(input2 !== input1.value){
        showError(input2,"password do not match");
    }
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
  
  form.addEventListener('submit',function(e){
    e.preventDefault();
    if(checkRequired([username,email,password,password2])){
        checkLength(username,3,12);
        checkLength(password,6,12);
        checkEmail(email);
        checkPasswordMatch(password,password2);
    }
  })