import os
import zipfile

root_dir = os.path.dirname(os.path.abspath(__file__))
zip_path = os.path.abspath(os.path.join(root_dir, "..", "carrot-ai.zip"))

exclude_dirs = {"node_modules", ".git", "__pycache__", "dist", ".vscode", ".idea"}
exclude_extensions = {".pyc", ".pyo"}

count = 0
with zipfile.ZipFile(zip_path, 'w', zipfile.ZIP_DEFLATED) as zipf:
    for root, dirs, files in os.walk(root_dir):
        dirs[:] = [d for d in dirs if d not in exclude_dirs]
        for f in files:
            if any(f.endswith(ext) for ext in exclude_extensions):
                continue
            if f == "carrot-ai.zip":
                continue
            full_path = os.path.join(root, f)
            arcname = os.path.relpath(full_path, root_dir)
            zipf.write(full_path, arcname)
            count += 1

print(f"Packaged {count} files into {zip_path}")
