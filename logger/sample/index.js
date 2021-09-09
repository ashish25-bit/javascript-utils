const { logger, Writer, timestamp } = require('..');

const writers = [
  new Writer({
    type: "file",
    messageType: "json",
    fileDestination: "log.json",
  }),

  new Writer({
    type: "console",
    messageType: "json",
  }),
];

function formatter({ timestamp, level, message, meta }) {
  return `time: ${timestamp().toString()}\nlevel: ${level}\nmessage: ${JSON.stringify(message)}\nmeta: ${meta}`;
}

const log = logger({
  color: true,
  level: "debug",
  writers,
  timestamp,
  formatter,
  defaultMeta: "default meta message for log 1",
});

log.warn({ message: { msg: "warn log" }, meta: "this is meta data for log warn" });
log.error({ message: "error log", meta: "error log with meta" });
log.info({ message: "info log1" });
log.http({ message: "http log" });
log.debug({ message: "debug log" });
