// Écoutez l'événement de soumission du formulaire d'authentification
const loginForm = document.getElementById('loginForm'); // Remplacez "loginForm" par l'ID de votre formulaire
loginForm.addEventListener('submit', function(event) {
    event.preventDefault();

    // Obtenez la valeur de l'email à partir du champ de saisie
    const emailInput = document.getElementById('email');
    const email = emailInput.value;

    // Obtenez la valeur du mot de passe (vous pouvez ajouter un champ de saisie pour le mot de passe de la même manière)
    const passwordInput = document.getElementById('password');
    const password = passwordInput.value;

    // Envoyez la requête d'authentification
    fetch('http://localhost:5678/api/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    })
    .then(response => response.json())
    .then(data => {
        const token = data.token; // Obtenez le jeton d'authentification
        console.log('Authentification réussie !', token);
        
        const redirectUrl = `index.html?token=${token}`;
        localStorage.setItem('token',token)
        console.log(localStorage.getItem('token'))
    
        // Redirigez l'utilisateur vers index.html avec le token dans l'URL
        window.location.href = redirectUrl;
    })
    .catch(error => {
        console.error('Erreur d\'authentification :', error);
    });
});

// Dans le fichier "index.html"

// Extrait le token de l'URL
const urlParams = new URLSearchParams(window.location.search);
const token = urlParams.get('token');

// Appelle la fonction deletework avec le token
//deletework(workId, token);

/*function deletework(workId, token) {
    fetch(`http://localhost:5678/api/works/${workId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
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
}*/
