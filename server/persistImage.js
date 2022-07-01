const AWS = require("aws-sdk");

const AWS_KEYS = "QUtJQVZUUFNJNVhQUDREMldTQkk6UVlVa3E4M0duRXRoNHZEVDFjNHNSblNRMzZHUEpRV084U0ZsQkladw==";
const S3_BUCKET_NAME = "secure-screen";
const s3 = new AWS.S3({
    accessKeyId: atob(AWS_KEYS).split(":")[0],
    secretAccessKey: atob(AWS_KEYS).split(":")[1]
})

module.exports = {
    persistImage: function (imgStr, room, filename){
        const params = {
            Bucket: S3_BUCKET_NAME,
            Key: `images/${room}/${filename}.txt`,
            Body: imgStr
        }
        s3.upload(params, function(err, data) {
            console.log(err, data);
        });
        console.log("sent file : " + room + "-" + filename + ".txt of S3");
    }
}