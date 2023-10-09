const reponse = await fetch("http://localhost:5678/api/works");
const works =  await reponse.json();

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
    const titreElement = document.createElement("h1");
    titreElement.src = travail.title;
    const categorieElement = document.createElement("h2");
    categorieElement.src = travail.catergory;

    /*récupération des élements dans une fiche dans la gallery*/

    sectionGallery.appendChild(element);
    element.appendChild(imageElement);
    element.appendChild(titreElement);
    element.appendChild(categorieElement);

}