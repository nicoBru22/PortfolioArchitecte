function authentification() {
    const lancement = document.getElementById('seConnecter');
    console.log("Affiche ce qu'est 'lancement' :", lancement);

    lancement.addEventListener("click", function (event) {
        event.preventDefault(); // Empêche la soumission du formulaire

        console.log("Le bouton 'Se connecter' fonctionne");
        console.log("Récupération des identifiants");

        const email = document.querySelector('#userInput').value;
        const password = document.querySelector('#MDPInput').value;

        console.log("Identifiant :", email, "Mot de passe :", password);

        const data = {
            email: email,
            password: password,
        };
        console.log("Ce qu'il y a dans la const data", data);

        const optionRequete = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data), // Convertir l'objet en une chaîne JSON
        };
        console.log("Ce que contient la const optionRequete", optionRequete);

        console.log("dans le try");
        fetch("http://localhost:5678/api/users/login", optionRequete)
            .then(response => {
                console.log("resp", response);

                if (!response.ok) {
                    window.alert('Échec de la requête.');
                }

                return response.json();
            })
            .then(responseData => {
                console.log("reponseData :", responseData);
                if (responseData.token) {
                    const authToken = responseData.token;
                    localStorage.setItem('authToken', authToken);
                    console.log('Connexion réussie');
                    console.log("ce qu'il y a dans le localstorage", localStorage)
                    window.location.href = 'index.html';
                } 
                else {
                    console.log('Connexion échouée');
                }
            })
            .catch(error => {
                // Gérer les erreurs, par exemple, afficher un message d'erreur
                console.error('Erreur de connexion :', error);
            });
    });
}

authentification();