

function afficherTravaux(works){
    /* methode qui prend un paramètre, mot clé = works. Si on change works, tous les autres works de la fonction change*/

    for (let i = 0; i < works.length; i++) {
    
        /*Defini qu'un travail est un élément de works*/
        const travail = works[i];
    
        /*lieu où seront placées les travaux*/
        const sectionGallery = document.querySelector(".gallery");
    
        /*création de la balise <figure> dédié à 1 travail*/
        const element = document.createElement("figure");
    
        /*création de l'image, du titre et de la catégorie d'un travail*/
    
        const imageElement = document.createElement("img");
        imageElement.src = travail.imageUrl;
        const titreElement = document.createElement("figcaption");
        titreElement.innerText = travail.title;
        const categorieElement = document.createElement("figcaption");
        categorieElement.innerText = travail.category.name;
    
        /*récupération des élements dans une fiche dans la gallery*/
    
        sectionGallery.appendChild(element);
        element.appendChild(imageElement);
        element.appendChild(titreElement);
        element.appendChild(categorieElement);
    
    }
};

async function initialisation(){
    const reponse = await fetch("http://localhost:5678/api/works", { method: 'GET' });
    const travaux = await reponse.json();
    
    afficherTravaux(travaux);

    /* je créé une constante boutonObjet en lien avec la balise id du html boutonObjet*/
    const boutonObjets = document.querySelector("#boutonObjets"); 
    /* j'ajoute un auditeur d'evenement click et je lui demande de faire quelque chose*/
    boutonObjets.addEventListener("click", function () { 
        /* je créé la constante object_works qui prend pour valeur les éléments du tableau travaux de l'api*/
        const object_works = travaux.filter(function (element) { 
            return element.category.id == 1
        });
        console.log("On recupère les object", object_works.length, object_works)
        /*remise a zéro de la div gallery du html */
        document.querySelector(".gallery").innerHTML=""; 
        /*affiche les travaux object_works défini plus haut*/
        afficherTravaux(object_works) 
    });

    const boutonAppartements = document.querySelector("#boutonAppartements");
    boutonAppartements.addEventListener("click", function () {
        const appart_works = travaux.filter(function (travail) {
            return travail.category.id == 2
        });
        console.log("on récupère les appartements", appart_works.length, appart_works)
        document.querySelector(".gallery").innerHTML="";
        afficherTravaux(appart_works)
    });

    const boutonHR = document.querySelector("#boutonHR");
    boutonHR.addEventListener("click", function () {
        const HR_works = travaux.filter(function (travail) {
            return travail.category.id == 3
        });
        console.log("on récupère les hotels & restaurants", HR_works.length, HR_works)
        document.querySelector(".gallery").innerHTML="";
        afficherTravaux(HR_works)
    });

    const boutonTous = document.querySelector("#boutonTous");
    boutonTous.addEventListener("click", function () {
        const tous_works = travaux.filter(function (travail) {
            return travail.category.id == 1, 2, 3
        });
        console.log("on récupère tous les travaux", tous_works.length, tous_works)
        document.querySelector(".gallery").innerHTML="";
        afficherTravaux(tous_works)
    });
}

initialisation(); /*joue le code de la fonction initialisation et donc affiche les travaux demandés*/

console.log("le code js fonctionne");

