const submit = document.querySelector('.seConnecter');

function authentification() {
    const donnees = {
        param1: document.getelementbyclassname(".userInput"), /*au lieu de param, mettre comme dans l'API*/
        param2: document.getelementbyclassname(".MDPInput");
    };
    const options = {
        method: 'POST',
        body: JSON.stringify( donnees )
    };

    fetch( 'http://localhost:5678/api/user/login', options )
    .then( response => response.json() )
    .then( response => {
        console.log("connecté !!!")
    } );
  
}

submit.addEventListener("click", authentification);