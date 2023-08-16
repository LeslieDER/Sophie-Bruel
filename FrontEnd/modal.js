document.addEventListener("DOMContentLoaded", function () {
    const galleryElement = document.getElementById('Container_gallery');
    const filterForm = document.getElementById('filterForm');
    const miniGallery = document.getElementById('mini_gallery');
    const modifierButton = document.getElementById('modifier-button'); // The "Modifier" button
    const modal = document.getElementById('myModal');
    const closeButton = document.querySelector('.close');
    let tokenValue = localStorage.getItem('token');
 

    // Fetch and populate the main gallery
    function loadMainGallery() {
        // Fetch and populate the main gallery content here
        // ...
    }

    // Fetch and populate the mini gallery
    function loadMiniGallery() {
        fetch('http://localhost:5678/api/works')
            .then(response => response.json())
            .then(data => {
                miniGallery.innerHTML = '';

                // Loop through the data retrieved from the API
                data.forEach(work => {
                    const thumbnail = document.createElement('div');
                    thumbnail.classList.add('thumbnail');

                    const imgElement = document.createElement('img');
                    imgElement.src = work.imageUrl;
                    imgElement.alt = work.title;

                    const editLink = document.createElement('button'); // Créer un lien "Éditer"
                    editLink.textContent = 'Supprimer';
                    editLink.addEventListener('click', () => deletework(work.id)); // Appeler la fonction d'édition au clic
                    thumbnail.appendChild(imgElement);
                    thumbnail.appendChild(editLink); // Ajouter le lien "Éditer" à la div thumbnail
                    miniGallery.appendChild(thumbnail);
                });
            })
            .catch(error => {
                console.error(error);
            });
    }

    function deletework(workId) {
        console.log(localStorage.getItem('token'))
        console.log('deletework')
        fetch(`http://localhost:5678/api/works/${workId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${tokenValue}`
            }
        })
        .then(response => {
            if (response.ok) {
                console.log(`Work with ID ${workId} has been deleted.`);
                // Mettre à jour la galerie après la suppression réussie
                loadMiniGallery();
            } else {
                console.error(`Failed to delete work with ID ${workId}.`);
            }
        })
        .catch(error => {
            console.error(error);
        });
    }
    

    // Load the main gallery when the page loads
    loadMainGallery();

    function handleCategoryClick(event) {
        // Your existing handleCategoryClick function
        // ...
    }

    // Add an event listener to the "Modifier" button to show the modal
    modifierButton.addEventListener('click', function () {
        modal.style.display = 'block';
        loadMiniGallery(); // Load the mini gallery when the modal is shown
        addForm.addEventListener('submit', function(event) {
            event.preventDefault();
    
            const photoInput = document.getElementById('photo');
            const titleInput = document.getElementById('title');
            const categoryInput = document.getElementById('category');
    
            const photo = photoInput.files[0];
            const title = titleInput.value;
            const category = parseInt(categoryInput.value); // Convertir la catégorie en entier
    
            const formData = new FormData();
            formData.append('image', photo);
            formData.append('title', title);
            formData.append('category', category);
    
            fetch('http://localhost:5678/api/works', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                // Une fois l'ajout réussi, chargez à nouveau la galerie pour la mettre à jour
                loadMiniGallery();
            })
            .catch(error => {
                console.error(error);
            });
        });
        document.getElementById("add-picture-button").addEventListener("click", showAddPhotoForm);
    });


    // Add an event listener to the close button to hide the modal
    closeButton.addEventListener('click', function () {
        modal.style.display = 'none';
        loadMainGallery(); // Load the main gallery when the modal is closed
    });


    const closeFormButton = document.querySelector('.Container_form_picture .close_modal');

// Ajoutez un gestionnaire d'événements au bouton de fermeture dans la deuxième partie du modal
closeFormButton.addEventListener('click', function () {
    // Masquez le modal en changeant son style de display à "none"
    modal.style.display = 'none';
});

// Sélectionnez le bouton "Ajouter une photo"
const ajout_photo = document.querySelector('#add-picture-button .modal_fonction');

// Sélectionnez les éléments des deux parties du modal
const containerGallery = document.getElementById('Container_gallery');
const containerFormPicture = document.getElementById('Container_form_picture');

// Ajoutez un gestionnaire d'événements au bouton "Ajouter une photo"
ajout_photo.addEventListener('click', function () {
    // Masquez la première partie et affichez la deuxième partie du modal
    containerGallery.style.display = 'none';
    containerFormPicture.style.display = 'block';
});

    // Add event listeners to filter elements (if needed)
    const categoryElements = filterForm.querySelectorAll('h2');
    categoryElements.forEach(element => {
        element.addEventListener('click', handleCategoryClick);
    });



    function showGallery() {
        document.getElementById("Container_form_picture").style.display = "none";
        galleryElement.style.display = "block";
        loadMainGallery(); // Load the main gallery when showing the main content
    }
    document.getElementById("nav-button").addEventListener("click", showGallery);

    const addForm = document.getElementById('addPhotoForm');
    const addPhotoButton = document.getElementById('add-picture-button');

    // Gérer l'ouverture/fermeture du modal
    addPhotoButton.addEventListener('click', function() {
        modal.style.display = 'block';
    });

    closeButton.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    // Chargez la galerie au chargement de la page
    loadMiniGallery();
});



