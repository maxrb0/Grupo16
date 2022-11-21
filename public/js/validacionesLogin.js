
window.addEventListener("load", function () {

    let formulario = document.querySelector(".formSignup");
    let email = document.querySelector("#email")
    let password = document.querySelector("#password");

    console.log(formulario);
    console.log(email);

    formulario.addEventListener("submit", (e) => {
        let errors = [];
    
          
          let validRegex = /^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/;
  
  
          if(email.value == ""){
              errors.push("El email es obligatorio");
          }else if(email.match(validRegex)){
              errors.push("El email debe valido");
          }
  
          if(password.value == ""){
              errors.push("La contraseña es obligatoria");
          }else if(password.value.length < 8){
              errors.push("La contraseña debe tener mas de 7 caracteres");
          }
  

  
    
        if (errors.length > 0) {
          e.preventDefault();
  
          let ulErrors = document.querySelector(".errors ul");
          
  
          for (let i = 0; i < errors.length; i++) {
            ulErrors.innerHTML += `<li>  ${errors[i]} </li>`; 
          }
        } else {
          form.submit();
        }
      });

});