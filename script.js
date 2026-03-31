const lightbox = document.getElementById('lightbox');
const lbImage = document.getElementById('lightbox-image');
const caption = document.getElementById('caption');
const counter = document.getElementById('counter');
const closeBtn = document.querySelector('.close');
const prevBtn = document.querySelector('.nav.prev');
const nextBtn = document.querySelector('.nav.next');

let currentIndex = 0;
let visibleCards = [];

const allCards = document.querySelectorAll('.card');

function updateVisibleCards() {
  visibleCards = Array.from(allCards).filter(card => !card.classList.contains('hidden'));
}

function openLightbox(index) {
  currentIndex = index;
  const card = visibleCards[index];
  lbImage.src = card.querySelector('img').src;
  lbImage.alt = card.dataset.title;
  caption.textContent = card.dataset.title;
  counter.textContent = `${index + 1} / ${visibleCards.length}`;
  lightbox.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.add('hidden');
  document.body.style.overflow = '';
}

function nextImage() {
  currentIndex = (currentIndex + 1) % visibleCards.length;
  openLightbox(currentIndex);
}

function prevImage() {
  currentIndex = (currentIndex - 1 + visibleCards.length) % visibleCards.length;
  openLightbox(currentIndex);
}

// Filtering
document.querySelectorAll('.filter').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filterValue = btn.dataset.filter;

    allCards.forEach(card => {
      if (filterValue === 'all' || card.classList.contains(filterValue)) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });

    updateVisibleCards();

    // Close lightbox if current image is no longer visible
    if (!lightbox.classList.contains('hidden')) {
      if (visibleCards.length === 0 || currentIndex >= visibleCards.length) {
        closeLightbox();
      }
    }
  });
});
// Events
closeBtn.onclick = closeLightbox;
nextBtn.onclick = nextImage;
prevBtn.onclick = prevImage;

lightbox.onclick = e => {
  if (e.target === lightbox) closeLightbox();
};

window.addEventListener('keydown', e => {
  if (lightbox.classList.contains('hidden')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowRight') nextImage();
  if (e.key === 'ArrowLeft') prevImage();
});

// Card clicks
allCards.forEach((card, idx) => {
  card.addEventListener('click', () => {
    updateVisibleCards();
    const visibleIdx = visibleCards.indexOf(card);
    if (visibleIdx !== -1) openLightbox(visibleIdx);
  });
});

// Initial
updateVisibleCards();