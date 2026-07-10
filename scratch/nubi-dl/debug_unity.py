import os
import sys

def main():
    import UnityPy
    file_path = "/home/ahmeed/Documents/NEEDS/Personaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Essi/Essi-fr/essi-rn/scratch/nobiina_apk_extracted/assets/bin/Data/data.unity3d"
    
    print(f"Loading {file_path}...")
    try:
        env = UnityPy.load(file_path)
        print("Successfully loaded.")
        types = {}
        for obj in env.objects:
            types[obj.type.name] = types.get(obj.type.name, 0) + 1
        print("Object types count:")
        for t, c in types.items():
            print(f"  {t}: {c}")
    except Exception as e:
        print("Failed to load:", e)

if __name__ == "__main__":
    main()
