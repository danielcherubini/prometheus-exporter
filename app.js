// @flow
const prometheusExporter = require('./lib');


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
