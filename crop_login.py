from PIL import Image

# Open the image
img = Image.open("/Users/jiangshuang/Documents/GitHub/landing page/assets/ui/login_new.png")

# The image is 756 x 859. The red box starts around the white card.
# We want to crop the top part to use as the hero background.
# Let's crop from x=160 to x=596 (width 436) and y=100 to y=520 (height 420)
# This is an estimate based on typical phone mockups.
# Actually, let's just crop the top 420 pixels of the whole image and center it via CSS.
# Or better, let's crop the actual phone screen area.
# Let's just use CSS background-position: top center; background-size: cover;
# and we don't need to crop it via python if CSS handles it well.
