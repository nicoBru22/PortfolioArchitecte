
document.addEventListener("DOMContentLoaded", function() {
    // Votre code JavaScript ici
    console.log("La page est entièrement chargée.");

    // Vous pouvez accéder aux éléments HTML ici en toute sécurité.
});

const token = sessionStorage.getItem('token');
console.log("le fameux token", token, );

 if (sessionStorage) {
    console.log("Il y a un token dans le localStorage", sessionStorage);

    const modification = document.querySelector(".lienModif");
    const div = document.createElement("div");

    const lien = document.createElement("a");
    lien.setAttribute("href", "fenetreModification.html");

    // Crée un élément d'icône (par exemple, une icône de crayon)
    const icone = document.createElement("i");
    icone.classList.add("fas", "fa-pen-to-square");

    // Ajoute l'icône à l'élément <a>
    lien.appendChild(icone);

    // Ajoute le texte "Modifier" à l'élément <a>
    lien.appendChild(document.createTextNode("Modifier"));

    div.appendChild(lien);
    modification.appendChild(div);

    lien.addEventListener("click", function(e) {
        e.preventDefault(); // Empêche le lien de suivre le lien d'origine
        const largeurFenetre = 400;
        const hauteurFenetre = 400;
        const gauche = (window.screen.width - largeurFenetre) / 2;
        const haut = (window.screen.height - hauteurFenetre) / 2;
        window.open(
            lien.getAttribute("href"), 
            "fenetreModification", 
            `width=${largeurFenetre},height=${hauteurFenetre},left=${gauche},top=${haut},resizable=no`
        );
    });
}
else {
    console.log("Il n'y a rien dans le localStorage")
}



