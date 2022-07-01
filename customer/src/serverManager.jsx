import domtoimage from 'dom-to-image';
import { io } from "socket.io-client";
import {saveAs} from "file-saver";
//import robot from 'robotjs';
var interval;
const socket = io("http://localhost:5001");
export const ipcStart = () => {
    console.log(" Screen Share started ");

    interval = setInterval(function() {
        domtoimage.toBlob(document.getElementById('my-node'))
        .then(function (blob) {
           // window.saveAs(blob, 'my-node.png');
            console.log("blob blob->",blob);
            let base64Stream;
            var reader = new FileReader();
            reader.readAsDataURL(blob); 
            reader.onloadend = function() {
            var base64data = reader.result;  
            base64Stream = base64data;              
            console.log(base64data);
            const data = {
                "roomId": "123",
                "base64": base64Stream
            }
           socket.emit("shareScreen","12345",base64data);
            }
           // console.log("base 64 ->",base64Stream);
           
        });
     },1000);

     socket.on("mouseMovement", (data) => {
        var obj = JSON.parse(data);
        var x = obj.x;
        var y = obj.y;
        console.log("mouse moved");
        //robot.moveMouse(x, y);
    })

    socket.on("mouseClick", (data) => {
       // robot.mouseClick();
       console.log("mouse clicked");
    })
}


export const ipcStop = () => {
    clearInterval(interval);
}

