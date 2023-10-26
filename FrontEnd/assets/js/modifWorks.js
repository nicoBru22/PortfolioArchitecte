const token = sessionStorage.getItem('token');
console.log("le fameux token", token);

function afficherTravauxModal(works) {
    for (let i = 0; i < works.length; i++) {
        const travail = works[i];
        const galleryModif = document.querySelector("#galleryModif");
        const element = document.createElement("figure");
        const imageElement = document.createElement("img");
        imageElement.classList.add("modal-image");

        imageElement.src = travail.imageUrl;
        galleryModif.appendChild(element);
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

    nettoyerTravauxModal(); // Nettoyez la modal avant d'ajouter de nouveaux travaux
    afficherTravauxModal(travaux);
    formulaireAjout();
}

// Créez un bouton "Ajouter une photo" dans votre HTML avec l'id "ajouterPhotoButton"

function formulaireAjout() {
    const ajouterPhotoButton = document.getElementById('ajouterPhotoButton');
    const closeModalForm = document.getElementById('closeModalForm');
    const modalb = document.getElementById('modalb');
    
    ajouterPhotoButton.addEventListener('click', () => {
        modalb.style.display = 'flex'; // Affiche la fenêtre modale d'ajout de photo
    });

    closeModalForm.addEventListener('click', () => {
        modalb.style.display = 'none';
    })

    window.addEventListener('click', (event) => {
        if (event.target == modalb) {
            modalb.style.display = 'none';
        }
    });
}

    
function envoyerForm () {// Gestionnaire d'événements pour soumettre le formulaire
    const photoForm = document.getElementById('photoForm');
    photoForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // Empêche la soumission du formulaire (à personnaliser)
    
        // Traitez le téléchargement de la photo ici (par exemple, à l'aide de fetch)
        // Une fois le téléchargement terminé, vous pouvez réinitialiser le formulaire.
        const formData = new FormData(photoForm);
        const response = await fetch("URL_du_serveur_pour_télécharger_la_photo", {
            method: 'POST',
            body: formData,
        });
        // Ajoutez ici la logique pour gérer la réponse du serveur après le téléchargement.
    
        photoForm.reset(); // Réinitialisez le formulaire
    });
}









//code se met en route s'il y a un token




if (token) {
    console.log("Il y a un token dans le sessionStorage");

    const openModalButton = document.getElementById('openModal');
    const closeModalButton = document.getElementById('closeModal');
    const modal = document.getElementById('modal');
    
    const filtre = document.querySelector(".filtre");
    filtre.style.display = "none";

    openModalButton.addEventListener('click', () => {
        modal.style.display = 'flex';
        travauxModal();
    });

    // Fermer la fenêtre modale et nettoyer les travaux précédemment affichés
    closeModalButton.addEventListener('click', () => {
        modal.style.display = 'none';
        nettoyerTravauxModal();
    });

    // Fermer la fenêtre modale en cliquant en dehors de la boîte de dialogue
    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
            nettoyerTravauxModal();
        }
    });
} else {
    console.log("Il n'y a rien dans le sessionStorage");
    modal.style.display = "none";
}
