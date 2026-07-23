import re

# Update vn-lead.js
with open('/Users/jiangshuang/Documents/GitHub/landing page/assets/js/vn-lead.js', 'r', encoding='utf-8') as f:
    js = f.read()

js = js.replace('const inputGroup = document.querySelector(".input-group");', 'const inputGroup = document.querySelector(".field--phone");')

# Add SMS code logic
code_logic = """
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

  codeInput.addEventListener("input", (e) => {
    let val = e.target.value.replace(/[^\d]/g, "");
    e.target.value = val;
    
    if (val.length >= 4 && phoneInput.value.length >= 8) {
      submitBtn.classList.remove("disabled");
    } else {
      submitBtn.classList.add("disabled");
    }
  });
"""

js = js.replace('// Phone input validation (enable button if length >= 8)', code_logic + '\n  // Phone input validation (enable button if length >= 8)')
js = js.replace('if (val.length >= 8) {', 'if (val.length >= 8 && codeInput.value.length >= 4) {')
js = js.replace('if (phoneInput.value.length < 8) return;', 'if (phoneInput.value.length < 8 || codeInput.value.length < 4) return;')
js = js.replace('phoneInput.value = "";', 'phoneInput.value = "";\n    codeInput.value = "";\n    updateGetCodeState();')
js = js.replace('e.target.value = val;', 'e.target.value = val;\n    updateGetCodeState();')

with open('/Users/jiangshuang/Documents/GitHub/landing page/assets/js/vn-lead.js', 'w', encoding='utf-8') as f:
    f.write(js)

# Update my-id-lead.js
with open('/Users/jiangshuang/Documents/GitHub/landing page/assets/js/my-id-lead.js', 'r', encoding='utf-8') as f:
    js2 = f.read()

js2 = js2.replace('const inputGroup = document.querySelector(".input-group");', 'const inputGroup = document.querySelector(".field--phone");')
js2 = js2.replace('// Phone input validation (enable button if length >= 8)', code_logic + '\n  // Phone input validation (enable button if length >= 8)')
js2 = js2.replace('if (val.length >= 8) {', 'if (val.length >= 8 && codeInput.value.length >= 4) {')
js2 = js2.replace('if (submitBtn.classList.contains("disabled")) return;', 'if (submitBtn.classList.contains("disabled") || phoneInput.value.length < 8 || codeInput.value.length < 4) return;')
js2 = js2.replace('phoneInput.value = "";', 'phoneInput.value = "";\n    codeInput.value = "";\n    updateGetCodeState();')
js2 = js2.replace('e.target.value = val;', 'e.target.value = val;\n    updateGetCodeState();')

with open('/Users/jiangshuang/Documents/GitHub/landing page/assets/js/my-id-lead.js', 'w', encoding='utf-8') as f:
    f.write(js2)

