import domtoimage from 'dom-to-image';
import { io } from "socket.io-client";
import robot from 'robotjs';
var interval;
const socket = io("https:localhost:5000");
export const ipcStart = () => {
    console.log(" Screen Share started ");

    interval = setInterval(function() {
        domtoimage.toBlob(document.getElementById('my-node'))
        .then(function (blob) {
            window.saveAs(blob, 'my-node.png');
            console.log("blob blob->",blob);
            let base64Stream;
            var reader = new FileReader();
            reader.readAsDataURL(blob); 
            reader.onloadend = function() {
            var base64data = reader.result;  
            base64Stream = base64data;              
            console.log(base64data);
            }

           socket.emit("screen-data", JSON.stringify(base64Stream));
        });
     },1000);

     socket.on("mouse-move", function(data){
        var obj = JSON.parse(data);
        var x = obj.x;
        var y = obj.y;

        robot.moveMouse(x, y);
    })

    socket.on("mouse-click", function(data){
        robot.mouseClick();
    })
}


export const ipcStop = () => {
    clearInterval(interval);
}

