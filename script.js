/* eslint-disable prettier/prettier */
const hamburger = document.querySelector('#hamburger');
const navbar= document.querySelector('#navbar');
const content = document.querySelector('#main');
const moviePoster = document.querySelectorAll('.poster');
const modalOuter = document.querySelector('.modal-outer');
const modalInner = document.querySelector('.modal-inner');

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

hamburger.addEventListener('click', openNavbar);

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


function handlePosterClick(e) {
  const elClicked = e.currentTarget;
  const movie = elClicked.closest('.movie-poster');

  // Grab the image src
  // const imgSrc = movie.querySelector('img').src;
  const desc = movie.dataset.description;

  // populate the modal with the new info
  modalInner.innerHTML =`
  <img src="${'images/comedy1details.jpg'}" />
  <p>${desc}</p>
  `;

  // show the modal
  modalOuter.classList.add('open');
}

function closeModal() {
  modalOuter.classList.remove('open');
}

modalOuter.addEventListener('click',function(e) {
  const isOutside = !e.target.closest('.modal-inner');
  if (isOutside){
    closeModal();
  }
});

moviePoster.forEach(poster => poster.addEventListener('click', handlePosterClick));
