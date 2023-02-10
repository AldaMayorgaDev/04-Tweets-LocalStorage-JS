/* Variables */
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');

let tweets =[];

/* Events Listeners */
eventListeners();

function eventListeners() {
    formulario.addEventListener('submit', agregarTweet);
}


/* Funciones */

function  agregarTweet(e) {
    e.preventDefault();

    //TextArea donde eñ usuario escribe

    const tweet = document.querySelector('#tweet').value;
    
    //Validacion tweet vacio

    if(tweet.trim() === ''){
        mostrarError('Un mensaje no puede ir vacio');
        return; //Evita que se ejecuten más lineas de código
    }
   

    //Objeto de tweet con un identificador
    const tweetObj ={
        id: Date.now(),
       tweet // es igual a tweet : tweet 
    }
    //Añadir al arreglo de tweets

    tweets = [...tweets, tweetObj];
    console.log('tweets :>> ', tweets);

    //Una vez agregado crear el HTML
    crearHTML();

    //Reinciar formulario

    formulario.reset();
}

//Mostrar mensaje de error

function mostrarError(error) {
    const mensajeError = document.createElement('P');
    mensajeError.classList.add('error');
    mensajeError.textContent = error;

    //Insertar P en el contenido
    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);


    //Elimina los mensajes de error
    setTimeout(()=>{
        mensajeError.remove();
    }, 2000);
    
}

//muestra listado de los tweets

function crearHTML(){
    limpiarHTML();

    if(tweets.length > 0){ /* Valida si el arreglo tweets tiene contenido */
        tweets.forEach((tweet) =>{
            //Crear html por cada tweet

            const li = document.createElement('li');

            //añadir texto
            li.innerHTML = tweet.tweet;

            //Agregar al DOM

            listaTweets.appendChild(li);
        })
    }
}

//Limpiar html

function limpiarHTML(){
    while (listaTweets.firstChild){
        listaTweets.removeChild(listaTweets.firstChild);
    }
}