"use strict";

///////////////////////////////////////

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
const header = document.querySelector(".header");
const message = document.createElement("div");
const btnSCroll = document.querySelector(".btn--scroll-to");
const sec1 = document.querySelector("#section--1");
const navLinks = document.querySelectorAll(".nav__link");
const navLinksParnetEl = document.querySelector(".nav__links");
const tabsParEl = document.querySelector(".operations__tab-container");
const tab = document.querySelectorAll(".operations__tab");
const nav = document.querySelector(".nav");
const allSection = document.querySelectorAll(".section");
const allLazyImage = document.querySelectorAll(".lazy-img");
let isModelOpen = false;
let reopenTimer = null;

function openModel() {
  isModelOpen = true;
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
  document.body.classList.add("stop-scrolling");
}

function closeModel() {
  isModelOpen = false;
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
  document.body.classList.remove("stop-scrolling");

  if (reopenTimer) clearTimeout(reopenTimer);

  reopenTimer = setTimeout(() => {
    if (!isModelOpen) openModel();
  }, 1000 * 30);
}

btnCloseModal.addEventListener("click", closeModel);
overlay.addEventListener("click", closeModel);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModel();
  }
});

for (let i = 0; i < btnsOpenModal.length; i++) {
  btnsOpenModal[i].addEventListener("click", openModel);
}

setTimeout(() => {
  openModel();
}, 4000);

//////////////////coockie///////////////////////////
message.classList.add("cookie-message");
message.innerHTML =
  '🍪 We use cookies for better and optimize performance <button class = "btn btn--close-cookie">Got it</button> ';

header.append(message);

document
  .querySelector(".btn--close-cookie")
  .addEventListener("click", function () {
    message.remove();
  });

message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 10 + "px";

//////////////////SMOOTH SCROLLING//////////////////////////
btnSCroll.addEventListener("click", function (e) {
  sec1.scrollIntoView({ behavior: "smooth" });
});

navLinksParnetEl.addEventListener("click", function (e) {
  e.preventDefault();
  if (e.target.classList.contains("nav__link")) {
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

/////////////////tab changing operations///////////////////
document.querySelector(".operations").style.boxShadow = `0px 0px 15px -7px ${
  getComputedStyle(document.querySelector(".operations__tab--active"))
    .backgroundColor
}`;
///////////
tabsParEl.addEventListener("click", function (e) {
  e.preventDefault();
  const clicked = e.target.closest(".btn");

  if (!clicked) return;
  tab.forEach((tab) => {
    tab.classList.remove("operations__tab--active");
  });
  clicked.classList.add("operations__tab--active");

  const tabNum = clicked.dataset.tab;

  const oldActive = document.querySelector(".operations__content--active");
  oldActive.classList.remove("operations__content--active");

  const nowActive = document.querySelector(`.operations__content--${tabNum}`);
  nowActive.classList.add("operations__content--active");

  document.querySelector(".operations").style.boxShadow = `0px 0px 15px -7px ${
    getComputedStyle(document.querySelector(".operations__tab--active"))
      .backgroundColor
  }`;
});

////////////nav hover effect///////////////
function navEffect(e) {
  if (e.target.classList.contains("nav__link")) {
    const hovered = e.target;
    const siblings = hovered.closest(".nav").querySelectorAll(".nav__link");
    const logo = hovered.closest(".nav").querySelector("img");
    siblings.forEach((el) => {
      if (el !== hovered) {
        el.style.opacity = this;
      }
      logo.style.opacity = this;
    });
  }
}

nav.addEventListener("mouseover", navEffect.bind(0.5));
nav.addEventListener("mouseout", navEffect.bind(1.0));

//////////////sticky nav bar on scroll///////////////////
const obsOption = {
  root: null,
  threshold: 0,
  rootMargin: `-${nav.getBoundingClientRect().height + 11}px`,
};

function obsFunc([entry]) {
  if (!entry.isIntersecting) nav.classList.add("sticky");
  else nav.classList.remove("sticky");
}

const observer = new IntersectionObserver(obsFunc, obsOption).observe(header);

////////////////////////section reveal//////////////////////////
function obsSecFunc(entries, obs) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.remove("section--hidden");

    obs.unobserve(entry.target);
  });
}
const observerSec = new IntersectionObserver(obsSecFunc, {
  root: null,
  threshold: 0.15,
});

allSection.forEach((section) => {
  section.classList.add("section--hidden");
  observerSec.observe(section);
});

//////////////////lazyLoading img//////////////////////////
function obsLazyLoadingFunc([entry], obs) {
  if (!entry.isIntersecting) return;
  entry.target.setAttribute("src", entry.target.dataset.src);
  entry.target.addEventListener("load", function () {
    entry.target.classList.remove("lazy-img");
  });
  obs.unobserve(entry.target);
}
const observerLazyLoading = new IntersectionObserver(obsLazyLoadingFunc, {
  root: null,
  threshold: 0,
  rootMargin: "150px",
});

allLazyImage.forEach((image) => {
  observerLazyLoading.observe(image);
});

//////////////////////Slider////////////////////////////

function slider() {
  const allSlides = document.querySelectorAll(".slide");
  const btnRight = document.querySelector(".slider__btn--right");
  const btnLeft = document.querySelector(".slider__btn--left");
  const dotContainer = document.querySelector(".dots");
  const sliderConatiner = document.querySelector(".slider");
  let currSlide = 0;

  function createDots() {
    allSlides.forEach((_, i) => {
      dotContainer.insertAdjacentHTML(
        "beforeend",
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  }
  createDots();

  function activateDots(selectedSlide) {
    const allDots = document.querySelectorAll(".dots__dot");
    allDots.forEach((dot) => {
      dot.classList.remove("dots__dot--active");
    });
    allDots[selectedSlide].classList.add("dots__dot--active");
  }

  function moveToSlide(slideNum) {
    allSlides.forEach((slide, i) => {
      slide.style.transform = `translateX(${100 * (i - slideNum)}%)`;
    });
    activateDots(slideNum);
  }

  moveToSlide(0);

  function nextSlide() {
    if (allSlides.length - 1 !== currSlide) {
      currSlide++;
    } else currSlide = 0;

    moveToSlide(currSlide);
  }

  function backSlide() {
    if (currSlide != 0) {
      currSlide--;
    } else currSlide = allSlides.length - 1;

    moveToSlide(currSlide);
  }

  btnRight.addEventListener("click", nextSlide);

  btnLeft.addEventListener("click", backSlide);

  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowRight") {
      nextSlide();
    } else if (e.key === "ArrowLeft") {
      backSlide();
    }
  });

  dotContainer.addEventListener("click", function (e) {
    if (!e.target.classList.contains("dots__dot")) return;
    const slide = Number(e.target.dataset.slide);
    moveToSlide(slide);
    currSlide = slide;
  });

  function dragSLide() {
    let isPressed = false;
    let startX = 0;
    sliderConatiner.addEventListener("mousedown", (e) => {
      isPressed = true;
      startX = e.clientX;
    });

    window.addEventListener("mouseup", (e) => {
      if (!isPressed) return;
      isPressed = false;

      const diff = e.clientX - startX;
      if (Math.abs(diff) > 50) {
        diff < 0 ? nextSlide() : backSlide();
      }
    });
  }
  dragSLide();
}

slider();

/// mausam hai bada qaatil, kahi aa na jaye koi awaraapan
/// dur na ja na tu mujhse dur

function float() {
  document.querySelectorAll('[class*="__icon"]').forEach((icon) => {
    icon.classList.add("float");
  });

  document.querySelectorAll(".section__description").forEach((discription) => {
    discription.classList.add("float");
  });

  document.querySelectorAll(".features__img").forEach((img) => {
    img.classList.add("float");
  });
}

float();

// Calculate age
const birthYear = 2007;
const currentYear = new Date().getFullYear();
const age = currentYear - birthYear;
document.getElementById("my-age").textContent = age;
