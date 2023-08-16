fetch('http://localhost:5678/api/works')
  .then(response => response.json())
  .then(data => {
    const galleryElement = document.getElementById('gallery');
    const filterForm = document.getElementById('filterForm');

    function updateGallery() {
      const selectedCategoryId = filterForm.querySelector('h2.selected').getAttribute('data-category');

      // Supprimer tous les éléments de la galerie
      while (galleryElement.firstChild) {
        galleryElement.removeChild(galleryElement.firstChild);
      }

      // Parcourir les données récupérées
      data.forEach(work => {
        const categoryId = work.category.id;

        // Vérifier si la valeur du filtre correspond à la valeur de categoryId
        if (
          selectedCategoryId === 'tous' ||
          (selectedCategoryId === 'objets' && categoryId === 1) ||
          (selectedCategoryId === 'appartements' && categoryId === 2) ||
          (selectedCategoryId === 'hotels-restaurants' && categoryId === 3)
        ) {
          const figureElement = document.createElement('figure');
          figureElement.setAttribute('data-category-id', categoryId);

          const imgElement = document.createElement('img');
          imgElement.src = work.imageUrl;
          imgElement.alt = work.title;

          const figcaptionElement = document.createElement('figcaption');
          figcaptionElement.textContent = work.title;

          figureElement.appendChild(imgElement);
          figureElement.appendChild(figcaptionElement);

          galleryElement.appendChild(figureElement);
        }
      });
    }

    function handleCategoryClick(event) {
      // Retirer la classe 'selected' de tous les éléments de filtre
      const categoryElements = filterForm.querySelectorAll('h2');
      categoryElements.forEach(element => {
        element.classList.remove('selected');
      });

      // Ajouter la classe 'selected' à l'élément de catégorie cliqué
      const clickedElement = event.target;
      clickedElement.classList.add('selected');

      updateGallery();
    }

    const categoryElements = filterForm.querySelectorAll('h2');
    categoryElements.forEach(element => {
      element.addEventListener('click', handleCategoryClick);
    });

    updateGallery();
  })
  .catch(error => {
    console.error(error);
  });


