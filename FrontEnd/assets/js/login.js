<<<<<<< HEAD
/*
function envoiEtVerif() {
    console.log("récupération des identifiants");

    const email = document.querySelector('#userInput').value;
    const password = document.querySelector('#MDPInput').value;

    console.log("Identifiant :", email, "Mot de passe :", password);

    const data = {
        email: email,
        password: password,
    };
    console.log("ce qu'il y a dans la const data", data)

    const optionRequete = {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    };
    console.log("ce que contient la const optionRequete", optionRequete)

    fetch("http://localhost:5678/api/users/login", optionRequete)
        .then(response => {
            if (!response.ok) {
                throw new Error('Échec de la requête.');
            }
            return response.json(); // Analyser la réponse JSON
            })
            .then(data => {
            // Gérer la réponse du serveur, par exemple, afficher un message de connexion réussie
            console.log('Connexion réussie', data);
            })
            .catch(error => {
            // Gérer les erreurs, par exemple, afficher un message d'erreur
            console.error('Erreur de connexion :', error);
            });
}
*/

function authentification() {
    const lancement = document.getElementById('seConnecter');
    console.log("Affiche ce qu'est 'lancement' :", lancement);
    lancement.addEventListener("click", function () {
        console.log("Le bouton 'Se connecter' fonctionne");
        console.log("récupération des identifiants");

        const email = document.querySelector('#userInput').value;
        const password = document.querySelector('#MDPInput').value;
    
        console.log("Identifiant :", email, "Mot de passe :", password);
    
        const data = {
            email: email,
            password: password,
        };
        console.log("ce qu'il y a dans la const data", data)
    
        const optionRequete = {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        };
        console.log("ce que contient la const optionRequete", optionRequete)
    
        fetch("http://localhost:5678/api/users/login", optionRequete)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Échec de la requête.');
                }
                return response.json(); // Analyser la réponse JSON
            })
            .then(data => {
                if (data.success) {
                    const authToken = data.token;
                    localStorage.setItem('authToken', authToken);
                    console.log('Connexion réussie');

                } else {
                    console.log('Connexion echouée');
                }
            })
            .catch(error => {
            // Gérer les erreurs, par exemple, afficher un message d'erreur
            console.error('Erreur de connexion :', error);
            });
    });
}

authentification();
=======
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
>>>>>>> 42e744aebb3d117e456023db6c1af57f316a2cbf
