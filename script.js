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
