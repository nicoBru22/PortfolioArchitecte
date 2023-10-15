async function login(){
    const reponse = await fetch("http://localhost:5678/api/user/login", { method: 'POST' });
    const logIn = await reponse.json();
}

login();

const connexion = document.getElementsByClassName('seConnecter');
envoyer.addEventListener("click", validation);

function validation