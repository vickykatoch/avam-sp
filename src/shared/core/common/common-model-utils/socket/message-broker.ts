import { SocketMessage } from "./socket-models";
import { Subject } from "rxjs/Subject";


export class MessageBroker {
    private inBoxNotifier = new Subject<SocketMessage>();
    inBox$ = this.inBoxNotifier.asObservable();
    private outBoxNotifier = new Subject<SocketMessage>();
    outBox$ = this.outBoxNotifier.asObservable();
    

    constructor() {
        if (MessageBroker._instance) {
            throw new Error("Error: Instantiation failed: Use MessageBroker.getInstance() instead of new.");
        }
        MessageBroker._instance = this;
    }
    
    sendToInbox(message: SocketMessage) {
        this.inBoxNotifier.next(message);
    }
    sendToOutBox(message: SocketMessage) {
        this.outBoxNotifier.next(message);
    }

    //#region Singleton Implementation
    private static _instance = new MessageBroker();
    public static getInstance(): MessageBroker {
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