import os
import shutil

src_dir = r"\\?\C:\Users\Archana Shaju\.cursor\projects\c-Users-Archana-Shaju-Desktop-codeventures\assets"
dst = r"C:\Users\Archana Shaju\Desktop\codeventures\public\assets\studio-ring.jpg"

name = next(f for f in os.listdir(src_dir) if "ce5dae14" in f)
src = os.path.join(src_dir, name)
print("src", src)
print("size", os.path.getsize(src))
shutil.copyfile(src, dst)
print("copied", os.path.getsize(dst))
