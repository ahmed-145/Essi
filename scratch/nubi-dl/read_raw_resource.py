import os
import sys

def main():
    import UnityPy
    file_path = "/home/ahmeed/Documents/NEEDS/Personaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Essi/Essi-fr/essi-rn/scratch/nobiina_apk_extracted/assets/bin/Data/data.unity3d"
    resource_dir = "/home/ahmeed/Documents/NEEDS/Personaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Essi/Essi-fr/essi-rn/scratch/nobiina_apk_extracted/assets/bin/Data/"

    env = UnityPy.load(file_path)
    for obj in env.objects:
        if obj.type.name == "AudioClip":
            clip = obj.read()
            res = clip.m_Resource
            print(f"AudioClip: {clip.m_Name}")
            print(f"Resource Source: {res.m_Source}")
            print(f"Offset: {res.m_Offset}, Size: {res.m_Size}")
            
            # Read sharedassets0.resource at offset
            res_path = os.path.join(resource_dir, res.m_Source)
            if os.path.exists(res_path):
                with open(res_path, 'rb') as f:
                    f.seek(res.m_Offset)
                    data = f.read(min(32, res.m_Size))
                    print("Hex bytes:", data.hex())
                    print("ASCII representation:", ''.join(chr(b) if 32 <= b < 127 else '.' for b in data))
            else:
                print(f"Resource file {res_path} not found!")
            break

if __name__ == "__main__":
    main()
