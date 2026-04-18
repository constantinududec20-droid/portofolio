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
const careerTimeline = document.querySelector(".career-timeline");
const copyEmailButton = document.querySelector("#copy-email");
const scrollProgressBar = document.querySelector("#scroll-progress-bar");
const navLinks = document.querySelectorAll(".nav-links a");
const sectionTargets = [...document.querySelectorAll("header.hero[id], main > .section[id]")];
const backToTopButton = document.querySelector("#back-to-top");
const counters = document.querySelectorAll(".counter");
const projectCards = document.querySelectorAll(".project-card");
const certCards = document.querySelectorAll(".cert-card");
const certModal = document.querySelector("#cert-modal");
const certModalTitle = document.querySelector("#cert-modal-title");
const certModalIssuer = document.querySelector("#cert-modal-issuer");
const certModalLink = document.querySelector("#cert-modal-link");
const certModalCloseTargets = document.querySelectorAll("[data-close-modal]");
const typewriterText = document.querySelector(".typewriter-text");
const threatToast = document.querySelector("#threat-toast");
const securityWidgetState = document.querySelector("#security-widget-state");
const securityDetectionValue = document.querySelector("#security-detection-value");
const securityResponseValue = document.querySelector("#security-response-value");
const securityThreatValue = document.querySelector("#security-threat-value");

function syncNavState() {
  if (!nav) {
    return;
  }

  nav.classList.toggle("is-scrolled", window.scrollY > 24);
  if (backToTopButton) {
    backToTopButton.classList.toggle("is-visible", window.scrollY > 500);
  }
}

function syncScrollProgress() {
  if (!scrollProgressBar) {
    return;
  }

  const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollableHeight > 0 ? (window.scrollY / scrollableHeight) * 100 : 0;
  scrollProgressBar.style.width = `${Math.min(100, Math.max(0, progress))}%`;
}

function syncActiveNavLink() {
  if (!navLinks.length || !sectionTargets.length) {
    return;
  }

  const currentPosition = window.scrollY + window.innerHeight * 0.28;
  let activeId = sectionTargets[0].id;

  sectionTargets.forEach((section) => {
    if (section.offsetTop <= currentPosition) {
      activeId = section.id;
    }
  });

  navLinks.forEach((link) => {
    const targetId = link.getAttribute("href")?.replace("#", "");
    link.classList.toggle("is-active", targetId === activeId);
  });
}

syncNavState();
syncScrollProgress();
syncActiveNavLink();

window.addEventListener(
  "scroll",
  () => {
    syncNavState();
    syncScrollProgress();
    syncActiveNavLink();
  },
  { passive: true }
);

if (printCvButton) {
  printCvButton.addEventListener("click", () => {
    window.print();
  });
}

if (copyEmailButton) {
  copyEmailButton.addEventListener("click", async () => {
    const email = "constantin.ududec20@gmail.com";
    const originalText = copyEmailButton.textContent;

    try {
      await navigator.clipboard.writeText(email);
      copyEmailButton.textContent = "Copied";
    } catch {
      copyEmailButton.textContent = email;
    }

    setTimeout(() => {
      copyEmailButton.textContent = originalText;
    }, 1600);
  });
}

if (backToTopButton) {
  backToTopButton.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

if (typewriterText) {
  const fullText = typewriterText.dataset.text || typewriterText.textContent || "";
  typewriterText.textContent = "";
  typewriterText.classList.add("is-typing");

  [...fullText].forEach((character, index) => {
    setTimeout(() => {
      typewriterText.textContent += character;

      if (index === fullText.length - 1) {
        typewriterText.classList.remove("is-typing");
      }
    }, 18 * index + 700);
  });
}

if (threatToast && securityWidgetState && securityDetectionValue && securityResponseValue && securityThreatValue) {
  const widgetFrames = [
    {
      toast: "Threat neutralized",
      state: "Operational",
      detection: "97%",
      response: "Auto",
      threats: "4 live",
    },
    {
      toast: "IOC matched",
      state: "Scanning",
      detection: "99%",
      response: "SOAR",
      threats: "3 live",
    },
    {
      toast: "Containment ready",
      state: "Hardened",
      detection: "96%",
      response: "Active",
      threats: "2 live",
    },
    {
      toast: "Signal confirmed",
      state: "Tracking",
      detection: "98%",
      response: "Guided",
      threats: "5 live",
    },
  ];

  let widgetIndex = 0;

  const renderWidgetFrame = () => {
    const frame = widgetFrames[widgetIndex];
    threatToast.textContent = frame.toast;
    securityWidgetState.textContent = frame.state;
    securityDetectionValue.textContent = frame.detection;
    securityResponseValue.textContent = frame.response;
    securityThreatValue.textContent = frame.threats;
    widgetIndex = (widgetIndex + 1) % widgetFrames.length;
  };

  renderWidgetFrame();
  setInterval(renderWidgetFrame, 2800);
}

if (counters.length) {
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        const counter = entry.target;
        const target = Number(counter.dataset.target || "0");
        const suffix = counter.dataset.suffix || "";
        const duration = 1200;
        const startTime = performance.now();

        function animateCounter(now) {
          const progress = Math.min((now - startTime) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          counter.textContent = `${Math.round(target * eased)}${suffix}`;

          if (progress < 1) {
            requestAnimationFrame(animateCounter);
          }
        }

        requestAnimationFrame(animateCounter);
        counterObserver.unobserve(counter);
      });
    },
    { threshold: 0.55 }
  );

  counters.forEach((counter) => counterObserver.observe(counter));
}

projectCards.forEach((card) => {
  const toggle = card.querySelector(".project-toggle");
  const expand = card.querySelector(".project-expand");

  if (!toggle || !expand) {
    return;
  }

  toggle.addEventListener("click", () => {
    const isOpen = card.classList.toggle("is-open");
    toggle.textContent = isOpen ? "Show less" : "Read more";
  });
});

function closeCertModal() {
  if (!certModal) {
    return;
  }

  certModal.classList.remove("is-open");
  certModal.setAttribute("aria-hidden", "true");
}

if (certModal && certModalTitle && certModalIssuer && certModalLink) {
  certCards.forEach((card) => {
    card.addEventListener("mousemove", (event) => {
      if (window.innerWidth <= 900) {
        return;
      }

      const rect = card.getBoundingClientRect();
      const offsetX = event.clientX - rect.left;
      const offsetY = event.clientY - rect.top;
      const rotateY = ((offsetX / rect.width) - 0.5) * 8;
      const rotateX = (((offsetY / rect.height) - 0.5) * -1) * 8;

      card.classList.add("is-tilting");
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
      card.classList.remove("is-tilting");
    });

    card.addEventListener("click", (event) => {
      if (event.target.closest("a")) {
        return;
      }

      const title = card.dataset.certTitle || card.querySelector("h3")?.textContent || "Certificate";
      const issuer = card.dataset.certIssuer || "Credential";
      const link = card.dataset.certLink || "";

      certModalTitle.textContent = title;
      certModalIssuer.textContent = issuer;

      if (link) {
        certModalLink.href = link;
        certModalLink.textContent = "Open credential";
        certModalLink.style.display = "inline-flex";
      } else {
        certModalLink.removeAttribute("href");
        certModalLink.textContent = "No public link available";
        certModalLink.style.display = "none";
      }

      certModal.classList.add("is-open");
      certModal.setAttribute("aria-hidden", "false");
    });
  });

  certModalCloseTargets.forEach((target) => {
    target.addEventListener("click", closeCertModal);
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeCertModal();
    }
  });
}

if (careerTimeline) {
  const timelineObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          careerTimeline.classList.add("is-active");
          timelineObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.3,
    }
  );

  timelineObserver.observe(careerTimeline);
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
