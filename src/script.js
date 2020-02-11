/* eslint-disable prettier/prettier */
const hamburger = document.querySelector('#hamburger');
const navbar= document.querySelector('#navbar');
const content = document.querySelector('#main');
const moviePosters = document.querySelectorAll('.poster');
const modalOuter = document.querySelector('.modal-outer');
const modalInner = document.querySelector('.modal-inner');

const posterDetail = [
  '/src/images/comedy1details.jpg',
  '/src/images/comedy2details.jpg',
  '/src/images/comedy3details.jpg',
  '/src/images/comedy4details.jpg',
  '/src/images/action1details.jpg',
  '/src/images/action2details.jpg',
  '/src/images/action3details.jpg',
  '/src/images/action4details.jpg',
  '/src/images/adrama1details.jpg',
  '/src/images/adrama2details.jpg',
  '/src/images/adrama3details.jpg',
  '/src/images/adrama4details.jpg',
]

function close(element) {
  element.classList.remove('open');
}

function openNavbar() {
  navbar.classList.toggle('open');
  content.addEventListener('click',function(e) {
    const outside = !e.target.closest('navbar');
    if (outside) {
      close(navbar);
    }
  });
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
      close(navbar);
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
  const imgSrcExtract = imgSrc.match(/(i)(\w+)......../)[0];
  const name = movie.querySelector('img').alt;
  const desc = movie.dataset.description;

  posterDetail.forEach(function(url) {
    const urlDetailExtract = url.match(/(i)(\w+)......../)[0];
    if (imgSrcExtract.match(urlDetailExtract)) {
      // populate the modal with the new info
      modalInner.innerHTML =`
      <img width="100%" height="auto" src="${url}" alt="${name}" />
      <p>${desc}</>
    `;
    }
  });

  // show the modal
  modalOuter.classList.add('open');
}

moviePosters.forEach(poster => 
  poster.addEventListener('click', handlePosterClick));

modalOuter.addEventListener('click',function(e) {
  const isOutside = !e.target.closest('.modal-inner');
  if (isOutside) {
    close(modalOuter);
  }
});

window.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    close(modalOuter);
  }
});