import io from 'socket.io-client';

const socket = io.connect(`http://${location.hostname}:3001`);
export default socket;
