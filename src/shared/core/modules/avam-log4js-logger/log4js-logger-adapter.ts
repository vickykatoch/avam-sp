import { ApplicationLogger, LogLevel } from '../../common/logger-core/index';
import { Logger, Level } from "log4javascript";

class LogLevelMapper {
    private levelMap : {[key: string] : Level } = {};

    constructor() {
        Object.keys(Level).map(k => this.levelMap[k.toString()] = Level[k]);
    }
    getLevel(level?: LogLevel) : Level | undefined {
        return level ? this.levelMap[level.toString()] : undefined;
    }
}

export class Log4JsLoggerAdapter implements ApplicationLogger {
    private static LevelMapper = new LogLevelMapper();

    constructor(private log4jsLogger: Logger, private level?: LogLevel) {
       
    }

    log(level: LogLevel, params: any[]): void {
        this.log4jsLogger.log(Log4JsLoggerAdapter.LevelMapper.getLevel(level) ,params);
    }
    trace(...messages: any[]): void {
        this.log4jsLogger.trace(messages);
    }
    debug(...messages: any[]): void {
        this.log4jsLogger.debug(messages);
    }
    info(...messages: any[]): void {
        this.log4jsLogger.info(messages);
    }
    warn(...messages: any[]): void {
        this.log4jsLogger.warn(messages);
    }
    error(...messages: any[]): void {
        this.log4jsLogger.error(messages);
    }
    fatal(...messages: any[]): void {
        this.log4jsLogger.fatal(messages);
    }
    group(name: string, initiallyExpanded?: boolean): void {
        this.log4jsLogger.group(name, initiallyExpanded);
    }
    groupEnd(): void {
        this.log4jsLogger.groupEnd();
    }
    time(name: string, level?: LogLevel): void {
        this.log4jsLogger.time(name,Log4JsLoggerAdapter.LevelMapper.getLevel(level));
    }
    timeEnd(name: string): void {
        this.log4jsLogger.timeEnd(name);
    }
    assert(expr: any): void {
        this.log4jsLogger.assert(expr);
    }
    get name(): string {
        return this.log4jsLogger.name;
    }
}
