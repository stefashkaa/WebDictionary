import { trace, ConsoleTraceListener, ConsoleConcatTraceListener, TraceLevel } from './trace';

export const TRACE_LEVEL: TraceLevel = TraceLevel.Debug;
export const JS_CONSOLE_CONCAT = false;

export function initTrace() {
    const consoleListener = JS_CONSOLE_CONCAT ? new ConsoleConcatTraceListener() : new ConsoleTraceListener();
    trace.addListener(consoleListener);
    trace.setLevel(TRACE_LEVEL);
}
