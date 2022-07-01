const spawn = require("child_process").spawn;
const AWS_KEYS = "QUtJQVZUUFNJNVhQUDREMldTQkk6UVlVa3E4M0duRXRoNHZEVDFjNHNSblNRMzZHUEpRV084U0ZsQkladw==";

module.exports = {
    createVideo: function(room){
        console.log("spawning python script");
        spawn('python3',["scripts/s3_to_video.py", room, atob(AWS_KEYS).split(":")[0], atob(AWS_KEYS).split(":")[1]]);
    }
}