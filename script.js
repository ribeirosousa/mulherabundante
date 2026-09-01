const form = document.querySelector("#interest-form");
const modal = document.querySelector("#confirmation-modal");
const formPage1 = document.querySelector("#form-page-1");
const formPage2 = document.querySelector("#form-page-2");
const nextPageBtn = document.querySelector("#next-page-1");
const prevPageBtn = document.querySelector("#prev-page-2");

const closeModal = () => {
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
};

const showPage1 = () => {
  formPage1.classList.add("form-page--active");
  formPage2.classList.remove("form-page--active");
  window.scrollTo({ top: form.offsetTop - 100, behavior: "smooth" });
};

const showPage2 = () => {
  formPage1.classList.remove("form-page--active");
  formPage2.classList.add("form-page--active");
  window.scrollTo({ top: form.offsetTop - 100, behavior: "smooth" });
};

const validatePage1 = () => {
  const page1Inputs = formPage1.querySelectorAll("[required]");
  let isValid = true;
  page1Inputs.forEach(input => {
    if (!input.value.trim()) {
      isValid = false;
      input.focus();
    }
  });
  return isValid;
};

nextPageBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (validatePage1()) {
    showPage2();
  } else {
    alert("Por favor, preencha todas as perguntas antes de continuar.");
  }
});

prevPageBtn.addEventListener("click", (e) => {
  e.preventDefault();
  showPage1();
});

form.addEventListener("submit", (event) => {
  window.setTimeout(() => {
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    form.reset();
    showPage1();
  }, 300);
});

document.querySelector(".modal__close").addEventListener("click", closeModal);
document.querySelector(".modal__ok").addEventListener("click", closeModal);
modal.addEventListener("click", (event) => { if (event.target === modal) closeModal(); });
document.addEventListener("keydown", (event) => { if (event.key === "Escape") closeModal(); });
