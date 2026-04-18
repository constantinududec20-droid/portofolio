document.body.classList.add("is-loading");

const loader = document.querySelector("#page-loader");
const loaderStatus = document.querySelector("#loader-status");
const loaderMessages = [
  "Preparing interface...",
  "Opening visual gateway...",
  "Mapping experience data...",
  "Syncing certifications...",
  "Rendering security profile...",
  "Finalizing launch...",
];

loaderMessages.forEach((message, index) => {
  setTimeout(() => {
    if (loaderStatus) {
      loaderStatus.textContent = message;
    }
  }, index * 850);
});

setTimeout(() => {
  if (loader) {
    loader.classList.add("is-hidden");
  }
  document.body.classList.remove("is-loading");
}, 5000);

const nav = document.querySelector(".nav");
const printCvButton = document.querySelector("#print-cv");

function syncNavState() {
  if (!nav) {
    return;
  }

  nav.classList.toggle("is-scrolled", window.scrollY > 24);
}

syncNavState();
window.addEventListener("scroll", syncNavState, { passive: true });

if (printCvButton) {
  printCvButton.addEventListener("click", () => {
    window.print();
  });
}

const revealElements = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.18,
  }
);

revealElements.forEach((element) => observer.observe(element));
