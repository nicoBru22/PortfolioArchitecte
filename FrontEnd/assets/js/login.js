function authentification() {
    const lancement = document.getElementById('seConnecter');

    lancement.addEventListener("click", function (event) {
        event.preventDefault(); // Empêche la soumission du formulaire

        const email = document.querySelector('#userInput').value;
        const password = document.querySelector('#MDPInput').value;
        const data = {
            email: email,
            password: password,
        };

        const optionRequete = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data), // Convertir l'objet en une chaîne JSON
        };

        fetch("http://localhost:5678/api/users/login", optionRequete)
            .then(response => {
                if (!response.ok) {
                    window.alert('Email ou mot de passe invalide');
                }
                return response.json();
            })
            .then(responseData => {
                console.log("reponseData :", responseData);
                if (responseData.token) {
                    const token = responseData.token;
                    sessionStorage.setItem('token', token);
                    console.log('Connexion réussie');
                    console.log("ce qu'il y a dans le localStorage", sessionStorage);
                    console.log("ce qu'il y a sur token", token);
                    window.location.href = 'index.html';
                } else {
                    console.log("Email ou mot de passe invalide");
                }
            })
            .catch(error => {
                // Gérer les erreurs, par exemple, afficher un message d'erreur
                console.error('Erreur de connexion :', error);
            });
    });
}

authentification();
