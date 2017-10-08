import { SocketMessage } from "../models/socket-models";
import { Subject } from "rxjs/Subject";


export class MessageBroker {
    private inBoxNotifier = new Subject<SocketMessage>();
    inBox$ = this.inBoxNotifier.asObservable();
    private outBoxNotifier = new Subject<SocketMessage>();
    outBox$ = this.outBoxNotifier.asObservable();
    private static _instance = new MessageBroker();
    

    constructor() {
        if (MessageBroker._instance) {
            throw new Error("Error: Instantiation failed: Use MessageBroker.instance instead of new.");
        }
        MessageBroker._instance = this;
    }

    init() {

    }
    
    sendToInbox(message: SocketMessage) {
        this.inBoxNotifier.next(message);
    }
    sendToOutBox(message: SocketMessage) {
        this.outBoxNotifier.next(message);
    }

    //#region Singleton Implementation
    
    public static get instance(): MessageBroker {
        return MessageBroker._instance;
    }
    //#endregion
} 

// export class MessageBroker {
//     constructor() {

//     }
//     getTrue() : boolean {
//         return true;
//     }
// }