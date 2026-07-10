import os
import sys

def main():
    import UnityPy
    file_path = "/home/ahmeed/Documents/NEEDS/Personaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Essi/Essi-fr/essi-rn/scratch/nobiina_apk_extracted/assets/bin/Data/data.unity3d"
    dest_dir = "/home/ahmeed/Documents/NEEDS/Personaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Essi/Essi-fr/essi-rn/scratch/nobiina_extracted_text/"

    os.makedirs(dest_dir, exist_ok=True)
    print(f"Loading {file_path}...")
    env = UnityPy.load(file_path)
    
    count = 0
    for obj in env.objects:
        if obj.type.name == "TextAsset":
            try:
                text_asset = obj.read()
                name = text_asset.m_Name
                # Get script/text content
                text = ""
                if hasattr(text_asset, 'm_Script'):
                    text = text_asset.m_Script
                elif hasattr(text_asset, 'script'):
                    text = text_asset.script
                
                # If it is bytes, decode it
                if isinstance(text, bytes):
                    text = text.decode('utf-8', errors='ignore')
                
                out_path = os.path.join(dest_dir, f"{name}.txt")
                with open(out_path, 'w', encoding='utf-8') as f:
                    f.write(text)
                
                print(f"✅ Extracted TextAsset: {name}.txt ({len(text)} characters)")
                count += 1
            except Exception as e:
                print(f"Error extracting TextAsset: {e}")
                
    print(f"Done! Extracted {count} TextAssets into {dest_dir}")

if __name__ == "__main__":
    main()
