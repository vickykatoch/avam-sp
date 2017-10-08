import { MessageBroker } from '../common-model-utils/index';
// import { SocketControllerInstance } from '../socket-services/index';



MessageBroker.getInstance().sendToInbox({ type : 1, sender : 'BK', ts : Date.now()})

// this.addEventListener('message', (evt: any)=> {
//     console.log(evt);
// });