import re

with open('/Users/jiangshuang/Documents/GitHub/landing page/my-id-lead.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Update CSS/JS links
content = content.replace('vn-lead.css', 'my-id-lead.css')
content = content.replace('vn-lead.js', 'my-id-lead.js')

# Update html lang and data-active-lang
content = content.replace('<html lang="vi" data-active-lang="vn">', '<html lang="ms" data-active-lang="my">')

# Update lang-switch
navbar_replacement = """  <nav class="navbar">
    <div class="logo">
      <span class="logo-icon">🦖</span>
      <span class="logo-text">Dino English</span>
    </div>
    <div class="lang-switch">
      <button class="lang-btn active" data-lang="my">MY</button>
      <button class="lang-btn" data-lang="id">ID</button>
      <button class="lang-btn" data-lang="en">EN</button>
    </div>
  </nav>"""
content = re.sub(r'<nav class="navbar">.*?</nav>', navbar_replacement, content, flags=re.DOTALL)

# Hero Section
content = content.replace('<div class="tag lang-vn">🏆 ĐỐI TÁC VIPKID ETS LEXILE</div>\n        <div class="tag lang-cn">🏆 ETS LEXILE VIPKID 合作伙伴</div>', 
                          '<div class="tag lang-my">🏆 Serendah RM5 Setiap Kelas</div>\n        <div class="tag lang-id">🏆 Mulai dari RM5 per Kelas</div>\n        <div class="tag lang-en">🏆 Only RM 5 per class</div>')
content = content.replace('<h1 class="title lang-vn">Bài học tiếng Anh cho bé theo dõi</h1>\n        <h1 class="title lang-cn">让孩子追着学的英语课</h1>',
                          '<h1 class="title lang-my">Bantu Anak Anda Bertutur Bahasa Inggeris dengan Yakin</h1>\n        <h1 class="title lang-id">Bantu Si Kecil Berani Bicara Bahasa Inggris</h1>\n        <h1 class="title lang-en">Help Your Child Speak English with Confidence</h1>')

content = content.replace('<ul class="hero-features">', '<ul class="hero-features" style="font-size: 16px; font-weight: 500;">')
content = content.replace('<li class="lang-vn"><span class="check">✓</span> Bé thích học, tự tin nói, phản hồi tức thì</li>\n          <li class="lang-cn"><span class="check">✓</span> 孩子喜欢学，自信开口，即时反馈</li>',
                          '<li class="lang-my">Bila-bila Masa, Di Mana Sahaja.</li>\n          <li class="lang-id">Kapan Saja, Di Mana Saja.</li>\n          <li class="lang-en">Anytime, Anywhere with the most advanced AI companion.</li>')
content = re.sub(r'<li class="lang-vn"><span class="check">✓</span> Câu chuyện.*?</li>\n          <li class="lang-cn"><span class="check">✓</span> 故事化.*?</li>', '', content)
content = re.sub(r'<li class="lang-vn"><span class="check">✓</span> 13 năm.*?</li>\n          <li class="lang-cn"><span class="check">✓</span> 13年教研.*?</li>', '', content)
content = re.sub(r'<li class="lang-vn"><span class="check">✓</span> Chất lượng.*?</li>\n          <li class="lang-cn"><span class="check">✓</span> 北美外教.*?</li>', '', content)
content = re.sub(r'<li class="lang-vn"><span class="check">✓</span> Học mọi lúc.*?</li>\n          <li class="lang-cn"><span class="check">✓</span> 在家随时.*?</li>', '', content)

# Form Section
content = content.replace('<h3 class="lang-vn">Nhận một lớp học dùng thử miễn phí</h3>\n        <h3 class="lang-cn">领取免费体验课</h3>',
                          '<h3 class="lang-my">Dapatkan Penilaian AI Bahasa Inggeris PERCUMA Dalam 30 Saat</h3>\n        <h3 class="lang-id">Dapatkan Tes AI Bahasa Inggris GRATIS dalam 30 Detik</h3>\n        <h3 class="lang-en">Get Your FREE AI English Assessment in 30 Seconds</h3>')

content = content.replace('<span class="flag">🇻🇳</span> +84', '<span class="flag lang-my">🇲🇾</span><span class="flag lang-id" style="display:none;">🇮🇩</span><span class="flag lang-en" style="display:none;">🇲🇾</span> <span id="phone-code">+60</span>')

content = content.replace('<button class="btn-submit shaking" id="submit-btn" disabled>\n          <span class="lang-vn">Nhận ngay (Lấy mã)</span>\n          <span class="lang-cn">立即领取</span>\n        </button>',
                          '<button class="btn-submit shaking" id="submit-btn" disabled>\n          <span class="lang-my">Dapatkan Penilaian PERCUMA Saya →</span>\n          <span class="lang-id">Dapatkan Tes GRATIS Saya →</span>\n          <span class="lang-en">Get My FREE Assessment →</span>\n        </button>\n        <p class="form-hint lang-my" style="font-size: 12px; color: #666; margin-top: 12px; text-align: center;">Perunding pembelajaran kami akan hubungi anda dalam masa 24 jam untuk berkongsi cadangan pembelajaran dan mengaktifkan percubaan PERCUMA anda.</p>\n        <p class="form-hint lang-id" style="font-size: 12px; color: #666; margin-top: 12px; text-align: center;">Konsultan belajar kami akan menghubungi Anda dalam 24 jam untuk memberikan rekomendasi belajar dan mengaktifkan trial GRATIS Anda.</p>\n        <p class="form-hint lang-en" style="font-size: 12px; color: #666; margin-top: 12px; text-align: center;">Our course consultant will contact you within 24 hours with your personalised learning recommendation and FREE trial activation.</p>')

# Replace Modules entirely based on new brief
modules_replacement = """
    <!-- Module 2: Trusted -->
    <section class="module">
      <div class="module-header">
        <h2 class="lang-my">Dipercayai Lebih 1.8 Juta Keluarga.</h2>
        <h2 class="lang-id">Dipercaya Lebih dari 1,8 Juta Keluarga.</h2>
        <h2 class="lang-en">Trusted by 1.8 Million Families Worldwide.</h2>
        <p class="lang-my" style="color: #666; margin-top: 8px; line-height: 1.5;">Kurikulum yang dibangunkan selama 13 tahun, selaras dengan CEFR dan telah membantu lebih 1.8 juta keluarga di seluruh dunia.</p>
        <p class="lang-id" style="color: #666; margin-top: 8px; line-height: 1.5;">Kurikulum yang dikembangkan selama 13 tahun, selaras dengan CEFR, dan sudah dipercaya lebih dari 1,8 juta keluarga di seluruh dunia.</p>
        <p class="lang-en" style="color: #666; margin-top: 8px; line-height: 1.5;">Built on a proven curriculum refined over 13 years, fully aligned with CEFR and trusted by over 1.8 million families worldwide.</p>
      </div>
      <div class="partner-logos" style="display:flex; justify-content:center; align-items:center; gap:30px; margin-top:24px;">
        <div style="font-weight:900; font-size:22px; color:#ff6b00; font-style:italic;">VIPKID</div>
        <div style="font-weight:800; font-size:24px; color:#0055a5; font-family:serif;">ETS</div>
        <div style="font-weight:800; font-size:20px; color:#00a4e4;">LEXILE</div>
      </div>
    </section>

    <!-- Module 3: Available anytime -->
    <section class="module bg-light">
      <div class="module-header">
        <h2 class="lang-my">Belajar Bila-bila Masa dengan Tutor AI</h2>
        <h2 class="lang-id">Belajar Kapan Saja dengan Tutor AI</h2>
        <h2 class="lang-en">Learn Anytime with Your AI Tutor</h2>
        <p class="lang-my" style="color: #666; margin-top: 8px; line-height: 1.5;">Tutor AI tersedia 24/7, membolehkan anak anda berlatih bercakap tanpa had pada hanya 10% daripada kos guru asing sebenar.</p>
        <p class="lang-id" style="color: #666; margin-top: 8px; line-height: 1.5;">Tutor AI tersedia 24/7, jadi anak bisa latihan berbicara kapan saja dengan biaya hanya 10% dari guru asing.</p>
        <p class="lang-en" style="color: #666; margin-top: 8px; line-height: 1.5;">Available 24/7, giving your child unlimited speaking practice at only 10% of the cost of a traditional foreign teacher.</p>
      </div>
    </section>

    <!-- Module 4: CEFR -->
    <section class="module">
      <div class="module-header">
        <h2 class="lang-my">Laluan Pembelajaran Yang Berkembang Bersama Anak Anda</h2>
        <h2 class="lang-id">Jalur Belajar yang Tumbuh Bersama Si Kecil</h2>
        <h2 class="lang-en">A Structured Learning Path That Grows With Your Child</h2>
        <p class="lang-my" style="color: #666; margin-top: 8px; line-height: 1.5;">Mengikut piawaian CEFR yang diiktiraf di seluruh dunia, setiap pelajaran disesuaikan mengikut tahap anak anda, daripada Pre-A1 hingga B1, dengan kemajuan yang jelas.</p>
        <p class="lang-id" style="color: #666; margin-top: 8px; line-height: 1.5;">Mengikuti standar CEFR yang diakui secara internasional, setiap pelajaran disesuaikan dengan level anak, dari Pre-A1 hingga B1, sehingga kemajuannya jelas terlihat.</p>
        <p class="lang-en" style="color: #666; margin-top: 8px; line-height: 1.5;">Following the internationally recognised CEFR framework, every lesson is tailored to your child's level, from Pre-A1 to B1, ensuring clear and measurable progress.</p>
      </div>
      <div class="module-image" style="margin-top: 24px;">
        <img src="Landing Page - MY _ ID/图片和附件/课程体系对标Curriculum System.png" alt="CEFR Curriculum System" style="width: 100%; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
      </div>
    </section>

    <!-- Module 5: AI Tech -->
    <section class="module bg-light" style="padding-bottom: 60px;">
      <div class="module-header">
        <h2 class="lang-my">Dikuasakan oleh AI Pelbagai Bahasa yang Paling Canggih</h2>
        <h2 class="lang-id">Didukung AI Multibahasa Tercanggih</h2>
        <h2 class="lang-en">Powered by the World's Most Advanced Multilingual AI</h2>
        <p class="lang-my" style="color: #666; margin-top: 8px; line-height: 1.5;">Memahami Bahasa Inggeris, Cina, Melayu, Arab dan banyak lagi, lalu menyesuaikan pembelajaran mengikut bahasa pertama anak anda untuk pengalaman yang lebih peribadi.</p>
        <p class="lang-id" style="color: #666; margin-top: 8px; line-height: 1.5;">Memahami Bahasa Inggris, Mandarin, Melayu, Arab, dan lainnya, sehingga bisa menyesuaikan cara belajar sesuai bahasa ibu anak untuk pengalaman belajar yang lebih personal.</p>
        <p class="lang-en" style="color: #666; margin-top: 8px; line-height: 1.5;">Understands English, Chinese, Malay, Arabic and more, adapting naturally to your child's language background for a more personalised learning experience.</p>
      </div>
    </section>
"""
content = re.sub(r'<!-- Module 2: Active Learning -->.*?</section>\s*<footer', modules_replacement + '\n    <footer', content, flags=re.DOTALL)

# Modal
content = content.replace('<h3 class="modal-title lang-vn">Đăng ký thành công!</h3>\n      <h3 class="modal-title lang-cn">报名成功！</h3>',
                          '<h3 class="modal-title lang-my">Pendaftaran Berjaya!</h3>\n      <h3 class="modal-title lang-id">Pendaftaran Berhasil!</h3>\n      <h3 class="modal-title lang-en">Registration Successful!</h3>')
content = content.replace('<p class="modal-cn lang-cn">🎉 免费体验课领取成功！专属学习顾问将很快与您联系。<br><br>👉 强烈建议您<b>现在下载 App</b>，立即为孩子解锁 AI 互动外教课与海量免费资源，提前开启英语之旅！</p>',
                          '<p class="modal-en lang-en">🎉 FREE Assessment claimed successfully! Your course consultant will contact you shortly.<br><br>👉 We highly recommend you <b>download the App now</b> to unlock interactive AI lessons and massive free resources for your child!</p>')
content = content.replace('<p class="modal-vn lang-vn">🎉 Đăng ký học thử thành công! Cố vấn học tập sẽ sớm liên hệ với bạn.<br><br>👉 Hãy <b>tải App ngay bây giờ</b> để mở khóa các bài học AI tương tác và kho tài nguyên miễn phí cho bé!</p>',
                          '<p class="modal-my lang-my">🎉 Penilaian PERCUMA berjaya dituntut! Perunding kursus anda akan menghubungi anda sebentar lagi.<br><br>👉 Kami sangat mengesyorkan anda <b>memuat turun App sekarang</b> untuk membuka kunci pelajaran AI interaktif dan sumber percuma yang besar untuk anak anda!</p>\n      <p class="modal-id lang-id">🎉 Tes GRATIS berhasil diklaim! Konsultan kursus Anda akan segera menghubungi Anda.<br><br>👉 Kami sangat menyarankan Anda <b>mengunduh Aplikasi sekarang</b> untuk membuka pelajaran AI interaktif dan sumber daya gratis yang besar untuk anak Anda!</p>')
content = content.replace('<span class="lang-vn">Tải App ngay (Download Now)</span>\n        <span class="lang-cn">立即下载 App</span>',
                          '<span class="lang-my">Muat Turun App Sekarang</span>\n        <span class="lang-id">Unduh Aplikasi Sekarang</span>\n        <span class="lang-en">Download App Now</span>')

with open('/Users/jiangshuang/Documents/GitHub/landing page/my-id-lead.html', 'w', encoding='utf-8') as f:
    f.write(content)

