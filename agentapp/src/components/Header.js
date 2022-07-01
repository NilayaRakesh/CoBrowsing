import 'bootstrap/dist/css/bootstrap.css';
import { io } from "socket.io-client";
import { useEffect, useState } from 'react';

const Header = () => {

    const joinRoom = "joinRoom", screenShare ="screenShare", mouseMovement = "mouseMovement", mouseClick = "mouseClick";

    let socket,sessionKey;

    let bdata;

    const [sharedScreen, setSharedScreen] = useState(false);

    const [MousePosition, setMousePosition] = useState({
        left: 0,
        top: 0
    })


    useEffect(() => {
        console.log("mouse position is use effect: ", MousePosition);
    },[MousePosition]);


    function handleMouseMove(ev){
        setMousePosition({
            left:ev.pageX,
            top: ev.pageY
        });
        //console.log("mouse position is: ", MousePosition);
        let cursorPosition = {"x":MousePosition.left,"y":MousePosition.top};
        socket.emit(mouseMovement,cursorPosition);
    }

    function handleClick(){
        console.log("mouse click event");
        let clickObj = {"sessionKey":sessionKey};
        socket.emit(mouseClick,JSON.stringify(clickObj));
    }

    function launchScreenSession(){
        //To be refactored using state
        sessionKey = prompt("Please enter the session key:");
        if(sessionKey.trim().length == 0) {
            document.write("<h1> Session key is mandatory to join </h1>");
            return;
        }
        launchSessionConnect(sessionKey);
        setSharedScreen(true);
    }



    function launchSessionConnect(sessionKey){
        const socket = io("http://localhost:5001"); // Need to update the host:ip
        let connectionInfo = {"agent":"Mr. Agent","sessionKey": sessionKey};
        socket.emit(joinRoom,JSON.stringify(connectionInfo));
        //Listening to the screen-data channel
        socket.on(screenShare,function(message){
            //Identify the sharecontent element and pass the base64 encoded data
            document.getElementById('sharedContent').setAttribute("src","data:image/png;base64," + bdata);
    });
}

    // function testImageLoad(){
    //     let element =document.getElementById('sharedContent');
    //     //console.log(element);
    //     document.getElementById('sharedContent').setAttribute("src","data:image/png;base64," + bdata);
    // }

    return (
        <div 
        style={{left:MousePosition.left , top: MousePosition.top}}
        >
        <p className='ml-auto'>
        Marcus agent app
        </p>
        <br/>
        <p className="d-flex justify-content-between">
            Hi, Mr. Agent
        </p>
        <button type="button" onClick={launchScreenSession}>C!onnect with customer session</button>
        {sharedScreen &&
        <div onMouseMove={(ev)=> handleMouseMove(ev)}
        onClick = {(ev) => handleClick(ev)}>
        <br/>
            <p>
                Connnected session 
            </p>
           <img id="sharedContent" src='data:image/png;base64'/>
        </div>
        }
        </div>
    );
}

export default Header;