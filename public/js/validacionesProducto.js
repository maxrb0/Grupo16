window.addEventListener("load", function () {

    let formulario = document.querySelector(".formSignup");
    let nombre = document.querySelector("#name");
    let caracteristica = document.querySelector("#caracteristica");
    let imgFrente = this.document.querySelector("#imgFrente");
    let imgBack = this.document.querySelector("#imgBack");

    


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

        let extensionFrente = imgFrente.value.split(".").pop();
        
        if(extensionFrente == "png" || extensionFrente == "jpg" || extensionFrente == "png" || extensionFrente == "jpeg"){
          errors.push("Los archivos de la imagen del producto de frente debe tener una extension valida");
        }

        let extensionBack = imgBack.value.split(".").pop();
        
        if(extensionBack == "png" || extensionBack == "jpg" || extensionBack == "png" || extensionBack == "jpeg"){
          errors.push("Los archivos de la imagen del producto de la parte trasera debe tener una extension valida");
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