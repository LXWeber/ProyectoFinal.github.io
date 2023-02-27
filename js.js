document.getElementById("contacto").onclick=function(){
    console.log("funca!")
    cuerpo.style.display='none';
    formulario.style.display='block';
    goBack.style.display="block";
    contacto.style.display="none";
    navbar.style.display="none";
};

document.getElementById("goBack").onclick=function(){
    console.log("también funca!")
    formulario.reset();
    errores.innerHTML="";
    errores.style.display='none';
    enviado.style.display='none';
    formulario.style.display='none';
    cuerpo.style.display='block';
    goBack.style.display="none";
    contacto.style.display="block";
    navbar.style.display="block";
};

document.forms["formulario"]["si"].onclick=function(){
    document.forms["formulario"]["nombreEmpresa"].disabled = false;
    if(document.forms["formulario"]["nombreEmpresa"].value == ""){
        campos.nombreEmpresa = false;
    }
}

document.forms["formulario"]["no"].onclick=function(){
    document.forms["formulario"]["nombreEmpresa"].value = "";
    document.forms["formulario"]["nombreEmpresa"].disabled = true;
    campos.nombreEmpresa = true;
}

///////////////////////////////////////////////////////////////////////
const formulario = document.getElementById('formulario'); //Traemos el formulario
const inputs = document.querySelectorAll('#formulario input');//como así tambien los inputs de éste
const enviado = document.getElementById('enviado'); // y el div donde vamos a mostrar los datos del formulario enviado
const errores = document.getElementById('errores');

const regex = {
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,50}$/, //Letras y espacios, pueden llevar acentos, hasta 50 caracteres
    nombreEmpresa: /^(\W*\s*\w+\b\W*\s*){1,}$/, //Que tenga al menos una palabra
	email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, //Que tenga @ y un .algo
    mensaje: /^(\W*\s*\w+\b\W*\s*){10,}$/, //Que tenga 10 palabras o mas
}

const campos = {
	nombre: false,
    nombreEmpresa: true,
	email: false,
	confirmEmail: false,
    mensaje: false
}

const validar =(e)=>{
    switch (e.target.id){ // "Switchea" segun los diferentes ID de los input
        case "nombre":
            validaInputs(regex.nombre, e.target, e.target.id);
        break;
        case "nombreEmpresa":
                console.log("Se detecto que está ingresando nombre de empresa");
                validaInputs(regex.nombreEmpresa, e.target, e.target.id);
        break;
        case "email":
            validaInputs(regex.email, e.target, e.target.id);
            validaIguales(e.target.id, 'confirmEmail');
        break;
        case "confirmEmail":
            validaIguales('email', e.target.id);
        break;
        case "mensaje":
            validaInputs(regex.mensaje, e.target, e.target.id);
        break;
    }
}

const validaInputs=(expresion, et, id)=>{// funcion que recibe la exprecion regular para cada caso y
    if(expresion.test(et.value)){    //  sobre qué aplicarla
        campos[id]=true; // cambia el estado del campo del mismo nombre
    }else{
        campos[id]=false;
    }
}

const validaIguales=(otro, id)=>{//compara los valores de 2 id pasados por parametro
    const uno = document.getElementById(id);
    const dos = document.getElementById(otro);

    if(uno.value===dos.value){
        campos[id]=true;
    }else{
        campos[id]=false;
    }
}

formulario.addEventListener('submit', (e) => {// Lo que ejecuta el boton de enviar
    console.log("Entró al addEventListener")
    e.preventDefault();// evitamos que cambie la url
	const camposError = {};
    const mensajesError = [
        "Ingrese un nombre, sin numeros y de un maximo de 50 caracteres",
        "Debe ingresar el nombre de su empresa / comercio",
        "El Email debe tener un @ y un '.com' o similar",
        "Los Email no coinciden",
        "El mensaje de contacto debe tener un minimo de 10 palabras"
    ];
    const camposValor = {};
    const keys = Object.keys(campos);
    if(campos.nombre && campos.nombreEmpresa && campos.email && campos.confirmEmail && campos.mensaje){
        // si toooodos los campos son verdaderos
        console.log("enviado!!");
        formulario.style.display="none";
        enviado.innerHTML="";
        enviado.style.display="block";
        var pCabecera = document.createElement("p");
        var pPie = document.createElement("p");
        pCabecera.innerText="Muchas gracias! \nLos datos enviados fueron los siguientes:";
        enviado.appendChild(pCabecera);
        var lista = document.createElement("ul");
        for(let i=0; i<keys.length; i++){
            camposValor[keys[i]] = document.getElementById(keys[i]).value;
            var li = document.createElement("li");
            li.innerText = keys[i]+":  "+camposValor[keys[i]];
            lista.appendChild(li);
        }
        enviado.appendChild(lista);
        pPie.innerText="En breve estaremos en contacto.";
        enviado.appendChild(pPie);
        
    } else {
        errores.style.display="block";
        errores.innerHTML="";
        var pECabecera = document.createElement("p");
        pECabecera.innerText="Revisar los error/es en el/los siguiente/s campo/s\n";
        errores.appendChild(pECabecera);
        var lista = document.createElement("ul");        
        for(let i=0;i<keys.length;i++){
            if(!campos[keys[i]]){
                camposError[keys[i]] = mensajesError[i];
                var li = document.createElement("li");
                li.innerText = camposError[keys[i]];
                lista.appendChild(li);
            }
        }
        errores.appendChild(lista);
    }
});

inputs.forEach((input)=>{
    input.addEventListener('keyup', validar); //Cada que se levanta la tecla se ejecuta la validación
    input.addEventListener('blur', validar); // de igual manera si se le quita el foco al input
});

document.getElementById('mensaje').addEventListener('keyup', validar);
document.getElementById('mensaje').addEventListener('blur', validar);


/* document.getElementById("submit").onclick=function () {
    let formNombre = document.forms["formulario"]["nombre"].value;
    let formNombreEmp = document.forms["formulario"]["nombreEmpresa"].value;
    let formEmail = document.forms["formulario"]["e-Mail"].value;
    let formMensaje = document.forms["formulario"]["mensaje"].value;

    if ( formNombre == "") {
        alert("No ha ingresado un Nombre");
        return false;
    }

    if (document.getElementById("si").checked || document.getElementById("no").checked){
        if (document.getElementById("si").checked && formNombreEmp == "") {
            alert("No ha ingresado el nombre de la empresa / comercio");
            return false;
        }
    } else {
        alert("¿Se comunica en representación de una empresa o comercio?");
        return false;
    }

    if ( formEmail == "") {
        alert("No ha ingresado un e-Mail");
        return false;
    }

    if ( formMensaje == "") {
        alert("No ha ingresado el motivo del contacto");
        return false;
    }
    
    alert("formulario enviado")
} */