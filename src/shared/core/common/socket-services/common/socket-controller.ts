import { SocketMessage, SocketMessageType, MessageBroker, SocketConnectionInfo } from "../../common-model-utils/index";
import 'rxjs/add/operator/filter';
import { SocketProvider } from "./socket-provider.interface";
// import { merge } from 'ramda';
import * as _ from 'lodash';



interface ActiveSocketInfo {
    connectionInfo                  : SocketConnectionInfo;
    provider                        : SocketProvider;
}


export class SocketController {
    private connections : { [key: string] : ActiveSocketInfo } = {};

    // #region ctor
    constructor() {
        MessageBroker.getInstance().inBox$
            .filter(this.validMessageFilter)
            .subscribe(this.onMessageReceived.bind(this));
    }
    //  #endregion
    
    // #region Public Methods
    onMessageReceived(socketMessage: SocketMessage) {
        switch(socketMessage.type) {
            case SocketMessageType.PING:
                this.pong(socketMessage);
                break;
            case SocketMessageType.INITIALIZE:
                break;
            default:
                break;
        }
    }
    // #endregion

    // #region Helper Methods
    validMessageFilter(socketMessage: SocketMessage) : boolean {
        return socketMessage !== null  && socketMessage !== undefined;
    }
    pong(socketMessage: SocketMessage) {
        const message = _.merge(socketMessage, { type: SocketMessageType.PONG});
        message.sender = '';
        MessageBroker.getInstance().sendToOutBox(message);
    }
    //#endregion
}

const socketController = new SocketController();

export { socketController as SocketControllerInstance };