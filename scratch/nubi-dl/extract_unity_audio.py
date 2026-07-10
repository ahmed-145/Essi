import os
import sys

def main():
    try:
        import UnityPy
    except ImportError:
        print("UnityPy is not installed yet!")
        sys.exit(1)

    src_dir = "/home/ahmeed/Documents/NEEDS/Personaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Essi/Essi-fr/essi-rn/scratch/nobiina_apk_extracted/assets/bin/Data/"
    dest_dir = "/home/ahmeed/Documents/NEEDS/Personaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Essi/Essi-fr/essi-rn/scratch/nobiina_extracted_audio/"
    
    os.makedirs(dest_dir, exist_ok=True)
    print(f"Scanning Unity assets in {src_dir}...")
    
    count = 0
    for root, dirs, files in os.walk(src_dir):
        for file in files:
            file_path = os.path.join(root, file)
            # Skip managed DLLs
            if "Managed" in file_path:
                continue
            try:
                env = UnityPy.load(file_path)
                for obj in env.objects:
                    if obj.type.name == "AudioClip":
                        clip = obj.read()
                        samples = clip.samples
                        if samples:
                            for name, data in samples.items():
                                out_path = os.path.join(dest_dir, name)
                                with open(out_path, "wb") as f:
                                    f.write(data)
                                print(f"✅ Extracted: {name} ({len(data)} bytes)")
                                count += 1
            except Exception as e:
                # print(f"Error loading {file}: {e}")
                pass
                
    print(f"Done! Extracted {count} audio clips into {dest_dir}")

if __name__ == "__main__":
    main()
