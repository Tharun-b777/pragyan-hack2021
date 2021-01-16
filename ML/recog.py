#!/usr/bin/env python3
import speech_recognition as sr 
import glob
files=glob.glob('*.wav')
r = sr.Recognizer()
test=sr.AudioFile('')
for audiofile in audioflies
    with audiofile as source:
        r.adjust_for_ambient_noise(source)
        audio=r.record(source)
    print(r.recognize_google(audio))
