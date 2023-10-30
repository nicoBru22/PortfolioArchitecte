function afficherFormulaire() {
    const ajouterPhotoButton = document.getElementById('ajouterPhotoButton');
    const modalb = document.getElementById('modalb');
    let selectedImage;

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
        iconeImg.classList.add("fa-regular", "fa-image")
        imgAffiche.id = 'imageAffiche';
        formIcone.classList.add('formIcone');
        precedentIcon.classList.add("fas", "fa-arrow-left", "precedent-icon");
        fermerFenetre.classList.add("fas", "fa-times", "fermerFenetre");
        precedentIcon.classList.add("precedentModal");
        fermerFenetre.classList.add("fermerModal")
        formatImg.innerText = "jpg, png : 4mo max";
        imgForm.classList.add("divImgForm")

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
        formModal.appendChild(submitForm);

        boutonX.addEventListener('click', () => { //bouton fermer
            modalb.style.display = 'none';
            modal.style.display = "none";
        });
    
        boutonP.addEventListener('click', () => { //bouton precedent
            modalb.style.display = 'none';
            modal.style.display = "flex";
        });
    
        window.addEventListener('click', (event) => { // si je click en dehors de la fenetre
            if (event.target == modalb) {
                modalb.style.display = 'none';
                modal.style.display = "none";
            }
        });

        //ouvre la modalb actuelle et ferme la modale du formulaire
        ajouterPhotoButton.addEventListener('click', () => {
            modalb.style.display = 'flex';
            modal.style.display = "none";
            formModal.reset();
        });

    fetch("http://localhost:5678/api/categories", { method: 'GET' })
        .then(response => response.json())
        .then(data => {
            const selectCat = document.querySelector('.selectCatTravail');

            // Ajoutez les catégories à la liste déroulante
            data.forEach(category => {
                const option = document.createElement('option');
                option.value = category.id; // Vous devez ajuster cela en fonction de la structure des données
                option.text = category.name; // Vous devez ajuster cela en fonction de la structure des données
                selectCat.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des catégories :', error);
        });


    ajoutImg.addEventListener('change', (event) => {
        selectedImage = event.target.files[0];
        console.log("console log dans l addeventlistener",selectedImage)
    
        // Maintenant que vous avez l'image, vous pouvez effectuer des actions telles que l'afficher à l'utilisateur.
        // Par exemple, vous pourriez créer une prévisualisation de l'image :
        const imagePreview = document.getElementById('imageAffiche');
        const reader = new FileReader();
        reader.onload = function () {
            imagePreview.src = reader.result;
        };
        reader.readAsDataURL(selectedImage);
    });

    console.log("cosollog après l evenement", selectedImage)

    // j'envoi le formulaire sur le serveur

    formModal.addEventListener('submit', (event) => {
        event.preventDefault(); // Empêche le rechargement de la page par défaut

        // Récupérez les valeurs du formulaire
        const form = new FormData();
        const image = ajoutImg.files[0];
        const titre = inputTitre.value;
        const categorie = selectCat.value;
        

        console.log("le titre =", inputTitre.value)
        console.log("la categorie =", selectCat.value)
        console.log("l image en question", image)

        form.append("image", image);
        form.append("title", titre);
        form.append("category", categorie);




    // Effectuez la requête POST pour envoyer le formulaire
    console.log("on a quoi ?", form)
    fetch("http://localhost:5678/api/works", {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        body: form,
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                window.alert('Bravo, le travail a été créé avec succès.');
            } else {
                window.alert('Ça n\'a pas marché. Le travail n\'a pas été créé.');
            }

        })
        .catch(error => {
            console.error('Erreur lors de l\'envoi du formulaire :', error);
        });
    });

}









// A partir d'ici tout fonctionne 

const token = sessionStorage.getItem('token');
console.log("le fameux token", token);

function supprimerToken() {
    sessionStorage.removeItem('token');
}

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
        
        deleteIcon.addEventListener('click', () => {
        
            const optionRequetePostDelete = {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            };
            console.log("Ce que contient la const optionRequete", optionRequetePostDelete, travail.id);
    
            fetch("http://localhost:5678/api/works/"+travail.id, optionRequetePostDelete);
            // Une fois l'image supprimée, vous pouvez mettre à jour l'affichage
            element.remove();
        });

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