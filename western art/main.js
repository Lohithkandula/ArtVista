const container = document.getElementById('artContainer');
const apiUrl = 'https://api.artic.edu/api/v1/artworks?fields=id,title,artist_display,date_display,main_reference_number,image_id';

fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    // Process the retrieved data and render it on the page
    renderArtworks(data.data);
  })
  .catch(error => {
    console.error('Error:', error);
  });

function renderArtworks(artworks) {
  artworks.forEach(artwork => {
    // Access the relevant data from each artwork and create HTML elements to display it
    const cardElement = document.createElement('div');
    cardElement.classList.add('card', 'mb-4');

    const imageUrl = `https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,1000/0/default.jpg`;

    const imageLinkElement = document.createElement('a');
    imageLinkElement.setAttribute('href', imageUrl);
    imageLinkElement.setAttribute('data-lightbox', 'artworks');
    imageLinkElement.setAttribute('data-title', artwork.title);

    const imageElement = document.createElement('img');
    imageElement.src = imageUrl;
    imageElement.classList.add('card-img-top');
    imageLinkElement.appendChild(imageElement);
    cardElement.appendChild(imageLinkElement);

    const cardBodyElement = document.createElement('div');
    cardBodyElement.classList.add('card-body');

    const titleElement = document.createElement('h5');
    titleElement.classList.add('card-title');
    titleElement.textContent = artwork.title;
    cardBodyElement.appendChild(titleElement);

    const artistElement = document.createElement('p');
    artistElement.classList.add('card-text');
    artistElement.textContent = 'Artist: ' + artwork.artist_display;
    cardBodyElement.appendChild(artistElement);

    const dateElement = document.createElement('p');
    dateElement.classList.add('card-text');
    dateElement.textContent = 'Date: ' + artwork.date_display;
    cardBodyElement.appendChild(dateElement);

    const referenceNumberElement = document.createElement('p');
    referenceNumberElement.classList.add('card-text');
    referenceNumberElement.textContent = 'Reference Number: ' + artwork.main_reference_number;
    cardBodyElement.appendChild(referenceNumberElement);

    cardElement.appendChild(cardBodyElement);
    container.appendChild(cardElement);
  });

  // Initialize Lightbox
  const lightbox = new Lightbox();

  // Implement GSAP animations and interactions
  const cards = document.querySelectorAll('.card');

  cards.forEach(card => {
    card.addEventListener('mouseover', () => {
      gsap.to(card, { scale: 1.05, duration: 0.3 });
    });

    card.addEventListener('mouseout', () => {
      gsap.to(card, { scale: 1, duration: 0.3 });
    });
  });
}

// Lightbox class
function Lightbox() {
  const lightbox = this;
  const images = document.querySelectorAll('[data-lightbox="artworks"]');

  images.forEach(image => {
    image.addEventListener('click', e => {
      e.preventDefault();
      lightbox.open(image.getAttribute('href'), image.getAttribute('data-title'));
    });
  });

  this.open = (imageUrl, title) => {
    // Create and display the lightbox overlay
    const overlay = document.createElement('div');
    overlay.classList.add('lightbox-overlay');
    document.body.appendChild(overlay);

    // Create and display the lightbox content
    const content = document.createElement('div');
    content.classList.add('lightbox-content');

    const image = document.createElement('img');
    image.src = imageUrl;
    image.classList.add('lightbox-image');
    content.appendChild(image);

    const imageTitle = document.createElement('p');
    imageTitle.classList.add('lightbox-title');
    imageTitle.textContent = title;
    content.appendChild(imageTitle);

    overlay.appendChild(content);

    // Close the lightbox when overlay or content is clicked
    overlay.addEventListener('click', lightbox.close);
    content.addEventListener('click', lightbox.close);
  };

  this.close = () => {
    const overlay = document.querySelector('.lightbox-overlay');
    if (overlay) {
      overlay.remove();
    }
  };
}



