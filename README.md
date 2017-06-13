# prometheus-exporter [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]
> Library to run the official prometheus node_exporter as a child process

## About

This package will run the official node_exporter for prometheus as a child_process.

It's functional right now, but will add promises later.

For more information check out https://github.com/prometheus/node_exporter

## Installation

```sh
$ npm install --save prometheus-exporter
```

## Usage

```js
const prometheusExporter = require('prometheus-exporter');

const options = {
    collector: {
        filesystem: {
            'ignored-fs-types': '^devfs$'
        }
    },
    log: {
        format: 'logger:stdout?json=true'
    }
};

prometheusExporter.init(options, function(error, success) {
    if (error) {
        throw error;
    } else {
        console.log('success');
    }
});
```

## Options

## License

Apache-2.0 © [Daniel Cherubini](https://cherubini.casa)


[npm-image]: https://badge.fury.io/js/prometheus-exporter.svg
[npm-url]: https://npmjs.org/package/prometheus-exporter
[travis-image]: https://travis-ci.org/danmademe/prometheus-exporter.svg?branch=master
[travis-url]: https://travis-ci.org/danmademe/prometheus-exporter
[daviddm-image]: https://david-dm.org/danmademe/prometheus-exporter.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/danmademe/prometheus-exporter
[coveralls-image]: https://coveralls.io/repos/danmademe/prometheus-exporter/badge.svg
[coveralls-url]: https://coveralls.io/r/danmademe/prometheus-exporter
