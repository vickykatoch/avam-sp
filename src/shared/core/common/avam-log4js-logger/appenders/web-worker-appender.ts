// import { Appender, LoggingEvent, Layout, Level, JsonLayout } from "log4javascript";
// import { InterAppMessage } from "../logger-core/inter-app.message";

// interface WebWorkerAppenderOptions {
//     timed: boolean,
//     timerInterval: number,
//     batchSize: number,
//     sendAllOnUnload: boolean,
// }
// export class WebWorkerAppender extends Appender {
//     private _layout: Layout = new JsonLayout(false, true);
//     private _level = Level.ALL;
//     private _options: WebWorkerAppenderOptions;
//     private initialized = false;
//     private queuedLoggingEvents: LoggingEvent[] = [];
//     private queuedRequests: LoggingEvent[][] = [];
//     private _sessionId: string;
//     private sending = false;
//     private _isWorkerInitialized = false;
//     private worker : SharedWorker.SharedWorker;

//     constructor(timed: boolean, wokerFileName: string, appName : string, batchSize?: number, timerInterval?: number) {
//         super();
//         this._options = this.getDefaults();
//         this._options.timed = timed;
//         this._options.batchSize = batchSize ? batchSize : this._options.batchSize;
//         this._options.timerInterval = timerInterval ? timerInterval : this._options.timerInterval;
//         this.init();
//         this.initWorker(wokerFileName,appName);
//     }

// 	/**
// 	 * Appender-specific method to append a log message. Every appender object should implement this method.
// 	 */
//     append(loggingEvent: LoggingEvent): void {
//         this.queuedLoggingEvents.push(loggingEvent);
//         const actualBatchSize = this.getLayout().allowBatching() ? this._options.batchSize : 1;

//         if (this.queuedLoggingEvents.length >= actualBatchSize) {
//             const batchedLoggingEvents = [];
//             let currentLoggingEvent
//             while (currentLoggingEvent = this.queuedLoggingEvents.shift()) {
//                 batchedLoggingEvents.push(currentLoggingEvent);
//             }
//             this.queuedRequests.push(batchedLoggingEvents);
//             if (!this._options.timed && !this.sending) {
//                 this.sendAll();
//             }
//         }
//     }

// 	/**
// 	 * Sets the appender's layout.
// 	 */
//     setLayout(layout: Layout): void {
//         this._layout = layout;
//     }

// 	/**
// 	 * Returns the appender's layout.
// 	 */
//     getLayout(): Layout {
//         return this._layout;
//     }

// 	/**
// 	 * Sets the appender's threshold. Log messages of level less severe than this threshold will not be logged.
// 	 */
//     setThreshold(level: Level): void {
//         this._level = level;
//     }

// 	/**
// 	 * Returns the appender's threshold.
// 	 */
//     getThreshold(): Level {
//         return this._level;
//     }

// 	/**
// 	 * Returns a string representation of the appender. Every appender object should implement this method.
// 	 */
//     toString(): string {
//         return "WebWorkerAppender";
//     }

//     sendAllRemaining(): void {
//         let currentLoggingEvent;
//         let batchedLoggingEvents = [];
//         while ((currentLoggingEvent = this.queuedLoggingEvents.shift())) {
//             batchedLoggingEvents.push(batchedLoggingEvents);
//         }
//         if (batchedLoggingEvents.length > 0) {
//             this.queuedRequests.push(batchedLoggingEvents);
//         }
//         this.sendAll();
//     }

//     get isTimed(): boolean {
//         return this._options.timed;
//     }
//     set timed(value: boolean) {
//         this._options.timed = value;
//     }
//     get batchSize(): number {
//         return this._options.batchSize;
//     }
//     set batchSize(value: number) {
//         this._options.batchSize = value;
//     }
//     get timerInterval(): number {
//         return this._options.timerInterval;
//     }
//     set timerInterval(value: number) {
//         this._options.timerInterval = value;
//     }
//     get sessionId(): string { return this._sessionId; };
//     set sessionId(sessionId: string) {
//         this._sessionId = sessionId;
//         this._layout.setCustomField("sessionid", sessionId);
//     }
//     private initWorker(workerFileName : string, appName : string) : void {
//         this.worker = new SharedWorker(workerFileName,appName);
//         this.worker.port.start();
//         this.worker.port.addEventListener('message', this.onWorkerMessage.bind(this));
//     }
//     private init() {
//         this.initialized = true;
//         // Add unload event to send outstanding messages
//         if (this._options.sendAllOnUnload && window) {
//             const oldBeforeUnload = window.onbeforeunload;
//             window.onbeforeunload = () => {
//                 // TODO: Investigate this
//                 // if (oldBeforeUnload) {
//                 //     oldBeforeUnload();
//                 // }
//                 this.sendAllRemaining();
//             };
//         }
//         // Start timer
//         if (this._options.timed) {
//             this.scheduleSending();
//         }
//     }
//     private scheduleSending(): void {
//         const waitHandle = setTimeout(() => {
//             clearTimeout(waitHandle);
//             this.sendAll();
//         }, this._options.timerInterval);
//     }
//     private sendAll() {
//         this.sending = true;
//         // Rattle off all the requests without waiting to see the response
//         let currentRequestBatch;
//         while (currentRequestBatch = this.queuedRequests.shift()) {
//             this.send(currentRequestBatch);
//         }
//         if (this._options.timed) {
//             this.scheduleSending();
//         }
//         this.sending = false;
//     }
//     private send(logEvents: LoggingEvent[]) {
//         const formattedMessages = [];
//         let currentLoggingEvent;
//         while (currentLoggingEvent = logEvents.shift()) {
//             formattedMessages.push(this.getLayout().formatWithException(currentLoggingEvent));
//         }
//         this.worker.port.postMessage({type : 'LOG_EVENT', payload : formattedMessages});
//     }

//     private getDefaults(): WebWorkerAppenderOptions {
//         return <WebWorkerAppenderOptions>{
//             timed: true,
//             timerInterval: 1000,
//             batchSize: 1,
//             sendAllOnUnload: true,
//         };
//     }
//     private onWorkerMessage(message: MessageEvent) : void {
//         const msg = <InterAppMessage>message.data;
//         switch(msg.type) {
//             case 'CONNECTED' :
//                 this._isWorkerInitialized = true;
//                 break
//             default:
//                 console.log(msg);
//         }
//         console.log(message);
//     }
// }