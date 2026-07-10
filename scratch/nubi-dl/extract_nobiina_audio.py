import os
import sys

def main():
    try:
        import UnityPy
        import fsb5
    except ImportError as e:
        print("Required libraries not installed:", e)
        sys.exit(1)

    file_path = "/home/ahmeed/Documents/NEEDS/Personaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Essi/Essi-fr/essi-rn/scratch/nobiina_apk_extracted/assets/bin/Data/data.unity3d"
    resource_dir = "/home/ahmeed/Documents/NEEDS/Personaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Essi/Essi-fr/essi-rn/scratch/nobiina_apk_extracted/assets/bin/Data/"
    dest_dir = "/home/ahmeed/Documents/NEEDS/Personaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Essi/Essi-fr/essi-rn/scratch/nobiina_extracted_audio/"

    os.makedirs(dest_dir, exist_ok=True)
    print(f"Loading Unity environment from {file_path}...")
    env = UnityPy.load(file_path)
    
    count = 0
    errors = 0
    
    for obj in env.objects:
        if obj.type.name == "AudioClip":
            try:
                clip = obj.read()
                res = clip.m_Resource
                clip_name = clip.m_Name
                
                # Check if it has a valid resource source
                if not res or not res.m_Source:
                    continue
                
                res_path = os.path.join(resource_dir, res.m_Source)
                if not os.path.exists(res_path):
                    continue
                    
                # Read FSB5 bytes from external resource
                with open(res_path, 'rb') as rf:
                    rf.seek(res.m_Offset)
                    fsb_bytes = rf.read(res.m_Size)
                
                # Parse FSB5
                fsb = fsb5.FSB5(fsb_bytes)
                
                # Extract samples
                for sample in fsb.samples:
                    ext = fsb.get_sample_extension()
                    # Use clip name or sample name
                    out_name = f"{clip_name}.{ext}"
                    out_path = os.path.join(dest_dir, out_name)
                    
                    with open(out_path, 'wb') as wf:
                        wf.write(sample.data)
                    
                    print(f"✅ Extracted: {out_name} ({len(sample.data)} bytes)")
                    count += 1
            except Exception as e:
                errors += 1
                # print(f"Error extracting clip: {e}")
                
    print(f"Extraction complete! Successfully extracted {count} clips ({errors} errors).")

if __name__ == "__main__":
    main()
