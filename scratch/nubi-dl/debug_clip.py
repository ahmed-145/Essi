import os
import sys

def main():
    import UnityPy
    file_path = "/home/ahmeed/Documents/NEEDS/Personaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Essi/Essi-fr/essi-rn/scratch/nobiina_apk_extracted/assets/bin/Data/data.unity3d"
    
    env = UnityPy.load(file_path)
    for obj in env.objects:
        if obj.type.name == "AudioClip":
            clip = obj.read()
            print("clip.m_Name:", clip.m_Name)
            print("m_CompressionFormat:", clip.m_CompressionFormat)
            print("m_Frequency:", clip.m_Frequency)
            print("m_Channels:", clip.m_Channels)
            print("m_Format:", clip.m_Format)
            print("m_Resource:", clip.m_Resource)
            print("m_AudioData size:", len(clip.m_AudioData) if hasattr(clip, 'm_AudioData') else 'no m_AudioData')
            break

if __name__ == "__main__":
    main()
