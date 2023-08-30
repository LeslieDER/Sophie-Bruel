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
        
        // Redirigez l'utilisateur vers index.html avec le token dans l'URL
        const redirectUrl = `index.html?token=${token}`;
        localStorage.setItem('token', token);
        window.location.href = redirectUrl;

    })
    .catch(error => {
        console.error('Erreur d\'authentification :', error);
    });
});


function logout() {
  // Supprimer le token du local storage
  localStorage.removeItem('token');
  
  // Rediriger l'utilisateur vers la page de connexion (ou une autre page appropriée)
  window.location.href = 'login.html'; // Remplacez par l'URL de votre page de connexion
}
