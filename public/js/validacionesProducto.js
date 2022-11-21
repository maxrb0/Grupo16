window.addEventListener("load", function () {

    let formulario = document.querySelector(".formSignup");
    let nombre = document.querySelector("#name");
    let caracteristica = document.querySelector("#caracteristica");


    formulario.addEventListener("submit", (e) => {
        let errors = [];

        if(nombre.value == ""){
            errors.push("El nombre de la camiseta es obligatorio");
        }else if(nombre.value.length < 5){
            errors.push("El nombre de la camiseta debe tener al menos 5 caracteres");
        }

        if(caracteristica.value.length < 20){
            errors.push("La caracteristica de la camiseta debe tener al menos 20 caracteres");
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
    })
});