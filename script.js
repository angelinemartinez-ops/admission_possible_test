const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");

menuToggle?.addEventListener("click", () => {
  const open = siteNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
});

siteNav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    siteNav.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
  });
});

const revealItems = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);
revealItems.forEach((item, index) => {
  item.style.transitionDelay = `${Math.min(index * 45, 220)}ms`;
  observer.observe(item);
});

const form = document.querySelector("#join-form");
const status = document.querySelector(".form-status");
form?.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(form);
  if (!data.get("name") || !data.get("email") || !data.get("stage") || !data.get("message")) return;
  status.textContent = "Thank you — your note is on its way.";
  form.reset();
});

const pathwayButtons = [...document.querySelectorAll(".pathway")];
const pathwayCurrent = document.querySelector(".pathway-current");
const pathwayDescription = document.querySelector(".pathway-detail p");
const pathwayDescriptions = {
  QuestBridge: "Every system asks you to make choices. Your mentor helps you make them with context, not guesswork.",
  "Common App": "A shared system can still hold a singular story. We help you make the through-line visible.",
  "UC Application": "Different questions invite different parts of you forward. We help you find the answer beneath the prompt.",
  Coalition: "Your work, values, and voice belong in the process. We help you decide what to bring with you.",
  ApplyTexas: "A broad landscape feels easier to navigate when you have a place to begin and someone to return to.",
  CBCA: "The best route is the one that helps you keep moving. We help you understand what each next step asks."
};
let pathwayIndex = 0;
const setPathway = (index) => {
  pathwayIndex = (index + pathwayButtons.length) % pathwayButtons.length;
  pathwayButtons.forEach((button, buttonIndex) => button.classList.toggle("active", buttonIndex === pathwayIndex));
  const name = pathwayButtons[pathwayIndex].dataset.pathway;
  if (pathwayCurrent) pathwayCurrent.textContent = name;
  if (pathwayDescription) pathwayDescription.textContent = pathwayDescriptions[name];
  pathwayButtons[pathwayIndex].scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
};
pathwayButtons.forEach((button, index) => button.addEventListener("click", () => setPathway(index)));
document.querySelector(".carousel-prev")?.addEventListener("click", () => setPathway(pathwayIndex - 1));
document.querySelector(".carousel-next")?.addEventListener("click", () => setPathway(pathwayIndex + 1));

const startCards = [...document.querySelectorAll(".start-card")];
const startCount = document.querySelector(".start-count");
let startIndex = 0;
const setStartingPoint = (index) => {
  startIndex = (index + startCards.length) % startCards.length;
  startCards.forEach((card, cardIndex) => card.classList.toggle("active", cardIndex === startIndex));
  if (startCount) startCount.textContent = `0${startIndex + 1} / 0${startCards.length}`;
  startCards[startIndex].scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
};
startCards.forEach((card, index) => card.addEventListener("click", () => setStartingPoint(index)));
document.querySelector(".start-prev")?.addEventListener("click", () => setStartingPoint(startIndex - 1));
document.querySelector(".start-next")?.addEventListener("click", () => setStartingPoint(startIndex + 1));
