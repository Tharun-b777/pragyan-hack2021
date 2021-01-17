import speech_recognition as sr
from flask import Flask
import joblib
import librosa
import glob
import numpy as np
import os

app=Flask(__name__)
model=joblib.load('Model')
r = sr.Recognizer()

def recognised(audiofile):
    with sr.AudioFile(audiofile) as source:
        r.adjust_for_ambient_noise(source)
        audio = r.record(source)

    text=r.recognize_google(audio)
    print(text)

    if 'HELP' in text.upper():
        return 1
    else:
        return 0
    


@app.route('/')
def index():

    try:
        path = os.path.dirname(__file__) + '/../'
        audioFiles = glob.glob(path+'*.wav')
        for audioFile in audioFiles:

            message = 'Fake call'
            if (recognised(audioFile)):

                X, sample_rate = librosa.load(audioFile, res_type='kaiser_fast')

                mfccs = np.asarray(np.mean(librosa.feature.mfcc(
                    y=X, sr=sample_rate, n_mfcc=40).T, axis=0))

                predict = model.predict(mfccs.reshape(1, -1))

                if predict:
                    message='Emergecy'

            return message

    except:
        return 'error'
            
if __name__ == '__main__':
    app.run(debug=True)
