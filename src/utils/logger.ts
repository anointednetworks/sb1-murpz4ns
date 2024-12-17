export type LogLevel = 'info' | 'warn' | 'error';

export interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  details?: unknown;
}

export class Logger {
  private static formatLogEntry(entry: LogEntry): void {
    const prefix = `[${entry.timestamp}] ${entry.level.toUpperCase()}:`;
    console[entry.level](prefix, entry.message);
    if (entry.details) {
      console[entry.level]('Details:', entry.details);
    }
  }

  static log(level: LogLevel, message: string, details?: unknown): void {
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      details,
    };
    this.formatLogEntry(entry);
  }

  static info(message: string, details?: unknown): void {
    this.log('info', message, details);
  }

  static warn(message: string, details?: unknown): void {
    this.log('warn', message, details);
  }

  static error(message: string, details?: unknown): void {
    this.log('error', message, details);
  }
}

export default Logger;