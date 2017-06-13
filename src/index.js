// @flow
'use strict';

const path = require('path');
const axios = require('axios');
const spawn = require('child_process').spawn;
const Options = require('./options');

function checkGeoipServiceUp(callback) {
    axios.get('http://localhost:4100', {
        params: {
            ip: '127.0.0.1'
        }
    }).then(() => {
        callback(null);
    }).catch((error) => {
        callback(error);
    });
}

function parseArgs(options: Object): string[] {
    const args = new Options(options);
    return args.args;
}

function init(options: Object, callback: Function) {
    if (!callback) {
        throw new Error('Callback is missing');
    } else if (!options || options === null) {
        callback(new Error('Options is missing'), false);
    } else if (options, callback) {
        //Check if the geo ip service is already up,
        //if it is up it will return
        checkGeoipServiceUp(geoIpServiceDown => {
            if (geoIpServiceDown) {
                const command = path.join(__dirname, 'node_exporter');
                let args = parseArgs(options);
                const ls = spawn(command, args);

                ls.stdout.on('data', function (data) {
                    console.warn('>> prometheus: ' + data.toString());

                    if (data.toString().includes('Listening on')) {
                        callback(null, true);
                    }
                });

                ls.stderr.on('data', function (data) {
                    console.warn('>> prometheus: ' + data.toString());
                    if (data.toString().includes('Listening on')) {
                        callback(null, true);
                    }
                });

                ls.on('exit', function (code) {
                    callback(new Error('prometheus node_exporter exited with code ' + code.toString()), null);
                });

            } else {
                callback(null, true);
            }
        });
    }
}

module.exports.init = init;
module.exports.options = Options;
