import os
import sys

def main():
    import UnityPy
    file_path = "/home/ahmeed/Documents/NEEDS/Personaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Essi/Essi-fr/essi-rn/scratch/nobiina_apk_extracted/assets/bin/Data/data.unity3d"

    env = UnityPy.load(file_path)
    count = 0
    names = []
    for obj in env.objects:
        if obj.type.name == "AudioClip":
            clip = obj.read()
            names.append((clip.m_Name, clip.m_Resource.m_Offset, clip.m_Resource.m_Size))
            count += 1
            
    print(f"Total AudioClip objects: {count}")
    # Sort names
    print("First 100 AudioClip names:")
    for n, o, s in sorted(names, key=lambda x: (x[0], x[1]))[:100]:
        print(f"  Name: {n} | Offset: {o} | Size: {s}")

if __name__ == "__main__":
    main()
