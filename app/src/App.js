import './App.css';
import { socket } from './socket';
import {React, useState, useEffect} from 'react';
import InfoBox from './InfoBox';

function App() {

  const [isConnected, setConnected ] = useState(socket.connected);
  const [message, setMessage] = useState('');

  useEffect(()=>{
    socket.connect();

    function onConnection(){
      setConnected(true);
    };
    function onConnected(data){
      console.log('message recieved!')
      setMessage(data.message);
    }

    function onDisconnection(){
      setConnected(false);
      setMessage('No Message')
    };
    function onError(err){
      console.log(err.message);
      console.log(err.description);
      console.log(err.context);
    }

    socket.on('connect',onConnection);
    socket.on('connected',(data)=>{onConnected(data)})
    socket.on('disconnect',onDisconnection);
    socket.on('connect_error',(err)=>onError(err));

    return ()=>{
      socket.off('connect',onConnection);
      socket.on('connected',onConnected)
      socket.off('disconnect',onDisconnection);
      socket.off('connect_error',onError);
    }
    
  },[])
  return (
    <div className="App">
      <InfoBox isConnected={isConnected} message={message}/>
    </div>
  );
}

export default App;
