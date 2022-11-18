

window.addEventListener("load", function () {
   
    let formulario = document.getElementByClassName("formSignup");

    let name = document.querySelector(".name");
    let email = document.querySelector(".email")
    let adress = document.querySelector(".adress");
    let password = document.querySelector(".password");
    let pass_confirm = document.querySelector(".pass_confirm");
    let img = document.querySelector(".img");
  
    console.log(name);
    console.log(formulario);
  
    formulario.addEventListener("submit", (e) => {
      let errors = [];
  
        if(name.value == ""){
            errors.push("El nombre es obligatorio");
        }else if(name.value.length < 2){
            errors.push("El nombre debe tener mas de 2 caracteres");
        }

        let validRegex = /^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/;


        if(email.value == ""){
            errors.push("El email es obligatorio");
        }else if(name.email.match(validRegex)){
            errors.push("El email debe valido");
        }

        if(password.value == ""){
            errors.push("La contraseña es obligatoria");
        }else if(password.value.length < 8){
            errors.push("La contraseña debe tener mas de 7 caracteres");
        }

        if(pass_confirm.value != password.value){
            errors.push("Las contraseñas deben ser iguales");
        }

  
      if (errors.length > 0) {
        e.preventDefault();

        let ulErrors = document.querySelector(".errors ul");
        

        for (let i = 0; i < errors.length; i++) {
          ulErrors.innerHTML += `<li>  ${errors[i]} </li>`; 
        }
      } else {
        alert("La validación fué exitosa");
        form.submit();
      }
    });
});