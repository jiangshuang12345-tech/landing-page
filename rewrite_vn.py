import re

with open('/Users/jiangshuang/Documents/GitHub/landing page/vn-lead.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Add data-active-lang to html
content = content.replace('<html lang="vi">', '<html lang="vi" data-active-lang="vn">')

# Add lang-switch to navbar
navbar_replacement = """  <nav class="navbar">
    <div class="logo">
      <span class="logo-icon">🦖</span>
      <span class="logo-text">Dino English</span>
    </div>
    <div class="lang-switch">
      <button class="lang-btn active" data-lang="vn">VN</button>
      <button class="lang-btn" data-lang="cn">CN</button>
    </div>
  </nav>"""
content = re.sub(r'<nav class="navbar">.*?</nav>', navbar_replacement, content, flags=re.DOTALL)

# Hero Section
content = content.replace('<div class="tag">🏆 Vipkid tự kinh doanh, 13 năm 1,80 triệu gia đình</div>', 
                          '<div class="tag lang-vn">🏆 Vipkid tự kinh doanh, 13 năm 1,80 triệu gia đình</div>\n        <div class="tag lang-cn">🏆 Vipkid自营，13年180万家庭</div>')
content = content.replace('<h1 class="title">Bài học tiếng Anh cho bé theo dõi</h1>\n        <h2 class="cn-title">让孩子追着学的英语课</h2>',
                          '<h1 class="title lang-vn">Bài học tiếng Anh cho bé theo dõi</h1>\n        <h1 class="title lang-cn">让孩子追着学的英语课</h1>')

content = content.replace('<li><span class="check">✓</span> Bé thích học, tự tin nói, phản hồi tức thì</li>',
                          '<li class="lang-vn"><span class="check">✓</span> Bé thích học, tự tin nói, phản hồi tức thì</li>\n          <li class="lang-cn"><span class="check">✓</span> 孩子喜欢学，自信开口，即时反馈</li>')
content = content.replace('<li><span class="check">✓</span> Câu chuyện, game hóa, IP đồng hành, tương tác cao</li>',
                          '<li class="lang-vn"><span class="check">✓</span> Câu chuyện, game hóa, IP đồng hành, tương tác cao</li>\n          <li class="lang-cn"><span class="check">✓</span> 故事化、游戏化、IP陪伴，高频互动</li>')
content = content.replace('<li><span class="check">✓</span> 13 năm nghiên cứu, lộ trình riêng, tiến bộ rõ ràng</li>',
                          '<li class="lang-vn"><span class="check">✓</span> 13 năm nghiên cứu, lộ trình riêng, tiến bộ rõ ràng</li>\n          <li class="lang-cn"><span class="check">✓</span> 13年教研沉淀，个性化路径，效果外化</li>')
content = content.replace('<li><span class="check">✓</span> Chất lượng giáo viên Bắc Mỹ, chỉ 1/10 giá</li>',
                          '<li class="lang-vn"><span class="check">✓</span> Chất lượng giáo viên Bắc Mỹ, chỉ 1/10 giá</li>\n          <li class="lang-cn"><span class="check">✓</span> 北美外教品质，1/10价格</li>')
content = content.replace('<li><span class="check">✓</span> Học mọi lúc, mọi nơi tại nhà</li>',
                          '<li class="lang-vn"><span class="check">✓</span> Học mọi lúc, mọi nơi tại nhà</li>\n          <li class="lang-cn"><span class="check">✓</span> 在家随时随地，高频开口</li>')

# Form Section
content = content.replace('<h3>Nhận một lớp học dùng thử miễn phí<br><small>领取免费体验课</small></h3>',
                          '<h3 class="lang-vn">Nhận một lớp học dùng thử miễn phí</h3>\n        <h3 class="lang-cn">领取免费体验课</h3>')
content = content.replace('<button class="btn-submit shaking" id="submit-btn" disabled>Nhận ngay (Lấy mã)</button>',
                          '<button class="btn-submit shaking" id="submit-btn" disabled>\n          <span class="lang-vn">Nhận ngay (Lấy mã)</span>\n          <span class="lang-cn">立即领取</span>\n        </button>')

# Module 2
content = content.replace('<h2>Hãy để bé chủ động học hỏi và lên tiếng</h2>\n        <p class="cn-sub">让孩子主动学，开口说</p>',
                          '<h2 class="lang-vn">Hãy để bé chủ động học hỏi và lên tiếng</h2>\n        <h2 class="lang-cn">让孩子主动学，开口说</h2>')
content = content.replace('<p>Cốt truyện và động lực gamified, học không nhàm chán</p>',
                          '<p class="lang-vn">Cốt truyện và động lực gamified, học không nhàm chán</p>\n          <p class="lang-cn">游戏化剧情与激励，学习不枯燥</p>')
content = content.replace('<p>Ba nhân cách giáo viên AI, bé lựa chọn độc lập</p>',
                          '<p class="lang-vn">Ba nhân cách giáo viên AI, bé lựa chọn độc lập</p>\n          <p class="lang-cn">三种AI老师人设，孩子自主选择</p>')
content = content.replace('<p>Tương tác tần số cao, mở áp suất 0, xây dựng sự tự tin</p>',
                          '<p class="lang-vn">Tương tác tần số cao, mở áp suất 0, xây dựng sự tự tin</p>\n          <p class="lang-cn">高频互动，0压力开口，建立自信</p>')
content = content.replace('<p>Vai trò IP đồng hành cùng sự phát triển và khiến bé sẵn sàng kiên trì</p>',
                          '<p class="lang-vn">Vai trò IP đồng hành cùng sự phát triển và khiến bé sẵn sàng kiên trì</p>\n          <p class="lang-cn">IP角色陪伴成长，让孩子愿意坚持</p>')

# Module 3
content = content.replace('<h2>Hệ thống giáo viên nước ngoài ở Bắc Mỹ bảo vệ hiệu ứng</h2>\n        <p class="cn-sub">北美外教课程体系，为效果保驾护航</p>',
                          '<h2 class="lang-vn">Hệ thống giáo viên nước ngoài ở Bắc Mỹ bảo vệ hiệu ứng</h2>\n        <h2 class="lang-cn">北美外教课程体系，为效果保驾护航</h2>')
content = content.replace('<li><span>🌟</span> Khung CEFR chuẩn quốc tế</li>',
                          '<li class="lang-vn"><span>🌟</span> Khung CEFR chuẩn quốc tế</li>\n        <li class="lang-cn"><span>🌟</span> 国际标准CEFR框架</li>')
content = content.replace('<li><span>📈</span> Lộ trình riêng, tiến bộ rõ ràng</li>',
                          '<li class="lang-vn"><span>📈</span> Lộ trình riêng, tiến bộ rõ ràng</li>\n        <li class="lang-cn"><span>📈</span> 个性化路径，进步清晰可见</li>')
content = content.replace('<li><span>👨‍🏫</span> Học tại nhà, chuẩn giáo viên Bắc Mỹ</li>',
                          '<li class="lang-vn"><span>👨‍🏫</span> Học tại nhà, chuẩn giáo viên Bắc Mỹ</li>\n        <li class="lang-cn"><span>👨‍🏫</span> 在家学，纯正北美外教标准</li>')
content = content.replace('<li><span>❤️</span> Khóa học được 1,8 triệu gia đình tin chọn suốt 13 năm</li>',
                          '<li class="lang-vn"><span>❤️</span> Khóa học được 1,8 triệu gia đình tin chọn suốt 13 năm</li>\n        <li class="lang-cn"><span>❤️</span> 13年沉淀，180万家庭信赖之选</li>')

# Module 4
content = content.replace('<h2>Sản phẩm AI tiếng Anh đầu tiên thực sự giảng dạy</h2>\n        <p class="cn-sub">第一款真正教学的 AI 英语产品， 1/10 的价格享受北美外教质量</p>',
                          '<h2 class="lang-vn">Sản phẩm AI tiếng Anh đầu tiên thực sự giảng dạy</h2>\n        <h2 class="lang-cn">第一款真正教学的 AI 英语产品， 1/10 的价格享受北美外教质量</h2>')
content = content.replace('<th>Giáo viên bản ngữ 1:1</th>', '<th><span class="lang-vn">Giáo viên bản ngữ 1:1</span><span class="lang-cn">1对1外教</span></th>')
content = content.replace('<th>AI thông thường</th>', '<th><span class="lang-vn">AI thông thường</span><span class="lang-cn">普通AI</span></th>')

content = content.replace('<td class="row-title">Hiệu ứng</td>', '<td class="row-title"><span class="lang-vn">Hiệu ứng</span><span class="lang-cn">效果</span></td>')
content = content.replace('<td>Khó tìm giáo viên giỏi</td>', '<td><span class="lang-vn">Khó tìm giáo viên giỏi</span><span class="lang-cn">好外教难寻</span></td>')
content = content.replace('<td>Nội dung rời rạc</td>', '<td><span class="lang-vn">Nội dung rời rạc</span><span class="lang-cn">内容零散</span></td>')
content = content.replace('<td class="highlight">CEFR, tiến bộ rõ ràng</td>', '<td class="highlight"><span class="lang-vn">CEFR, tiến bộ rõ ràng</span><span class="lang-cn">CEFR，进步明显</span></td>')

content = content.replace('<td class="row-title">Tương tác</td>', '<td class="row-title"><span class="lang-vn">Tương tác</span><span class="lang-cn">互动</span></td>')
content = content.replace('<td>Cần đặt lịch</td>', '<td><span class="lang-vn">Cần đặt lịch</span><span class="lang-cn">需要预约</span></td>')
content = content.replace('<td>Hỏi đáp đơn giản</td>', '<td><span class="lang-vn">Hỏi đáp đơn giản</span><span class="lang-cn">简单问答</span></td>')
content = content.replace('<td class="highlight">Tương tác mọi lúc</td>', '<td class="highlight"><span class="lang-vn">Tương tác mọi lúc</span><span class="lang-cn">随时互动</span></td>')

content = content.replace('<td class="row-title">Nhấn</td>', '<td class="row-title"><span class="lang-vn">Động lực</span><span class="lang-cn">动力</span></td>') # Changed Nhấn to Động lực for better translation
content = content.replace('<td>Cần cha mẹ nhắc nhở</td>', '<td><span class="lang-vn">Cần cha mẹ nhắc nhở</span><span class="lang-cn">需家长督促</span></td>')
content = content.replace('<td>Thiếu động lực</td>', '<td><span class="lang-vn">Thiếu động lực</span><span class="lang-cn">缺乏动力</span></td>')
content = content.replace('<td class="highlight">Game hóa khích lệ</td>', '<td class="highlight"><span class="lang-vn">Game hóa khích lệ</span><span class="lang-cn">游戏化激励</span></td>')

content = content.replace('<td class="row-title">Giá cả</td>', '<td class="row-title"><span class="lang-vn">Giá cả</span><span class="lang-cn">价格</span></td>')
content = content.replace('<td>Cao</td>', '<td><span class="lang-vn">Cao</span><span class="lang-cn">昂贵</span></td>')
content = content.replace('<td>Lộn xộn</td>', '<td><span class="lang-vn">Lộn xộn</span><span class="lang-cn">混乱</span></td>')
content = content.replace('<td class="highlight">Chỉ 1/10 giá</td>', '<td class="highlight"><span class="lang-vn">Chỉ 1/10 giá</span><span class="lang-cn">仅1/10价格</span></td>')

# Module 5
content = content.replace('<h2>Dino English, sản phẩm học tiếng Anh cho trẻ em từ VIPKID</h2>\n        <p class="cn-sub">Dino English，来自 VIPKID 的儿童英语学习产品</p>',
                          '<h2 class="lang-vn">Dino English, sản phẩm học tiếng Anh cho trẻ em từ VIPKID</h2>\n        <h2 class="lang-cn">Dino English，来自 VIPKID 的儿童英语学习产品</h2>')
content = content.replace('<p>Dino English là sản phẩm học tiếng Anh bằng AI của VIPKID, kết hợp chương trình chuẩn Bắc Mỹ, AI và trải nghiệm tương tác phù hợp với trẻ, giúp bé hứng thú học và tự tin giao tiếp.</p>',
                          '<p class="lang-vn">Dino English là sản phẩm học tiếng Anh bằng AI của VIPKID, kết hợp chương trình chuẩn Bắc Mỹ, AI và trải nghiệm tương tác phù hợp với trẻ, giúp bé hứng thú học và tự tin giao tiếp.</p>\n        <p class="lang-cn">Dino English 是 VIPKID 旗下的 AI 英语学习产品，结合北美外教标准体系、AI技术与适合儿童的互动体验，帮助孩子激发学习兴趣，自信开口表达。</p>')
content = content.replace('<p>VIPKID có 13 năm kinh nghiệm, mạng lưới 200.000 giáo viên Bắc Mỹ và được hơn 1,8 triệu gia đình lựa chọn.</p>',
                          '<p class="lang-vn">VIPKID có 13 năm kinh nghiệm, mạng lưới 200.000 giáo viên Bắc Mỹ và được hơn 1,8 triệu gia đình lựa chọn.</p>\n        <p class="lang-cn">VIPKID 拥有13年经验，20万北美外教网络，是超过180万家庭的共同选择。</p>')

# Modal
content = content.replace('<h3 class="modal-title">Đăng ký thành công!</h3>',
                          '<h3 class="modal-title lang-vn">Đăng ký thành công!</h3>\n      <h3 class="modal-title lang-cn">报名成功！</h3>')
content = content.replace('<p class="modal-cn">', '<p class="modal-cn lang-cn">')
content = content.replace('<p class="modal-vn">', '<p class="modal-vn lang-vn">')
content = content.replace('<button class="btn-download" id="btn-download">Tải App ngay (Download Now)</button>',
                          '<button class="btn-download" id="btn-download">\n        <span class="lang-vn">Tải App ngay (Download Now)</span>\n        <span class="lang-cn">立即下载 App</span>\n      </button>')

with open('/Users/jiangshuang/Documents/GitHub/landing page/vn-lead.html', 'w', encoding='utf-8') as f:
    f.write(content)

