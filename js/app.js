/* Variables */
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');

let tweets =[];

/* Events Listeners */
eventListeners();

function eventListeners() {
    //Cuando el usuario agrega un nuevo tweet
    formulario.addEventListener('submit', agregarTweet);

    //Cuando el documento esta listo

    document.addEventListener('DOMContentLoaded', ()=>{
        tweets= JSON.parse(localStorage.getItem('tweets')) || [];
        //console.log('tweets', tweets)
        crearHTML();
    });
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
    //console.log('tweets :>> ', tweets);

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
            //Agregar un boton de eliminar
            const btnEliminar= document.createElement('A');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.innerText = 'X';

            //Añadir funcion de eliminar
            btnEliminar.onclick = () =>{
                borrarTweet(tweet.id);
            }

            //Crear html por cada tweet

            const li = document.createElement('li');

            //añadir texto
            li.innerText = tweet.tweet;
                //Asignar boton a li

                li.appendChild(btnEliminar);
            //Agregar al DOM

            listaTweets.appendChild(li);
        });
    }

    //LocalStorage

    sincronizarStorage();
}

//Limpiar html

function limpiarHTML(){
    while (listaTweets.firstChild){
        listaTweets.removeChild(listaTweets.firstChild);
    }
}

//Agrega los tweets Actuales al localStorage

function sincronizarStorage() {
    localStorage.setItem('tweets', JSON.stringify(tweets));
}

//borar tweet

function borrarTweet(id){
    tweets = tweets.filter(tweet => tweet.id !== id);
    crearHTML();
}