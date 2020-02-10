/* eslint-disable prettier/prettier */
const hamburger = document.querySelector('#hamburger');
const navbar= document.querySelector('#navbar');
const content = document.querySelector('#main');
const moviePosters = document.querySelectorAll('.poster');
const modalOuter = document.querySelector('.modal-outer');
const modalInner = document.querySelector('.modal-inner');

const posterDetail = [
  'images/comedy1details.jpg',
  'images/comedy2details.jpg',
  'images/comedy3details.jpg',
  'images/comedy4details.jpg',
  'images/action1details.jpg',
  'images/action2details.jpg',
  'images/action3details.jpg',
  'images/action4details.jpg',
  'images/drama1details.jpg',
  'images/drama2details.jpg',
  'images/drama3details.jpg',
  'images/drama4details.jpg',
]

function openNavbar() {
  navbar.classList.toggle('open');
  content.addEventListener('click',function(e) {
    const outside = !e.target.closest('navbar');
    if (outside) {
      closeNavbar();
    }
  });
}

function closeNavbar() {
  navbar.classList.remove('open');
}

function handleSmoothScroll() {
  const anchors = document.querySelectorAll('.smooth-scroll');
  anchors.forEach(anchor =>
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const el = e.currentTarget;
      const id = document.getElementById(
        el.href.match(/#.*$/)[0].slice(1)
        );
        id.scrollIntoView({
          behavior: 'smooth',
        });
      closeNavbar();
    })
  );
}

window.addEventListener('load',handleSmoothScroll);
hamburger.addEventListener('click', openNavbar);

function handlePosterClick(e) {
  const elClicked = e.currentTarget;
  const movie = elClicked.closest('.movie-poster');

  // Grab the image src
  const imgSrc = movie.querySelector('img').src;
  const imgSrcExtract = imgSrc.slice(22,36);
  const name = movie.querySelector('img').alt;
  const desc = movie.dataset.description;

  posterDetail.forEach(function(url) {
    const urlDetailExtract = url.slice(0,14);
    if (imgSrcExtract.match(urlDetailExtract)) {
      // populate the modal with the new info
      modalInner.innerHTML =`
      <img src="${urlDetailExtract}details.jpg" alt="${name}" />
      <p>${desc}</>
    `;
    }
  });

  // show the modal
  modalOuter.classList.add('open');
}

function closeModal() {
  modalOuter.classList.remove('open');
}

moviePosters.forEach(poster => 
  poster.addEventListener('click', handlePosterClick));

modalOuter.addEventListener('click',function(e) {
  const isOutside = !e.target.closest('.modal-inner');
  if (isOutside){
    closeModal();
  }
});

window.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeModal();
  }
});