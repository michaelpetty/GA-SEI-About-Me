
let elemFadeToggle = (elem, setHidden) => {
  let fadeIn = elem.classList.toggle('fadeIn')
  if (!fadeIn && setHidden) {
    setTimeout(() => {elem.classList.add('hidden')}, 1001);
  } else {
    elem.classList.remove('hidden');
  }
}

// add active label to nav based on position
let navLinks = document.querySelectorAll(".linkBox a");

window.addEventListener("scroll", event => {
  let fromTop = window.scrollY + 100; //offset navbar

  navLinks.forEach(link => {
    let section = document.querySelector(link.hash);

    if (section.offsetTop <= fromTop && (section.offsetTop + section.offsetHeight) > fromTop
    ) {
      link.classList.add("activeNav");
    } else {
      link.classList.remove("activeNav");
    }
  })
})

// splash words
setInterval(elemFadeToggle, 3000, document.getElementById('splash1'));
setTimeout(setInterval, 3000, elemFadeToggle, 3000, document.getElementById('splash2'));
setTimeout(setInterval, 5000, elemFadeToggle, 3000, document.getElementById('splash3'));


// carousel
let slideGroup = document.querySelector('.slides');
let slides = slideGroup.querySelectorAll('img');
const slidesNum = slides.length;
let dots = document.querySelectorAll('.dot');

//show last slide under previous arrow on first slide
slideGroup.prepend(slides[slidesNum-1]);
let dotPos = 0;

document.querySelector('.arrowNext').addEventListener('click', () => {
  //move dots
  dots[dotPos].classList.remove('active');
  dotPos++;
  dotPos = (dotPos === slidesNum)? 0: dotPos;
  dots[dotPos].classList.add('active');

  slideGroup = document.querySelector('.slides');
  slides = slideGroup.querySelectorAll('img');
  slideGroup.classList.add('nextSlide');
  slides[1].classList.remove('curSlide');
  setTimeout(() => {
    slideGroup.append(slides[0]);
    slideGroup.classList.remove('nextSlide');
    slides[2].classList.add('curSlide');
  }, 1000);
})

document.querySelector('.arrowPrev').addEventListener('click', () => {
  //move dots
  dots[dotPos].classList.remove('active');
  dotPos--;
  dotPos = (dotPos < 0)? slidesNum-1: dotPos;
  dots[dotPos].classList.add('active');

  slideGroup = document.querySelector('.slides');
  slides = slideGroup.querySelectorAll('img');
  slideGroup.classList.add('prevSlide');
  slides[1].classList.remove('curSlide');
  slideGroup.prepend(slides[slidesNum-1]);
  slides[0].classList.add('curSlide');
  setTimeout(() => {
    slideGroup.classList.remove('prevSlide');
  }, 1000);
})

document.querySelector('.dots').addEventListener('click', (e) => {
  if (e.target && e.target.matches("span.dot")) {
    slideGroup = document.querySelector('.slides');
    slides = slideGroup.querySelectorAll('img');
    slides[1].classList.remove('curSlide');
    let reqSlide = e.target.dataset.slideId;
    let slideHops = dotPos + 1 - reqSlide;
    if (slideHops > 0) {
      for (i=0; i < slideHops; i++) {
        slideGroup = document.querySelector('.slides');
        slides = slideGroup.querySelectorAll('img');
        slideGroup.prepend(slides[slidesNum-1]);
      }
    } else if (slideHops < 0) {
      for (i=0; i > slideHops; i--) {
        slideGroup = document.querySelector('.slides');
        slides = slideGroup.querySelectorAll('img');
        slideGroup.append(slides[0]);
      }
    }
    slideGroup = document.querySelector('.slides');
    slides = slideGroup.querySelectorAll('img');
    slides[1].classList.add('curSlide');
    dots[dotPos].classList.remove('active');
    dotPos = reqSlide - 1;
    dots[dotPos].classList.add('active');
  }
})
document.querySelector('.slides').addEventListener('click', (e) => {
  if (e.target && e.target.nodeName === 'IMG') {
    document.getElementById('slideGallery').style.cssText = `display:initial; background-image:url(${e.target.dataset.slideUrl})`;
  }
})
document.getElementById('slideGallery').addEventListener('click', (e) => {
  document.getElementById('slideGallery').style.cssText = 'display:none;'
})
// about change header
document.querySelector('.bigHead').addEventListener('mouseenter', () => {
  let aboutHead = document.querySelector('.bigHead');
  let aboutHTML = aboutHead.innerHTML;
  let tempHTML = document.querySelector('.resume-Am-I').innerHTML;

  aboutHead.innerHTML = tempHTML;
  setTimeout(() => {
    aboutHead.innerHTML = aboutHTML;
  }, 5000);
})

//testimony cycling
const testimonyTimer = () => {
  let quotes = document.querySelectorAll('.quotes blockquote');
  let i = 1;
  console.log(document.getElementById('quote' + i));
  setInterval(() => {
    elemFadeToggle(document.getElementById('quote' + i), true);
    i = (i === quotes.length)? 0: i;
    setTimeout(() => {
      elemFadeToggle(document.getElementById('quote' + ++i), true);
    }, 1000);
  }, 7000);
  document.getElementById('testimony').removeEventListener('mouseenter', testimonyTimer);
}

document.getElementById('testimony').addEventListener('mouseenter', testimonyTimer);

// form validation
document.querySelectorAll('.error-message').forEach(el => {
  el.classList.add('hidden');
})

//TODO: convert jquery to vanilla js
// $('form.contact').on('submit', function(e)  {
//   e.preventDefault();
//   $('.contact input, .contact textarea').each(function() {
//     if ($(this).val() === '') {
//       $(this).addClass('error').siblings('.error-message').fadeIn(700);
//     } else {
//       $(this).removeClass('error').siblings('.error-message').fadeOut(700);
//     }
//   })
// })
