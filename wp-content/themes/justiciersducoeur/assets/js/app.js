// COMMONS

const body = document.body;
const homePage = document.querySelector('#home');
const engagePage = document.querySelector('#engage');

// HEADER SCROLL 

let scrollpos = window.scrollY
const header = document.querySelector("header")
const header_height = header.offsetHeight

const add_class_on_scroll = () => header.classList.add("header-scroll")
const remove_class_on_scroll = () => header.classList.remove("header-scroll")

window.addEventListener('scroll', function() { 
  scrollpos = window.scrollY;

  if (scrollpos >= header_height / 2) { add_class_on_scroll() }
  else { remove_class_on_scroll() }

  //console.log(scrollpos)
})

// MENU

const openNavBtn = document.querySelector('.open-nav');
const closeNavBtn = document.querySelector('.close-nav');

openNavBtn.addEventListener('click', (e) => {
  e.preventDefault();
  body.classList.add('nav-open');
})

closeNavBtn.addEventListener('click', (e) => {
  e.preventDefault();
  body.classList.remove('nav-open');
})

// SLIDER PHOTO HOME

if(homePage) {
  const sliderPhoto = tns({
    container: '.photo-pres-mobile',
    items: 3,
    sliderBy: 1,
    autoplay: false,
    controlsContainer: '.slide-pres-btn',
    center: true,
    responsive: {
      800: {
        items: 3,
      }
    }
  })

  sliderPhoto.getInfo();

  const activeInit = document.querySelectorAll('.tns-slide-active')[1].classList.add('active');

  document.querySelector('.slide-pres-btn .right').onclick = function () {
    // get slider info
    var info = sliderPhoto.getInfo(),
        indexPrev = info.indexCached,
        indexCurrent = info.index;

    console.log(info)

    // update style based on index
    info.slideItems[indexPrev].classList.remove('active');
    info.slideItems[indexCurrent + 1].classList.add('active');
  };

  document.querySelector('.slide-pres-btn .left').onclick = function () {
    // get slider info
    var info = sliderPhoto.getInfo(),
        indexPrev = info.indexCached,
        indexCurrent = info.index;

    console.log(info)

    // update style based on index
    info.slideItems[indexPrev].classList.remove('active');
    info.slideItems[indexCurrent - 1].classList.add('active');
  };
}



// SLIDER ACTU 

const sliderPostBtn = document.querySelector('#home .list-posts .slide-btn');
const listPosts = document.querySelector('.list-posts');

if(homePage && listPosts || engagePage && listPosts) {
  const sliderPost = tns({
    container: '.list-posts',
    items: 1,
    sliderBy: 1,
    autoplay: false,
    gutter: 32,
    controlsContainer: '.slide-btn',
    responsive: {
      1160: {
        items: 3
      },
      800: {
        items: 2
      }
    }
  })
}


// SLIDER SKINS 

//const sliderSkinsBtn = document.querySelector('#home .list-posts .slide-btn');

if(engagePage) {
  const sliderSkins = tns({
    container: '.skins-list',
    items: 1,
    sliderBy: 1,
    autoplay: false,
    gutter: 32,
    controlsContainer: '.slide-btn',
    responsive: {
      1160: {
        items: 4
      },
      800: {
        items: 2
      }
    }
  })
}

// PARALLAX HOME 

if(homePage) {
  const scene = document.getElementById('scene');
  const parallaxInstance = new Parallax(scene);
}

// RELLAX

const rellax = new Rellax('.rellax');

// MODAL 

// On récupère notre lien 

const linkModal = document.querySelectorAll('.link-modal')

linkModal.forEach((link) => {
  link.addEventListener('click', (e) => {

    e.preventDefault()

    // On récupère la destination
    destinationModal = link.getAttribute('href')

    // On affiche la modal 
    modalToActivate = document.querySelector(destinationModal)
    modalToActivate.style.top = '50%'

    // On créé un overlay
    const modalOverlay = document.createElement('div')
    modalOverlay.classList.add('modal-overlay')
    modalOverlay.setAttribute('data-modal', destinationModal)

    document.body.appendChild(modalOverlay)

    // Au click sur l'overlay
    modalOverlay.addEventListener('click', (e) => {
      e.preventDefault()

      const destinationToDeactivate = modalOverlay.getAttribute('data-modal')

      const modalToDeactivate = document.querySelector(destinationToDeactivate)

      const videoPlay = document.querySelector('.modal-content iframe')

      videoPlay.contentWindow.postMessage('{"event":"command","func":"' + 'stopVideo' + '","args":""}', '*')

      modalToDeactivate.style.top = '-900%'

      document.querySelector('.modal-overlay').remove()
    })

    // On récupère le bouton pour fermer la modal
    const closeModal = document.querySelector(destinationModal + ' .close-modal')

    closeModal.addEventListener('click', (e) => {
      e.preventDefault()
    
      const getModalToClose = closeModal.getAttribute('href')
    
      const modalToClose = document.querySelector(getModalToClose)

      const videoPlay = document.querySelector('.modal-content iframe')

      videoPlay.contentWindow.postMessage('{"event":"command","func":"' + 'stopVideo' + '","args":""}', '*')
    
      modalToClose.style.top = '-900%'
    
      document.querySelector('.modal-overlay').remove()  
    })
  })
})