export enum SocketMessageType {
    PING,
    PONG,
    INITIALIZE,
    CONNECT,
    DISCONNECT,
    SUBSCRIBE,
    UNSUBSCRIBE,
    PUBLISH,
    SENDLOG
}
export enum ConnectionType {
    AMPS,
    SOCKETIO
}
export interface AmpsConnectionParams {

}
export interface SocketIOConnectionParams {
    
}
export interface SocketMessage {
    type                : SocketMessageType; // Type of message    
    sender              : string; // Message Sender
    ts                  : number; // Sent timestamp
    payload?            : any; // Message payload
}

export interface SocketConnectionInfo {
    type                        : ConnectionType;
    name                        : string;
    connectionParams            : any; // Either AmpsConnectionParams or SocketIOConnectionParams
}