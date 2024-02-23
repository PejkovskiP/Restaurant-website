// Function to scroll to the top when the page is loaded or refreshed
window.onload = () => {
  history.scrollRestoration = "manual";
  window.scrollTo(0, 0);
};

// Get the hamburger icon, side menu, and close button elements
const hamburgerIcon = document.getElementById("hamburger-icon");
const sideMenu = document.getElementById("side-menu");
const closeBtn = document.getElementById("close-btn");

// Get all navigation links, the book table link, the logo link, and the hero book table button
const navLinks = document.querySelectorAll('.nav-link');
const bookTableLink = document.querySelector('.book-table-btn');
const logoLink = document.querySelector('#header a[href="index.html"]');
const heroBookTableBtn = document.querySelector('.book-table-hero-btn');

// Function to toggle the 'active' class on the hamburger icon and side menu
const toggleMenu = () => {
  hamburgerIcon.classList.toggle("active");
  sideMenu.classList.toggle("active");
};

// Function to handle navigation link click
const handleNavLinkClick = (event) => {
  event.preventDefault();
  navLinks.forEach(link => link.classList.remove('active'));
  event.target.classList.add('active');
  sideMenu.classList.remove("active");
  hamburgerIcon.classList.remove("active");
  scrollSmoothly(event.target.getAttribute("data-target"));
};

// Function to handle book table link click
const handleBookTableClick = (event) => {
  event.preventDefault();
  sideMenu.classList.remove("active");
  hamburgerIcon.classList.remove("active");
  scrollSmoothly(event.target.getAttribute("href").substring(1));
};

// Function to handle logo link click
const handleLogoLinkClick = (event) => {
  event.preventDefault();
  scrollSmoothly('header-placeholder');
};

// Function to handle hero book table button click
const handleHeroBookTableBtnClick = (event) => {
  event.preventDefault();
  scrollSmoothly(event.target.getAttribute("href").substring(1));
};

// Function to scroll smoothly to a target section
const scrollSmoothly = (targetId) => {
  const targetElement = document.getElementById(targetId);
  if (targetElement) {
    targetElement.scrollIntoView({ behavior: 'smooth' });
  }
};

// Function to update the active state of navigation links based on scroll position
const updateActiveStateOnScroll = () => {
  const scrollPosition = window.scrollY;
  navLinks.forEach(link => {
    const targetId = link.getAttribute("data-target");
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      const offsetTop = targetElement.offsetTop - 56;
      const offsetBottom = offsetTop + targetElement.offsetHeight;
      link.classList.toggle("active", scrollPosition >= offsetTop && scrollPosition < offsetBottom);
    }
  });
};

// Function to set the initial active state of navigation links
const setInitialActiveState = () => {
  const scrollPosition = window.scrollY;
  navLinks.forEach(link => {
    const targetId = link.getAttribute("data-target");
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      const offsetTop = targetElement.offsetTop - 56;
      const offsetBottom = offsetTop + targetElement.offsetHeight;
      link.classList.toggle("active", scrollPosition >= offsetTop && scrollPosition < offsetBottom);
    }
  });
};

// Add scroll event listener to update active state on scroll
window.addEventListener("scroll", updateActiveStateOnScroll);

// Call the setInitialActiveState function to set the initial active state on page load
setInitialActiveState();

// Add click event listener to the hamburger icon
hamburgerIcon.addEventListener("click", toggleMenu);

// Add click event listener to the close button
closeBtn.addEventListener("click", () => {
  sideMenu.classList.remove("active");
  hamburgerIcon.classList.remove("active");
});

// Add click event listener to close the side menu when clicking outside of it
document.addEventListener("click", (event) => {
  if (!sideMenu.contains(event.target) && !hamburgerIcon.contains(event.target)) {
    sideMenu.classList.remove("active");
    hamburgerIcon.classList.remove("active");
  }
});

// Add click event listener to all navigation links
navLinks.forEach(link => link.addEventListener('click', handleNavLinkClick));

// Add click event listener to the book table link
bookTableLink.addEventListener('click', handleBookTableClick);

// Add click event listener to the logo link
logoLink.addEventListener('click', handleLogoLinkClick);

// Add click event listener to the hero book table button
heroBookTableBtn.addEventListener('click', handleHeroBookTableBtnClick);

// Image Modal script
let currentImageIndex = 0;
const modalImages = document.querySelectorAll(".modal-image");
const modal = document.getElementById("imageModal");

const openModal = () => {
  modal.style.display = "flex";
  setTimeout(() => {
    modal.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
  }, 10);
  showImage(currentImageIndex);

  document.body.style.overflow = "hidden";

  modal.addEventListener("click", outsideClick);
};

const closeModal = () => {
  modal.style.backgroundColor = "rgba(0, 0, 0, 0)";
  modal.style.display = "none";

  document.body.style.overflow = "auto";

  modal.removeEventListener("click", outsideClick);
};

const changeImage = (n) => {
  currentImageIndex += n;
  if (currentImageIndex >= modalImages.length) {
    currentImageIndex = 0;
  } else if (currentImageIndex < 0) {
    currentImageIndex = modalImages.length - 1;
  }
  showImage(currentImageIndex);
};

const showImage = (index) => {
  modalImages.forEach((image, i) => {
    image.style.display = i === index ? "block" : "none";
  });
};

const outsideClick = (event) => {
  if (event.target === modal) {
    closeModal();
  }

  if (!event.target.closest('.modal-content')) {
    event.stopPropagation();
  }
};

// Stats Counter
document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll(".count-number");

  elements.forEach(element => {
    let currentValue = 0;
    const targetValue = parseInt(element.textContent, 10);
    const delay = 10;
    const duration = 10000;
    const increment = targetValue / (duration / delay);

    const updateValue = () => {
      currentValue += increment;
      element.textContent = Math.round(currentValue);

      if (currentValue < targetValue) {
        setTimeout(updateValue, delay);
      }
    };

    updateValue();
  });
});

// Restaurant menu
const openCategory = (category, tab) => {
  const categories = document.querySelectorAll(".menu-category");
  categories.forEach(cat => cat.style.display = "none");

  const selectedCategory = document.getElementById(category);
  if (selectedCategory) {
    selectedCategory.style.display = "block";
  }

  const tabs = document.querySelectorAll(".tab");
  tabs.forEach(t => t.classList.remove("active"));
  tab.classList.add("active");
};

document.addEventListener("DOMContentLoaded", () => {
  const defaultTab = document.querySelector(".tab");
  openCategory("starters", defaultTab);
});

// Testimonials slider function
document.addEventListener("DOMContentLoaded", () => {
  const testimonialsSwiper = new Swiper(".testimonials__container .swiper", {
    direction: "horizontal",
    loop: true,
    slidesPerView: 1,
    spaceBetween: 20,
    autoplay: {
        delay: 4000,
    },
    pagination: {
      el: ".testimonials__container .swiper-pagination",
      clickable: true,
    },
  });
});

// Events slider function
document.addEventListener("DOMContentLoaded", () => {
  const eventsSwiper = new Swiper(".events__container .swiper-container", {
    direction: "horizontal",
    loop: true,
    slidesPerView: 1,
    slidesPerGroup: 1,
    spaceBetween: 10,
    autoplay: {
      delay: 4000,
    },
    pagination: {
      el: ".events__container .swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      1200: {
        slidesPerView: 3,
      },
    },
  });
});

// Function for providing actual date on input date
document.addEventListener("DOMContentLoaded", () => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const day = String(currentDate.getDate()).padStart(2, '0');
  const today = `${year}-${month}-${day}`;
  document.getElementById('date').value = today;
});

// Modal message function
$(document).ready(() => {
  $("#bookTableForm").submit((e) => {
      e.preventDefault();
      $.ajax({
          type: "POST",
          url: "process_form.php",
          data: $("#bookTableForm").serialize(),
          dataType: "json",
          success: (response) => {
              const buttonHtml = '<button onclick="customCloseModal()">OK</button>';
              const messageHtml = `<p>${response.success ? '' : 'Error: '}${response.message}</p>${buttonHtml}`;
              $("#successMessage").html(messageHtml).fadeIn();
          },
          error: (xhr, status, error) => {
              console.error("AJAX Request Error:", status, error);
          }
      });
  });
});

const customCloseModal = () => {
  $("#successMessage").fadeOut();
  setTimeout(() => {
      location.reload();
  }, 500);
};
