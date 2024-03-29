
const token = sessionStorage.getItem('token'); //je garde le token toute jusqu'à la fermeture de la session
const galleryIndex = document.querySelector(".gallery");

function afficherTravaux(works){ //je refais le même code que pour l'affichage des travaux et les filtres dans "works.js"

    for (let i = 0; i < works.length; i++) {
    
        const travail = works[i];
    
        const sectionGallery = document.querySelector(".gallery");
    
        const element = document.createElement("figure");
    
        const imageElement = document.createElement("img");
        imageElement.src = travail.imageUrl;
        const titreElement = document.createElement("figcaption");
        titreElement.innerText = travail.title;
        const categorieElement = document.createElement("figcaption");
        categorieElement.innerText = travail.category.name;
    
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

    const boutonObjets = document.querySelector("#boutonObjets"); 
    boutonObjets.addEventListener("click", function () { 
        const object_works = travaux.filter(function (element) { 
            return element.category.id == 1
        });
        document.querySelector(".gallery").innerHTML=""; 
        afficherTravaux(object_works) 
    });
    const boutonAppartements = document.querySelector("#boutonAppartements");
    boutonAppartements.addEventListener("click", function () {
        const appart_works = travaux.filter(function (travail) {
            return travail.category.id == 2
        });
        document.querySelector(".gallery").innerHTML="";
        afficherTravaux(appart_works)
    });
    const boutonHR = document.querySelector("#boutonHR");
    boutonHR.addEventListener("click", function () {
        const HR_works = travaux.filter(function (travail) {
            return travail.category.id == 3
        });
        document.querySelector(".gallery").innerHTML="";
        afficherTravaux(HR_works)
    });
    const boutonTous = document.querySelector("#boutonTous");
    boutonTous.addEventListener("click", function () {
        const tous_works = travaux.filter(function (travail) {
            return travail.category.id == 1, 2, 3
        });
        document.querySelector(".gallery").innerHTML="";
        afficherTravaux(tous_works)
    });
}

function afficherFormulaire() { //je créé les modal et le formulaire pour pouvoir l'envoyer au serveur//
    const ajouterPhotoButton = document.getElementById('ajoutPhoto');
    const modalb = document.getElementById('modalb');
    const modalA = document.getElementById('modal');
    let selectedImage;
    const gallery = document.getElementsByClassName("gallery");

    while (modalb.firstChild) {
        modalb.removeChild(modalb.firstChild);
    }

        //je créé les élements de la modale
        const precedentIcon = document.createElement("i");
        const fermerFenetre = document.createElement("i");
        const boutonP = document.createElement("button");
        const boutonX = document.createElement("button");
        const labelTitre = document.createElement("label");
        const inputTitre = document.createElement("input");
        const labelCat = document.createElement("label");
        const selectCat = document.createElement("select");
        const submitForm = document.createElement("input");
        const titreForm = document.createElement("div");
        const formModal = document.createElement("form");
        const formIcone = document.createElement("div");
        const modalbContent = document.createElement("div");
        const barre = document.createElement("hr");
        const imgForm = document.createElement("div");
        const iconeImg = document.createElement("i");
        const imgAffiche = document.createElement("img");
        const ajoutImg = document.createElement('input');
        const formatImg = document.createElement('div');
        const divSubmit = document.createElement('div');

        // je mets des attributs aux elements créés
        labelTitre.setAttribute('for', 'inputTitre');
        labelTitre.innerText = 'Titre';
        labelCat.setAttribute('for', 'inputCat');
        labelCat.innerText = "Categorie";
        ajoutImg.type = "file";
        ajoutImg.accept = ".jpg, .png";
        ajoutImg.size = 4096000;
        ajoutImg.name = "ajouImg";
        submitForm.type = "submit";
        submitForm.value = "Ajouter";
        submitForm.classList.add('submitFormulaire');
        titreForm.innerText = "Ajout Photo";
        titreForm.classList.add('titreForm');
        formModal.classList.add('formModalb');
        ajoutImg.classList.add('inputImgTravail');
        inputTitre.classList.add('inputTitreTravail');
        selectCat.classList.add('selectCatTravail');
        modalbContent.classList.add('modalbContent');
        barre.classList.add('barre');
        iconeImg.classList.add("fa-regular", "fa-image", "iconeImg")
        imgAffiche.id = 'imageAffiche';
        formIcone.classList.add('formIcone');
        precedentIcon.classList.add("fas", "fa-arrow-left", "precedent-icon");
        fermerFenetre.classList.add("fas", "fa-times", "fermerFenetre");
        precedentIcon.classList.add("precedentModal");
        fermerFenetre.classList.add("fermerModal")
        formatImg.innerText = "jpg, png : 4mo max";
        imgForm.classList.add("divImgForm");
        divSubmit.id = 'divSubmit';

        //je mets les icones dans un bouton chacun puis les boutons dans une div
        formIcone.appendChild(boutonP);
        formIcone.appendChild(boutonX);
        boutonP.appendChild(precedentIcon);
        boutonX.appendChild(fermerFenetre);

        // je met dans la div imgForm, la div avec une icone, un boutton et le type d image accepté
        imgForm.appendChild(iconeImg);
        imgForm.appendChild(imgAffiche);
        imgForm.appendChild(ajoutImg);
        imgForm.appendChild(formatImg);

        //dans le modalb, je mets = la modalbcontent qui contient : la div des icones, le titre et le formulaire
        modalbContent.appendChild(formIcone);
        modalbContent.appendChild(titreForm);
        modalbContent.appendChild(formModal);
        modalb.appendChild(modalbContent);

        //je mets dans le formModal = photo, titre, categorie, la barre et le submit
        formModal.appendChild(imgForm);
        formModal.appendChild(labelTitre);
        formModal.appendChild(inputTitre);
        formModal.appendChild(labelCat);
        formModal.appendChild(selectCat);
        formModal.appendChild(barre);
        divSubmit.appendChild(submitForm);
        formModal.appendChild(divSubmit);

        boutonX.addEventListener('click', () => { //bouton fermer
            modalb.style.display = 'none';
            modalA.style.display = "none";
        });
    
        boutonP.addEventListener('click', () => { //bouton precedent
            modalb.style.display = 'none';
            modalA.style.display = "flex";
            travauxModal();
        });
    
        window.addEventListener('click', (event) => { // si je click en dehors de la fenetre cela ferme les modal
            if (event.target == modalb) {
                modalb.style.display = 'none';
                modalA.style.display = "none";
            }
        });

        //ouvre la modal B (formulaire d'ajout) et ferme la modal A
        ajouterPhotoButton.addEventListener('click', () => {
            modalb.style.display = 'flex';
            modalA.style.display = "none";
            formModal.reset();
            const imagePreview = document.getElementById('imageAffiche');
            imagePreview.src = '';
        });

    fetch("http://localhost:5678/api/categories", { method: 'GET' })
        .then(response => response.json())
        .then(data => {
            const selectCat = document.querySelector('.selectCatTravail');

            // Ajout des catégories à la liste déroulante
            data.forEach(category => {
                const option = document.createElement('option');
                option.value = category.id;
                option.text = category.name;
                selectCat.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des catégories :', error);
        });

    var imageInput = document.getElementById ('fileInput');

    ajoutImg.addEventListener('change', (event) => {
        selectedImage = event.target.files[0];
    
        /* je fais une prévisualitation de l'image*/
        const imagePreview = document.getElementById('imageAffiche');
        const reader = new FileReader();
        reader.onload = function (e) {
            imagePreview.src = e.target.result;
        };
        reader.readAsDataURL(selectedImage);
        iconeImg.style.display = 'none';
    });

    formModal.addEventListener('submit', (event) => {
        event.preventDefault();

        //Je récupère les valeurs du formulaire
        const form = new FormData();
        const image = ajoutImg.files[0];
        const titre = inputTitre.value;
        const categorie = selectCat.value;
        
        form.append("title", titre);
        form.append("image", image);
        form.append("category", categorie);

        async function envoyerFormulaire() {
            try {
                const reponseServeur = await fetch("http://localhost:5678/api/works", {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                    body: form,
                });
                if (reponseServeur.ok) {
                    window.alert('Bravo, le travail a été créé avec succès.');
                    formModal.reset();
                    const imagePreview = document.getElementById('imageAffiche');
                    imagePreview.src = '';
                        while (galleryIndex.firstChild) {
                            galleryIndex.removeChild(galleryIndex.firstChild);
                        }
                        initialisation();
                } else {
                    console.error(`La requête a échoué avec le statut: ${reponseServeur.status}`);
                    window.alert('Ça n\'a pas marché. Le travail n\'a pas été créé.');
                }
            } catch (error) {
                console.error('Erreur lors de l\'envoi du formulaire :', error);
            }
        }
        envoyerFormulaire();
    });

}

function supprimerToken() { //Fonction pour la suppression du token de connexion qui est dans le sessionstorage
    sessionStorage.removeItem('token');
}

function afficherTravauxModal(works) { /*J'affiche les travaux dans une modal avec la possibilité de les supprimer*/
    const galleryModif = document.querySelector("#galleryModif");

    for (let i = 0; i < works.length; i++) {
        const travail = works[i];
        const element = document.createElement("figure");
        const imageElement = document.createElement("img");
        const deleteIcon = document.createElement("i");

        element.classList.add("image-container");
        imageElement.classList.add("modal-image");
        deleteIcon.classList.add("fas", "fa-trash-can", "delete-icon");
        
        /* suppression du travail au click sur la croix*/
        deleteIcon.addEventListener('click', () => {
            const optionRequetePostDelete = {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            };
    
            fetch("http://localhost:5678/api/works/"+travail.id, optionRequetePostDelete);
            window.alert("Vous avez supprimé un projet");
            element.remove(); //effacement du travail dans la modal

            while (galleryIndex.firstChild) { //mise à jour de la gallery
                galleryIndex.removeChild(galleryIndex.firstChild);
            }
            initialisation();

        });

        imageElement.src = travail.imageUrl;

        galleryModif.appendChild(element);
        element.appendChild(deleteIcon);
        element.appendChild(imageElement);
    }
}

function nettoyerTravauxModal() { //fonction pour mettre à jour la gallery
    const galleryModif = document.querySelector("#galleryModif");

    while (galleryModif.firstChild) {
        galleryModif.removeChild(galleryModif.firstChild);
    }
}

async function travauxModal() {
    const reponse = await fetch("http://localhost:5678/api/works", { method: 'GET' });
    const travaux = await reponse.json();

    nettoyerTravauxModal();
    afficherTravauxModal(travaux);
    afficherFormulaire();
}

if (token) { //s'il y a un token de connexion, bouton modifier et se déconnecter
    console.log("Il y a un token dans le sessionStorage");

    const Edition = document.getElementById('modeEdition');
    Edition.style.display = "flex";
    modification.style.display = "flex";
    boutonDeconnexion.style.display = "flex";
    const login = document.getElementById('login');
    login.style.display = "none";

    const openModalButton = document.getElementById('openModal');
    const modalA = document.getElementById('modal');

    const modalaContent = document.createElement("div");
    const divFermer = document.createElement("div");
    const closeModalA = document.createElement("button");
    const fermerModalA = document.createElement("i");
    const titreModalA = document.createElement("div");
    const galleryModalA = document.createElement("div");
    const hr = document.createElement("hr");
    const ajoutPhoto = document.createElement("button");

    galleryModalA.id = 'galleryModif';
    divFermer.id = 'divFermer';
    fermerModalA.classList.add("fas", "fa-times", "fermerModalA");
    titreModalA.id = 'titreModalA';
    ajoutPhoto.innerText = "Ajouter une photo";
    ajoutPhoto.id = 'ajoutPhoto';
    modalaContent.id = 'modalaContent';
    titreModalA.innerText = "Gallery Photo";
    hr.classList.add("barre");

    closeModalA.appendChild(fermerModalA);
    divFermer.appendChild(closeModalA);
    modalaContent.appendChild(divFermer);
    modalaContent.appendChild(titreModalA);
    modalaContent.appendChild(galleryModalA);
    modalaContent.appendChild(hr);
    modalaContent.appendChild(ajoutPhoto);
    modalA.appendChild(modalaContent);
    
    
    const filtre = document.querySelector(".filtre");
    filtre.style.display = "none";

    openModalButton.addEventListener('click', () => {
        modalA.style.display = 'flex';
        travauxModal();
    });

    closeModalA.addEventListener('click', () => {
        modalA.style.display = 'none';
        nettoyerTravauxModal();
    });

    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            modalA.style.display = 'none';
            nettoyerTravauxModal();
        }
    });

    boutonDeconnexion.addEventListener('click', () => {
        supprimerToken();
        location.reload(); //rechargement de la page sans le token
    })

    //beforeunload pour supprimer le token lors de la fermeture de la page
    window.addEventListener('beforeunload', supprimerToken);
} 
else { //si pas de token = les boutons ne s'affichent pas
    console.log("Il n'y a rien dans le sessionStorage");
    modal.style.display = "none";
}