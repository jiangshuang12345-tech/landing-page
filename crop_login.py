from PIL import Image

img = Image.open("/Users/jiangshuang/Documents/GitHub/landing page/assets/ui/login_new.png")
# Crop the top part of the phone screen
box = (160, 100, 596, 460)
cropped_img = img.crop(box)
cropped_img.save("/Users/jiangshuang/Documents/GitHub/landing page/assets/ui/login_new_hero.png")
