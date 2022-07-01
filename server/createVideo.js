// const AWS = require('aws-sdk');
//
// const AWS_KEYS = "QUtJQVZUUFNJNVhQUDREMldTQkk6UVlVa3E4M0duRXRoNHZEVDFjNHNSblNRMzZHUEpRV084U0ZsQkladw==";
// const lambda = new AWS.Lambda({
//     accessKeyId: atob(AWS_KEYS).split(":")[0],
//     secretAccessKey: atob(AWS_KEYS).split(":")[1]
// })
//
// module.exports = {
//     createVideo: function(roomId){
//         console.log("triggering lambda function");
//         let payload = {
//             roomId: roomId
//         }
//         let params = {
//             FunctionName: 'helloWorld', // the lambda function we are going to invoke
//             Payload: JSON.stringify(payload)
//         };
//
//         lambda.invoke(params, function(err, data) {
//             if (err) {
//                 context.fail(err);
//             } else {
//                 console.log("Successfully ran lambda function");
//                 context.succeed('createVideoFunction said '+ data.Payload);
//             }
//         })
//     }
// }

const spawn = require("child_process").spawn;

module.exports = {
    createVideo: function(room){
        console.log("spawning python script");
        spawn('python3',["s3_to_video.py", room]);
    }
}