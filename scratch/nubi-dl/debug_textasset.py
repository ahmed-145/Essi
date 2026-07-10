import os
import sys

def main():
    import UnityPy
    file_path = "/home/ahmeed/Documents/NEEDS/Personaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Essi/Essi-fr/essi-rn/scratch/nobiina_apk_extracted/assets/bin/Data/data.unity3d"
    
    env = UnityPy.load(file_path)
    for obj in env.objects:
        if obj.type.name == "TextAsset":
            text_asset = obj.read()
            print("TextAsset attributes:", dir(text_asset))
            print("m_Name:", text_asset.m_Name)
            if hasattr(text_asset, 'script'):
                print("script type:", type(text_asset.script))
            if hasattr(text_asset, 'm_Script'):
                print("m_Script type:", type(text_asset.m_Script))
                # Check if we can decode it
                try:
                    s = text_asset.m_Script
                    if isinstance(s, bytes):
                        print("m_Script bytes length:", len(s))
                        print("m_Script preview:", s[:100])
                    else:
                        print("m_Script length:", len(s))
                        print("m_Script preview:", s[:100])
                except Exception as e:
                    print("Error printing m_Script:", e)
            break

if __name__ == "__main__":
    main()
