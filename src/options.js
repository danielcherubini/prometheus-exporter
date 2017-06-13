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

class CollectorOptions {
    filesystem: {'ignored-fs-types': string, 'ignored-mount-points': string};
    megacli: {command: string};
    netdev: {'ignored-devices': string};
    ntp: {'protocol-version': number, server: string};
    procfs: string;
    runit: {servicedir: string};
    supervisord: {url: string};
    sysfs: string;
    textfile: {directory: string};
    args: string[];
    constructor(object) {
        this.args = [];
        this.filesystem = {};
        this.megacli = {};
        this.netdev = {};
        this.ntp = {};
        this.runit = {};
        this.supervisord = {};
        this.textfile = {};
        if (object.filesystem) {
            if (object.filesystem['ignored-fs-types']) {
                this.filesystem['ignored-fs-types'] = object.filesystem['ignored-fs-types'];
                this.addArgs('collector.filesystem.ignored-fs-types', object.filesystem['ignored-fs-types']);
            }
            if (object.filesystem['ignored-mount-points']) {
                this.filesystem['ignored-mount-points'] = object.filesystem['ignored-mount-points'];
                this.addArgs('collector.filesystem.ignored-mount-points', object.filesystem['ignored-mount-points']);
            }
        }
        if (object.megacli) {
            if (object.megacli.command) {
                this.megacli.command = object.megacli.command;
                this.addArgs('collector.megacli.command', object.megacli.command);
            }
        }
        if (object.netdev) {
            if (object.netdev['ignored-devices']) {
                this.netdev['ignored-devices'] = object.netdev['ignored-devices'];
                this.addArgs('collector.netdev.ignored-devices', object.netdev['ignored-devices']);
            }
        }
        if (object.ntp) {
            if (object.ntp['protocol-version']) {
                this.ntp['protocol-version'] = object.ntp['protocol-version'];
                this.addArgs('collector.ntp.protocol-version', object.ntp['protocol-version']);
            }
            if (object.ntp.server) {
                this.ntp.server = object.ntp.server;
                this.addArgs('collector.ntp.server', object.ntp.server);
            }
        }
        if (object.procfs) {
            this.procfs = object.procfs;
            this.addArgs('collector.procfs', object.procfs);
        }
        if (object.runit) {
            if (object.runit.servicedir) {
                this.runit.servicedir = object.runit.servicedir;
                this.addArgs('collector.runit.servicedir', object.runit.servicedir);
            }
        }
        if (object.supervisord) {
            if (object.supervisord.url) {
                this.supervisord.url = object.supervisord.url;
                this.addArgs('collector.supervisord.url', object.supervisord.url);
            }
        }
        if (object.sysfs) {
            this.sysfs = object.sysfs;
            this.addArgs('collector.sysfs', object.sysfs);
        }
        if (object.textfile) {
            if (object.textfile.directory) {
                this.textfile.directory = object.textfile.directory;
                this.addArgs('collector.textfile.directory', object.textfile.directory);
            }
        }
    }
    addArgs(arg: string, value: string) {
        this.args.push(`--${arg}=${value}`);
    }
}

class Options {
    collector: CollectorOptions;
    collectors: {enabled: string, print: boolean};
    log: {format: string, level: string};
    web: {'listen-address': string, 'telemetry-path': string};
    args: string[];
    constructor(object: Object = {}) {
        this.args = [];
        this.log = {};
        this.web = {};
        this.collectors =  {};
        if (object.collector) {
            this.collector = new CollectorOptions(object.collector);
            for (var arg of this.collector.args) {
                this.args.push(arg);
            }
        }
        if (object.collectors) {
            if (object.collectors.enabled) {
                this.collectors.enabled = object.collectors.enabled;
                this.addArgs('collectors.enabled', object.collectors.enabled);
            }
            if (object.collectors.print) {
                this.collectors.print = object.collectors.print;
                this.addArgs('collectors.print', object.collectors.print);
            }
        }
        if (object.log) {
            if (object.log.format) {
                this.log.format = object.log.format;
                this.addArgs('log.format', object.log.format);
            }
            if (object.log.level) {
                this.log.level = object.log.level;
                this.addArgs('log.level', object.log.format);
            }
        }
        if (object.web) {
            if (object.web['listen-address']) {
                this.web['listen-address'] = object.web['listen-address'];
                this.addArgs('web.listen-address', object.web['listen-address']);
            }
            if (object.web['telemetry-path']) {
                this.web['telemetry-path'] = object.web['telemetry-path'];
                this.addArgs('web.telemetry-path', object.web['telemetry-path']);
            }
        }
    }
    addArgs(arg: string, value: string) {
        this.args.push(`--${arg}=${value}`);
    }
}

module.exports = Options;
