# Women Safety App
This is a woman safety app made as a part of the pragyan hackathon 2021. 
This is a web app that recognises the emotion of the user through their voice, looks for some keywords that represent fear, and performs necessary actions. 
This is achieved by a Machine Learning model that detects the emotions in a particular audio clip.
We have used websockets, python audio processing, speech recognisation, frontend realtime map representation, etc to bring out the full fuctionality of the app
## Requirements
- Python
- Nodejs
- Mongodb
## Setting up
Go through the necessary documentations to set up the above requirements in your system. Next you need to install the necessary node modules. This can be done by the folllowing command.
```
npm install
```
To set up the model and a backend flask api you need to first install all the necessary packages for your python environiment. Go into the ML directory and run the below command. 
```
pip install -r MLrequirements.txt
```
Next you need to set up the necessary environiment variables inside the .env file.
### How to access the website
The website can be accessed on http://localhost:3000/.
## Working of the website
The intial home page tracks your audio for a few keywords and certain emotions . When a distress is detected in your audio the website would send a message/email to a police personnal(police havent been implemented due to lack of data)  with a link from this website that gives them all the necessary details such as location, map, etc.
Additionally you can also make a direct distress call through the website.
The website excels in working with female voices as the model was exclusively trained with them. 
## Machine Learning model
### Dataset 
RAVDESS dataset. For more information visit https://www.kaggle.com/uwrfkaggler/ravdess-emotional-speech-audio/
### Other tools used 
The machine learning model is built on python. The audio analysis was done by librosa library. Other used libraries include sklearn ,numpy, etc.
### Deployment
The model is saved as a joblib file and is executed n-in a python server(flask) which acts as an api between the node application and ml model.
