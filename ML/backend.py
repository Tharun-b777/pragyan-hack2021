from flask import Flask
import joblib
import librosa
import glob
import numpy as np
import os
app=Flask(__name__)
model = joblib.load('Model')
@app.route('/')
def index():
    try:
        path = os.path.dirname(__file__) + '/../'
        audioFiles = glob.glob(path+'*.wav')
        message='Fake call'
        for audioFile in audioFiles:

            X, sample_rate = librosa.load(audioFile, res_type='kaiser_fast')

            mfccs = np.asarray(np.mean(librosa.feature.mfcc(
                y=X, sr=sample_rate, n_mfcc=40).T, axis=0))

            predict = model.predict(mfccs.reshape(1, -1))

        if predict:
            message='Emergency'

        return message

    except:
<<<<<<< HEAD
            return 'error'
=======
        return 'error'
>>>>>>> 2452a058b79fda4287503418f18cff1ea3d1a7e4
            

if __name__ == '__main__':
    app.run(debug=True)
