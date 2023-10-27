/* async function supprimerTravaux() {
    const reponse = await fetch

    deleteIcon.addEventListener('click', () => {
        // Ajoutez ici la logique pour supprimer l'image (peut nécessiter une requête au serveur)
        // Une fois l'image supprimée, vous pouvez mettre à jour l'affichage
        element.remove();
    });
}*/

function afficherFormulaire() {
    const ajouterPhotoButton = document.getElementById('ajouterPhotoButton');
    const closeModalForm = document.querySelector('.fermerModal');
    const retourModal = document.querySelector('.precedentModal');
    const modalb = document.getElementById('modalb');

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
    const inputCat = document.createElement("input");
    const submitForm = document.createElement("input");
    const titreForm = document.createElement("div");
    const formModal = document.createElement("form");
    const formIcone = document.createElement("div");
    const modalbContent = document.createElement("div");
    const barre = document.createElement("hr");

    const imgForm = document.createElement("div");
    const iconeImg = document.createElement("i");
    const ajoutImg = document.createElement('input');
    const formatImg = document.createElement('div');

    
    // je mets des attributs aux elements créés
    labelTitre.setAttribute('for', 'inputTitre');
    labelTitre.innerText = 'Titre';
    labelCat.setAttribute('for', 'inputCat');
    labelCat.innerText = "Categorie";
    ajoutImg.type = "file";
    ajoutImg.accept = ".jpg, .jpeg, .png";
    ajoutImg.size = 4096000;
    submitForm.type = "submit";
    submitForm.value = "Ajouter";
    submitForm.classList.add('submitFormulaire');
    titreForm.innerText = "Ajout Photo";
    titreForm.classList.add('titreForm');
    formModal.classList.add('formModalb');
    ajoutImg.classList.add('inputImgTravail');
    inputTitre.classList.add('inputTitreTravail');
    inputCat.classList.add('inputCatTravail');
    modalbContent.classList.add('modalbContent');
    barre.classList.add('barre');
    iconeImg.classList.add("fa-regular", "fa-image")

    formIcone.classList.add('formIcone');
    precedentIcon.classList.add("fas", "fa-arrow-left", "precedent-icon");
    fermerFenetre.classList.add("fas", "fa-times", "fermerFenetre");
    precedentIcon.classList.add("precedentModal");
    fermerFenetre.classList.add("fermerModal")

    //je mets les icones dans un bouton chacun puis les boutons dans une div
    formIcone.appendChild(boutonP);
    formIcone.appendChild(boutonX);
    boutonP.appendChild(precedentIcon);
    boutonX.appendChild(fermerFenetre);

    // je met dans le formulaire, la div avec une icone, un boutton et le type d image accepté
    imgForm.appendChild(iconeImg);
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
    formModal.appendChild(inputCat);
    formModal.appendChild(barre);
    formModal.appendChild(submitForm);

// je créé un evenement au click qui ferme la modal actuelle et ouvre la modale du formulaire
    ajouterPhotoButton.addEventListener('click', () => {
        modalb.style.display = 'flex';
        modal.style.display = "none";
        formModal.reset();
    });

    ajoutImg.addEventListener('change', (event) => {
        const selectedImage = event.target.files[0];
    });

    boutonX.addEventListener('click', () => {
        modalb.style.display = 'none';
        modal.style.display = "none";
    });

    boutonP.addEventListener('click', () => {
        modalb.style.display = 'none';
        modal.style.display = "flex";
    });

    window.addEventListener('click', (event) => {
        if (event.target == modalb) {
            modalb.style.display = 'none';
            modal.style.display = "flex";
        }
    });
}

function nouveauTravail() {
    const envoi = document.querySelector('.submitFormulaire');
    console.log("Affiche où se trouve le bouton d'envoi :", envoi);

    envoi.addEventListener("click", function (event) {
        event.preventDefault(); // Empêche la soumission du formulaire

        const title = document.querySelector('.inputTitreTravail').value;
        const categorieID = document.querySelector('.inputCatTravail').value;
        const inputImg = document.querySelector('.inputImgTravail');
        const selectedImage = inputImg.files[0];

        console.log("titre =", title, "categorie =", categorieID, "image =", selectedImage);

        const formData = new FormData();
        formData.append('title', title);
        formData.append('imageURL', selectedImage);
        formData.append('categorieID', categorieID);

        const optionRequetePost = {
            method: 'POST',
            body: formData,
        };
        console.log("Ce que contient la const optionRequete", optionRequetePost);

        fetch("http://localhost:5678/api/works", optionRequetePost)
        .then(response => {
            if (!response.ok) {
                window.alert('Problème dans la transmission');
            }
            return response.json(); // Convertir la réponse en JSON
        })
        .then(responseData => {
            console.log("Réponse du serveur :", responseData);
    
            // Vérifiez les données de la réponse et agissez en conséquence
            if (responseData.success) {
                // Le travail a été créé avec succès
                console.log('Travail créé avec succès');
                // Vous pouvez effectuer des actions supplémentaires ici, par exemple, afficher un message de succès
            } else {
                // Le serveur a renvoyé une réponse avec "success" à false, indiquant un échec
                console.log('Échec de la création du travail');
                // Vous pouvez afficher un message d'erreur ou prendre d'autres mesures en conséquence
            }
        })
        .catch(error => {
            // Gérer les erreurs, par exemple, afficher un message d'erreur
            console.error('Erreur de connexion :', error);
        });
    });
}









// A partir d'ici tout fonctionne 

const token = sessionStorage.getItem('token');
console.log("le fameux token", token);

/*function supprimerToken() {
    sessionStorage.removeItem('token');
}*/

function afficherTravauxModal(works) {
    const galleryModif = document.querySelector("#galleryModif");

    for (let i = 0; i < works.length; i++) {
        const travail = works[i];
        const element = document.createElement("figure");
        const imageElement = document.createElement("img");
        const deleteIcon = document.createElement("i");

        element.classList.add("image-container");
        imageElement.classList.add("modal-image");
        deleteIcon.classList.add("fas", "fa-trash-can", "delete-icon");

        imageElement.src = travail.imageUrl;

        galleryModif.appendChild(element);
        element.appendChild(deleteIcon);
        element.appendChild(imageElement);
    }
}

function nettoyerTravauxModal() {
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

if (token) {
    console.log("Il y a un token dans le sessionStorage");

    modification.style.display = "flex";

    const openModalButton = document.getElementById('openModal');
    const closeModalButton = document.getElementById('closeModal');
    const modal = document.getElementById('modal');
    
    const filtre = document.querySelector(".filtre");
    filtre.style.display = "none";

    openModalButton.addEventListener('click', () => {
        modal.style.display = 'flex';
        travauxModal();
    });

    closeModalButton.addEventListener('click', () => {
        modal.style.display = 'none';
        nettoyerTravauxModal();
    });

    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
            nettoyerTravauxModal();
        }
    });

    // Attachez un gestionnaire d'événements à l'événement beforeunload pour supprimer le token lors de la fermeture de la page
    window.addEventListener('beforeunload', supprimerToken);
} 
else {
    console.log("Il n'y a rien dans le sessionStorage");
    modal.style.display = "none";
}