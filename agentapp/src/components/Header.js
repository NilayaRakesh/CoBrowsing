import 'bootstrap/dist/css/bootstrap.css';
import { io } from "socket.io-client";
import { useEffect, useState } from 'react';

const SERVER_ADDRESS = "http://localhost:5001";
const JOIN_ROOM_EVENT = "joinRoom", SCREEN_SHARE_EVENT = "screenShare", MOUSE_MOVEMENT_EVENT = "mouseMovement", MOUSE_CLICK_EVENT = "mouseClick", SCREEN_SHARE_INGESTION_EVENT = "screenShareIngestion";

let socket, sessionKey;

const Header = () => {

    let bdata;

    const [sharedScreen, setSharedScreen] = useState(false);
    const [mousePosition, setMousePosition] = useState({
        left: 0,
        top: 0
    })

    useEffect(() => {
        console.log("mouse position is use effect: ", mousePosition);
    }, [mousePosition]);


    function handleMouseMove(ev) {
        setMousePosition({
            left: ev.pageX,
            top: ev.pageY
        });
        console.log("Resetting mouse position to ", mousePosition);
        let payload = { "x": mousePosition.left, "y": mousePosition.top };
        console.log("Emitting %s event for roomId %s with payload %s", MOUSE_MOVEMENT_EVENT, sessionKey, payload);
        socket.emit(MOUSE_MOVEMENT_EVENT, sessionKey, payload);
    }


    function handleClick() {
        console.log("Emitting %s event for roomId %s", MOUSE_CLICK_EVENT, sessionKey);
        socket.emit(MOUSE_CLICK_EVENT, sessionKey);
    }


    function promptSessionLaunch() {
        //To be refactored using state
        sessionKey = prompt("Please enter the session key:");
        if (sessionKey.trim().length == 0) {
            document.write("<h1> Session key is mandatory to join </h1>");
            return;
        }
        startSession(sessionKey);
        setSharedScreen(true);
    }


    function startSession(sessionKey) {
        socket = io(SERVER_ADDRESS);
        
        let connectionInfo = {"sessionKey": sessionKey, "agent": "Mr. Agent"};
        console.log("Emitting %s event for roomId %s", JOIN_ROOM_EVENT, sessionKey);
        socket.emit(JOIN_ROOM_EVENT, sessionKey, connectionInfo);
        
        socket.on(SCREEN_SHARE_EVENT, (payload) => {
            console.log("Received %s event", SCREEN_SHARE_EVENT);
            //Identify the sharecontent element and pass the base64 encoded data
            document.getElementById('sharedContent').setAttribute("src", "data:image/png;base64," + payload);
        });
    }

    return (
        <div style={{ left: mousePosition.left, top: mousePosition.top }}>
            <h1 className='ml-auto'> Marcus agent app </h1>
            <br />
            <p className="d-flex justify-content-between"> Hi, Mr. Agent</p>
            <button type="button" onClick={promptSessionLaunch}>Connect with customer session</button>
            {sharedScreen &&
                <div 
                // onMouseMove={(ev) => handleMouseMove(ev)} 
                onClick={(ev) => handleClick(ev)}
                >
                    <br />
                    <p>
                        Connnected session
                    </p>
                    <img id="sharedContent" src='data:image/png;base64' />
                </div>
            }
        </div>
    );
}

export default Header;