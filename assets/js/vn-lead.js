/* =========================================================================
 * Dino English · VN Lead Gen Landing Page JS
 * ========================================================================= */
document.addEventListener("DOMContentLoaded", () => {
  const phoneInput = document.getElementById("phone");
  const submitBtn = document.getElementById("submit-btn");
  const modalOverlay = document.getElementById("success-modal");
  const btnDownload = document.getElementById("btn-download");
  const inputGroup = document.querySelector(".input-group");

  // Initial state: needs input
  if (phoneInput.value.length === 0) {
    inputGroup.classList.add("needs-input");
  }

  // Phone input validation (enable button if length >= 8)
  phoneInput.addEventListener("input", (e) => {
    // allow only numbers
    let val = e.target.value.replace(/[^\d]/g, "");
    e.target.value = val;
    
    if (val.length > 0) {
      inputGroup.classList.remove("needs-input");
    } else {
      inputGroup.classList.add("needs-input");
    }
    
    if (val.length >= 8) {
      submitBtn.classList.remove("disabled");
    } else {
      submitBtn.classList.add("disabled");
    }
  });

  // Submit action
  submitBtn.addEventListener("click", () => {
    if (submitBtn.classList.contains("disabled")) return;
    
    // Show success modal
    modalOverlay.classList.add("show");
  });

  // Download App action (close modal for now, or redirect)
  btnDownload.addEventListener("click", () => {
    // In a real app, this would redirect to App Store / Google Play
    // window.location.href = "https://app.dinoenglish.ai/download";
    modalOverlay.classList.remove("show");
    phoneInput.value = "";
    submitBtn.classList.add("disabled");
    inputGroup.classList.add("needs-input");
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
      
      if (lang === "cn") {
        phoneInput.placeholder = "请输入您的手机号";
      } else {
        phoneInput.placeholder = "Nhập số điện thoại của bạn";
      }
    });
  });
});
