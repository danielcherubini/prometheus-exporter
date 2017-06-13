// @flow

// -collector.filesystem.ignored-fs-types string
//   	Regexp of filesystem types to ignore for filesystem collector. (default "^devfs$")
// -collector.filesystem.ignored-mount-points string
//   	Regexp of mount points to ignore for filesystem collector. (default "^/(dev)($|/)")
// -collector.megacli.command string
//   	Command to run megacli. (default "megacli")
// -collector.netdev.ignored-devices string
//   	Regexp of net devices to ignore for netdev collector. (default "^$")
// -collector.ntp.protocol-version int
//   	NTP protocol version (default 4)
// -collector.ntp.server string
//   	NTP server to use for ntp collector.
// -collector.procfs string
//   	procfs mountpoint. (default "/proc")
// -collector.runit.servicedir string
//   	Path to runit service directory. (default "/etc/service")
// -collector.supervisord.url string
//   	XML RPC endpoint (default "http://localhost:9001/RPC2")
// -collector.sysfs string
//   	sysfs mountpoint. (default "/sys")
// -collector.textfile.directory string
//   	Directory to read text files with metrics from.
// -collectors.enabled string
//   	Comma-separated list of collectors to use. (default "cpu,filesystem,loadavg,meminfo,netdev,textfile,time")
// -collectors.print
//   	If true, print available collectors and exit.
// -log.format value
//   	Set the log target and format. Example: "logger:syslog?appname=bob&local=7" or "logger:stdout?json=true" (default "logger:stderr")
// -log.level value
//   	Only log messages with the given severity or above. Valid levels: [debug, info, warn, error, fatal] (default "info")
// -version
//   	Print version information.
// -web.listen-address string
//   	Address on which to expose metrics and web interface. (default ":9100")
// -web.telemetry-path string
//   	Path under which to expose metrics. (default "/metrics")

class FileSystemOptions {
    'ignored-fs-types': string;
    'ignored-mount-points': string;
    constructor(types: string, points: string) {
        if (types) {
            this['ignored-fs-types'] = types;
        }
        if (points) {
            this['ignored-mount-points'] = points;
        }
    }
}

class CollectorOptions {
    megacli: {command:string};
    netdev: {'ignored-devices': string};
    ntp: {'protocol-version': number, server: string};
    procfs: string;
    runit: {servicedir: string};
    supervisord: {url: string};
    sysfs: string;
    textfile: {directory: string};
    constructor(object) {
        if (object.megacli) {
            this.megacli.command = object.megacli.command;
        }
        if (object.netdev) {
            this.netdev['ignored-devices'] = object.netdev['ignored-devices'];
        }
        if (object.ntp) {
            this.ntp['protocol-version'] = object.ntp['protocol-version'];
            this.ntp.server = object.ntp.server;
        }
        if (object.procfs) {
            this.procfs = object.procfs;
        }
        if (object.runit) {
            this.runit.servicedir = object.runit.servicedir;
        }
        if (object.supervisord) {
            this.supervisord.url = object.supervisord.url;
        }
        if (object.sysfs) {
            this.sysfs = object.sysfs;
        }
        if (object.textfile) {
            this.textfile.directory = object.textfile.directory;
        }
    }
}

class Options {
    collector: CollectorOptions;
    collectors: {enabled: string, print: boolean};
    log: {format: string, level: string};
    web: {'listen-address': string, 'telemetry-path': string;};
    constructor(object: Object = {}) {
        if (object.collector) {
            this.collector = new CollectorOptions(object.collector);
        }
        if (object.collectors) {
            this.collectors.enabled = object.collectors.enabled;
            this.collectors.print = object.collectors.print;
        }
        if (object.log) {
            this.log.format = object.log.format;
            this.log.level = object.log.level;
        }
        if (object.web) {
            this.web['listen-address'] = object.web['listen-address']
            this.web['telemetry-path'] = object.web['telemetry-path']
        }
    }
}

module.exports = Options;
