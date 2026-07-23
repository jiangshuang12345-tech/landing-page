import re

# Update vn-lead.css
with open('/Users/jiangshuang/Documents/GitHub/landing page/assets/css/vn-lead.css', 'r', encoding='utf-8') as f:
    css = f.read()

# Remove old input-group styles
css = re.sub(r'\.input-group \{.*?\n\}\n', '', css, flags=re.DOTALL)
css = re.sub(r'\.input-group:focus-within \{.*?\n\}\n', '', css, flags=re.DOTALL)
css = re.sub(r'\.prefix \{.*?\n\}\n', '', css, flags=re.DOTALL)
css = re.sub(r'\.prefix \.flag \{.*?\n\}\n', '', css, flags=re.DOTALL)
css = re.sub(r'#phone \{.*?\n\}\n', '', css, flags=re.DOTALL)
css = re.sub(r'#phone::placeholder \{.*?\n\}\n', '', css, flags=re.DOTALL)
css = re.sub(r'@keyframes input-breathe \{.*?\n\}\n', '', css, flags=re.DOTALL)
css = re.sub(r'\.input-group\.needs-input \{.*?\n\}\n', '', css, flags=re.DOTALL)
css = re.sub(r'\.input-group\.needs-input:focus-within \{.*?\n\}\n', '', css, flags=re.DOTALL)

# Add new field styles from prototype.css
new_styles = """
.field { display: flex; align-items: center; background: #fff; border: 1.5px solid #f0f0f5; border-radius: 30px; padding: 4px 6px 4px 6px; margin-bottom: 12px; position: relative; transition: border-color 0.2s; }
.field:focus-within { border-color: #3d7bff; }
.field--phone { padding-left: 4px; }
.cc { display: flex; align-items: center; gap: 4px; border: 0; background: transparent; font-size: 15px; font-weight: 600; color: #232049; padding: 10px 10px; cursor: default; border-right: 1px solid #eee; }
.inp { flex: 1; border: 0; outline: none; background: transparent; font-size: 16px; color: #232049; padding: 10px 12px; width: 100%; font-family: inherit; }
.inp::placeholder { color: #b7b7c6; }
.field--code .code-label { font-size: 15px; color: #6a6a7e; padding-left: 12px; white-space: nowrap; }
.inp--code { padding-left: 4px; letter-spacing: 2px; }
.getcode { border: 0; background: #f0f0f5; color: #b7b7c6; font-weight: 700; font-size: 14px; padding: 10px 16px; border-radius: 24px; cursor: pointer; white-space: nowrap; transition: all 0.2s; }
.getcode.active { background: linear-gradient(180deg,#ffd79a,#ffb765); color: #fff; }
.getcode:disabled { opacity: .7; cursor: default; background: #f0f0f5; color: #b7b7c6; }

/* Breathing Animation for Input */
@keyframes input-breathe {
  0% { border-color: #f0f0f5; box-shadow: 0 0 0 0 rgba(61, 123, 255, 0); }
  50% { border-color: rgba(61, 123, 255, 0.6); box-shadow: 0 0 0 4px rgba(61, 123, 255, 0.15); }
  100% { border-color: #f0f0f5; box-shadow: 0 0 0 0 rgba(61, 123, 255, 0); }
}
.field.needs-input {
  animation: input-breathe 2s infinite ease-in-out;
}
.field.needs-input:focus-within {
  animation: none;
  border-color: #3d7bff;
}
"""

css = css.replace('.btn-submit {', new_styles + '\n.btn-submit {')

with open('/Users/jiangshuang/Documents/GitHub/landing page/assets/css/vn-lead.css', 'w', encoding='utf-8') as f:
    f.write(css)

# Update my-id-lead.css
with open('/Users/jiangshuang/Documents/GitHub/landing page/assets/css/my-id-lead.css', 'r', encoding='utf-8') as f:
    css2 = f.read()

css2 = re.sub(r'\.input-group \{.*?\n\}\n', '', css2, flags=re.DOTALL)
css2 = re.sub(r'\.input-group:focus-within \{.*?\n\}\n', '', css2, flags=re.DOTALL)
css2 = re.sub(r'\.prefix \{.*?\n\}\n', '', css2, flags=re.DOTALL)
css2 = re.sub(r'\.prefix \.flag \{.*?\n\}\n', '', css2, flags=re.DOTALL)
css2 = re.sub(r'#phone \{.*?\n\}\n', '', css2, flags=re.DOTALL)
css2 = re.sub(r'#phone::placeholder \{.*?\n\}\n', '', css2, flags=re.DOTALL)
css2 = re.sub(r'@keyframes input-breathe \{.*?\n\}\n', '', css2, flags=re.DOTALL)
css2 = re.sub(r'\.input-group\.needs-input \{.*?\n\}\n', '', css2, flags=re.DOTALL)
css2 = re.sub(r'\.input-group\.needs-input:focus-within \{.*?\n\}\n', '', css2, flags=re.DOTALL)

css2 = css2.replace('.btn-submit {', new_styles + '\n.btn-submit {')

with open('/Users/jiangshuang/Documents/GitHub/landing page/assets/css/my-id-lead.css', 'w', encoding='utf-8') as f:
    f.write(css2)

