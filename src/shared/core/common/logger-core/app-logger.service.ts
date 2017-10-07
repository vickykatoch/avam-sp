import { LogLevel, ApplicationLogger } from "./app-logger";


export abstract class ApplicationLoggingService {
    abstract getLogger(name: string, level?: LogLevel) : ApplicationLogger;
}