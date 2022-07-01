const spawn = require("child_process").spawn;

module.exports = {
    createVideo: function(room){
        console.log("spawning python script");
        spawn('python3',["scripts/s3_to_video.py", room]);
    }
}