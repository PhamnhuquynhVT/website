const projectStudies = {
  "brand-system": {
    meta: "01 / Brand identity",
    title: "Visual identity system",
    summary:
      "A brand world translated into practical rules for typography, color, packaging, social layouts, and campaign extensions.",
    challenge:
      "Build a visual identity that feels distinctive while remaining usable across print, packaging, and digital touchpoints.",
    process:
      "Start from moodboards and competitor scans, define the typographic voice, test logo lockups, then document reusable layout rules.",
    next:
      "Add final mockups, brand guidelines, and a reflection on which identity rules worked best when the system expanded."
  },
  "mobile-app": {
    meta: "02 / UX/UI prototype",
    title: "Mobile product concept",
    summary:
      "A UX/UI project focused on turning a simple product idea into a navigable mobile flow with hierarchy, states, and prototype logic.",
    challenge:
      "Move beyond screen styling by clarifying user goals, reducing friction, and making repeated actions easy to understand.",
    process:
      "Map the core journey, sketch low-fidelity wireframes, test the main flow, then refine visual hierarchy and interaction states in Figma.",
    next:
      "Add usability notes, a clickable prototype link, and before-and-after screens that show how feedback shaped the interface."
  },
  "editorial-system": {
    meta: "03 / Editorial design",
    title: "Typography and layout study",
    summary:
      "A print and digital layout study exploring how rhythm, hierarchy, and image placement can guide long-form reading.",
    challenge:
      "Create an editorial system that can carry multiple content types without losing energy or readability.",
    process:
      "Define grid rules, test scale relationships, build page sequences, and compare moments of density with moments of pause.",
    next:
      "Add spreads, detail crops, and a short explanation of how typography decisions support the content's tone."
  },
  "service-touchpoints": {
    meta: "04 / Experience design",
    title: "Service touchpoint system",
    summary:
      "A cross-channel concept connecting wayfinding, printed material, and digital interface moments into one service experience.",
    challenge:
      "Make a journey feel coherent when users move between physical signs, printed information, and digital screens.",
    process:
      "Map touchpoints, identify pain points, create signage and interface components, then test whether visual cues stay consistent.",
    next:
      "Add a user journey map, final touchpoint mockups, and notes on how the system could be validated with real users."
  }
};

const header = document.querySelector("[data-header]");
const year = document.querySelector("[data-year]");
const dialog = document.querySelector("[data-project-dialog]");
const dialogTitle = document.querySelector("[data-dialog-title]");
const dialogMeta = document.querySelector("[data-dialog-meta]");
const dialogSummary = document.querySelector("[data-dialog-summary]");
const dialogChallenge = document.querySelector("[data-dialog-challenge]");
const dialogProcess = document.querySelector("[data-dialog-process]");
const dialogNext = document.querySelector("[data-dialog-next]");

year.textContent = new Date().getFullYear();

const updateHeader = () => {
  header.classList.toggle("is-scrolled", window.scrollY > 10);
};

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

document.querySelectorAll("[data-open-project]").forEach((button) => {
  button.addEventListener("click", () => {
    const study = projectStudies[button.dataset.openProject];

    if (!study) {
      return;
    }

    dialogMeta.textContent = study.meta;
    dialogTitle.textContent = study.title;
    dialogSummary.textContent = study.summary;
    dialogChallenge.textContent = study.challenge;
    dialogProcess.textContent = study.process;
    dialogNext.textContent = study.next;

    document.body.classList.add("dialog-open");
    dialog.showModal();
  });
});

dialog.addEventListener("close", () => {
  document.body.classList.remove("dialog-open");
});

dialog.addEventListener("click", (event) => {
  const rect = dialog.getBoundingClientRect();
  const isBackdropClick =
    event.clientX < rect.left ||
    event.clientX > rect.right ||
    event.clientY < rect.top ||
    event.clientY > rect.bottom;

  if (isBackdropClick) {
    dialog.close();
  }
});
