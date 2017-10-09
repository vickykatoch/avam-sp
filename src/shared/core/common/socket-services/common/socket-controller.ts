import { SocketMessage, SocketMessageType, MessageBroker, SocketConnectionInfo } from "@common-model-utils/index";
import 'rxjs/add/operator/filter';
import { SocketProvider } from "./socket-provider.interface";
// import { merge } from 'ramda';
import * as _ from 'lodash-es';



interface ActiveSocketInfo {
    connectionInfo                  : SocketConnectionInfo;
    provider                        : SocketProvider;
}


export class SocketController {
    private connections: { [key: string]: ActiveSocketInfo } = {};

    // #region ctor
    constructor() {
        if (SocketController._instance) {
            throw new Error("Error: Instantiation failed: Use SocketController.instance instead of new.");
        }
        SocketController._instance = this;
    }
    //  #endregion
    
    // #region Public Methods
    init() {
        MessageBroker.instance.inBox$
        .filter(this.validMessageFilter)
        .subscribe(this.onMessageReceived.bind(this));
        MessageBroker.instance.sendToOutBox({
            type        : SocketMessageType.WORKER_READY,
            sender      : 'ANONYMOUS-WKR',
            ts          : Date.now()
        });
        console.log('Socket controller initialized');
    }
    onMessageReceived(socketMessage: SocketMessage) {
        switch (socketMessage.type) {
            case SocketMessageType.PING:
                this.pong(socketMessage);
                break;
            case SocketMessageType.INITIALIZE:
                
                console.log(socketMessage);
                break;
            default:
                break;
        }
    }
    // #endregion

    //#region Singleton Implementation
    private static _instance = new SocketController();
    public static get instance(): SocketController {
        return SocketController._instance;
    }
    //#endregion

    // #region Helper Methods
    validMessageFilter(socketMessage: SocketMessage): boolean {
        return socketMessage !== null  && socketMessage !== undefined;
    }
    pong(socketMessage: SocketMessage) {
        const message = _.merge(socketMessage, { type: SocketMessageType.PONG});
        message.sender = 'DEFAULT';
        MessageBroker.instance.sendToOutBox(message);
    }
    //#endregion
}