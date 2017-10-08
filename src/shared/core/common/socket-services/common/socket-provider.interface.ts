import { SocketMessage } from '../../common-model-utils/index';

/**
 * 
 */
export interface SocketProvider {
    connect(message: SocketMessage);
    subscribe(message: SocketMessage);
    unsubscribe(message: SocketMessage);
    publish(message: SocketMessage);
}