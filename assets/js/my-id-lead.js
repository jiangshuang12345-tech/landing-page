/* =========================================================================
 * Dino AI · VN Lead Gen Landing Page JS
 * ========================================================================= */
document.addEventListener("DOMContentLoaded", () => {
  const phoneInput = document.getElementById("phone");
  const submitBtn = document.getElementById("submit-btn");
  const modalOverlay = document.getElementById("success-modal");
  const btnDownload = document.getElementById("btn-download");

  const codeInput = document.getElementById("code");
  const getcodeBtn = document.getElementById("getcode");
  
  let countdown = 0;
  let codeSent = false;
  let timer = null;

  const updateGetCodeState = () => {
    if (countdown > 0) return;
    if (phoneInput.value.length > 0) {
      getcodeBtn.classList.add("active");
    } else {
      getcodeBtn.classList.remove("active");
    }
  };

  getcodeBtn.addEventListener("click", () => {
    if (countdown > 0 || phoneInput.value.length === 0) return;
    
    codeSent = true;
    countdown = 60;
    getcodeBtn.disabled = true;
    getcodeBtn.classList.remove("active");
    getcodeBtn.innerText = countdown + "s";
    
    timer = setInterval(() => {
      countdown--;
      if (countdown <= 0) {
        clearInterval(timer);
        getcodeBtn.disabled = false;
        getcodeBtn.innerText = "Resend";
        updateGetCodeState();
      } else {
        getcodeBtn.innerText = countdown + "s";
      }
    }, 1000);
  });

  const updateSubmitState = () => {
    submitBtn.disabled = !(phoneInput.value.length >= 8 && codeInput.value.length >= 4);
  };

  codeInput.addEventListener("input", (e) => {
    let val = e.target.value.replace(/[^\d]/g, "");
    e.target.value = val;
    updateGetCodeState();
    updateSubmitState();
  });

  phoneInput.addEventListener("input", (e) => {
    let val = e.target.value.replace(/[^\d]/g, "");
    e.target.value = val;
    updateGetCodeState();
    updateSubmitState();
  });

  // Submit action
  submitBtn.addEventListener("click", () => {
    if (submitBtn.disabled) return;
    
    // Show success modal
    modalOverlay.classList.add("show");
  });

  // Download App action (close modal for now, or redirect)
  btnDownload.addEventListener("click", () => {
    // In a real app, this would redirect to App Store / Google Play
    // window.location.href = "https://app.dinoenglish.ai/download";
    modalOverlay.classList.remove("show");
    phoneInput.value = "";
    codeInput.value = "";
    updateGetCodeState();
    updateSubmitState();
  });

  // Optional: close modal when clicking outside
  modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) {
      modalOverlay.classList.remove("show");
    }
  });

  // Language Switcher
  const langBtns = document.querySelectorAll(".lang-btn");
  const htmlEl = document.documentElement;
  
  langBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      langBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      
      
      const lang = btn.getAttribute("data-lang");
      htmlEl.setAttribute("data-active-lang", lang);
      
      const phoneCode = document.getElementById("phone-code");
      if (lang === "my") {
        phoneInput.placeholder = "Masukkan nombor telefon anda";
        if(phoneCode) phoneCode.innerText = "+60";
      } else if (lang === "id") {
        phoneInput.placeholder = "Masukkan nomor telepon Anda";
        if(phoneCode) phoneCode.innerText = "+62";
      } else {
        phoneInput.placeholder = "Enter your phone number";
        if(phoneCode) phoneCode.innerText = "+60"; // Default to MY for EN
      }
    });
  });
});
