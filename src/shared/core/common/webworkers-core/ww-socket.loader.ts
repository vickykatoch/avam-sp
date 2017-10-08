import { MessageBroker } from '../common-model-utils/index';
import { SocketController } from '../socket-services/index';

let satisfyCompiler : any;

MessageBroker.instance.outBox$.subscribe((message)=> postMessage(message, satisfyCompiler));

SocketController.instance.init();

onmessage = (evt: MessageEvent) => {
    MessageBroker.instance.sendToInbox(evt.data);
};

