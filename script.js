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
  event.preventDefault();
  
  const formData = new FormData(form);
  const data = {
    nome: formData.get("entry.1001546060"),
    email: formData.get("entry.1684517066"),
    whatsapp: formData.get("entry.1611408848"),
    pergunta1: formData.get("entry.440161863"),
    pergunta2: formData.get("entry.1759629347"),
    pergunta3: formData.get("entry.1879069444"),
    pergunta4: formData.get("entry.1475680448")
  };

  const appsScriptUrl = "https://script.googleapis.com/macros/s/AKfycbxK3SVZnKo89SCc1-dBMbCVSAwV_IvcdsFmnm7v2YBzdzlhTBy749AnkjM3jzIU-X85/exec";

  fetch(appsScriptUrl, {
    method: "POST",
    body: new URLSearchParams(data),
    mode: "no-cors"
  })
  .then(() => {
    window.setTimeout(() => {
      modal.classList.add("is-open");
      modal.setAttribute("aria-hidden", "false");
      form.reset();
      showPage1();
    }, 300);
  })
  .catch(error => {
    console.error("Erro:", error);
    alert("Houve um erro ao enviar. Tente novamente!");
  });
});

document.querySelector(".modal__close").addEventListener("click", closeModal);
document.querySelector(".modal__ok").addEventListener("click", closeModal);
modal.addEventListener("click", (event) => { if (event.target === modal) closeModal(); });
document.addEventListener("keydown", (event) => { if (event.key === "Escape") closeModal(); });
