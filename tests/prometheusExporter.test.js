const test = require('ava');
const prometheusExporter = require('../lib');

test('is a function', t => {
    t.is(typeof prometheusExporter.init, 'function')
})

test.cb('function inits', t => {
    prometheusExporter.init({}, (error, success) => {
        if (error) {
            t.fail(error);
        } else {
            t.pass();
        }
        t.end();
    });

})
