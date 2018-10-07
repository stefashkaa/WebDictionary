import * as _ from 'lodash';

export class Trace {
    private level = TraceLevel.Info;
    private sources: _.Dictionary<TraceSource> = {};
    private listeners: TraceListener[] = [];

    public setLevel(level: TraceLevel) {
        if (level === this.level) {
            return;
        }
        this.level = level;
        _.forEach(this.sources, source => source.level = level);
    }

    public get(sourceName: string): TraceSource {
        let source = this.sources[sourceName];
        if (!source) {
            source = new TraceSource(sourceName, this);
            if (source.level == null) {
                source.level = this.level;
            }
            this.sources[sourceName] = source;
        }
        return source;
    }

    public addListener(listener: TraceListener) {
        this.listeners.push(listener);
    }

    public write(level: TraceLevel, args: any[]) {
        _.forEach(this.listeners, listener => listener.traceData(level, args));
    }
}

export class TraceSource {
    private levelInternal: TraceLevel;

    constructor(private name: string,
        private trace: Trace) {
    }

    public get level(): TraceLevel {
        return this.levelInternal;
    }

    public set level(level: TraceLevel) {
        this.levelInternal = level;
    }

    public debug(...args: any[]) {
        this.write(TraceLevel.Debug, args);
    }

    public info(...args: any[]) {
        this.write(TraceLevel.Info, args);
    }

    public warn(...args: any[]) {
        this.write(TraceLevel.Warn, args);
    }

    public error(...args: any[]) {
        this.write(TraceLevel.Error, args);
    }

    private write(level: TraceLevel, args: any[]) {
        if (level >= this.level) {
            const newArgs = _.clone(args);
            newArgs.unshift(`[${this.name}]`);
            this.trace.write(level, newArgs);
        }
    }
}

export enum TraceLevel {
    Debug,
    Info,
    Warn,
    Error,
    Off
}

export abstract class TraceListener {
    public abstract traceData(level: TraceLevel, args: any[]);

    protected getTimestampString(): string {
        return new Date().toISOString();
    }

    protected getLevelPrefix(level: TraceLevel) {
        switch (level) {
            case TraceLevel.Debug:
                return 'D';
            case TraceLevel.Info:
                return 'I';
            case TraceLevel.Warn:
                return 'W';
            case TraceLevel.Error:
                return 'E';
            default:
                return ' ';
        }
    }

    protected stringifyValues(values: any[]) {
        return values.map(item => {
            if (typeof item === 'object') {
                try {
                    const serialized = JSON.stringify(item, (key, value) => {
                        // zero and empty strings are needed!
                        if (value != null) {
                            return value;
                        }
                        // This is to remove properties with 'null' values.
                        return undefined;
                    }, '\t');
                    return serialized;
                } catch (e) {
                    return '';
                }
            } else {
                return String(item);
            }
        });
    }

    protected buildLogString(level: TraceLevel, args: any[]) {
        const stringMessages = this.stringifyValues(args);
        const logLevelString = this.getLevelPrefix(level);
        const timestampString = this.getTimestampString();
        return `${logLevelString} ${timestampString} ${stringMessages.join(' ')}`;
    }
}

export class ConsoleConcatTraceListener extends TraceListener {
    public traceData(level: TraceLevel, args: any[]) {
        const logString = this.buildLogString(level, args);
        console.info(logString); // changed to 'into' since 'console.log' on android does nothing.
    }
}

export class ConsoleTraceListener extends TraceListener {
    public traceData(level: TraceLevel, args: any[]) {
        let handler;
        switch (level) {
            case TraceLevel.Debug:
                handler = console.debug;
                break;
            case TraceLevel.Info:
                handler = console.info;
                break;
            case TraceLevel.Warn:
                handler = console.warn;
                break;
            case TraceLevel.Error:
                handler = console.error;
                break;
        }
        if (!handler) {
            handler = console.log;
        }
        const newArgs = _.clone(args);
        newArgs.unshift(this.getTimestampString());
        Function.prototype.apply.call(handler, console, newArgs);
    }
}

export let trace = new Trace();
