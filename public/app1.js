const socketio = io.connect('http://localhost:3000/');
const socket = socketio.on('connect', function() {
    console.log("connected");
});

function starter() {
    navigator.getUserMedia({
        audio: true
    }, function(stream) {
            recordAudio = RecordRTC(stream, {
            type: 'audio',
            mimeType: 'audio/webm',
            sampleRate: 45000,
            desiredSampRate: 16000,
            recorderType: StereoAudioRecorder,
            numberOfAudioChannels: 1,
            timeSlice: 6000,
            ondataavailable: function(blob) {
                var stream = ss.createStream();
                ss(socket).emit('audio-stream', stream, {
                    name: 'audio.wav', 
                    size: blob.size
                });
                ss.createBlobReadStream(blob).pipe(stream);
            }
        });
        recordAudio.startRecording();
    }, function(error) {
        console.error(JSON.stringify(error));
    });
};

socketio.on('results', function (data) {
    console.log(data);
    if(data){
        $('#results').append(data);
    }
});

function start(){
    try{
        starter();
    }catch(err){
        console.log(err);
        alert("error while tracking audio");
    }
}

start();