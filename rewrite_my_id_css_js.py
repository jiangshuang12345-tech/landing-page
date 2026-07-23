import re

# Update CSS
with open('/Users/jiangshuang/Documents/GitHub/landing page/assets/css/my-id-lead.css', 'r', encoding='utf-8') as f:
    css = f.read()

css = css.replace('html[data-active-lang="vn"] .lang-cn { display: none !important; }', 
                  'html[data-active-lang="my"] .lang-id, html[data-active-lang="my"] .lang-en { display: none !important; }')
css = css.replace('html[data-active-lang="cn"] .lang-vn { display: none !important; }',
                  'html[data-active-lang="id"] .lang-my, html[data-active-lang="id"] .lang-en { display: none !important; }\nhtml[data-active-lang="en"] .lang-my, html[data-active-lang="en"] .lang-id { display: none !important; }')

with open('/Users/jiangshuang/Documents/GitHub/landing page/assets/css/my-id-lead.css', 'w', encoding='utf-8') as f:
    f.write(css)

# Update JS
with open('/Users/jiangshuang/Documents/GitHub/landing page/assets/js/my-id-lead.js', 'r', encoding='utf-8') as f:
    js = f.read()

js_replacement = """
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
"""
js = re.sub(r'const lang = btn\.getAttribute\("data-lang"\);.*?\}\n', js_replacement, js, flags=re.DOTALL)

with open('/Users/jiangshuang/Documents/GitHub/landing page/assets/js/my-id-lead.js', 'w', encoding='utf-8') as f:
    f.write(js)

