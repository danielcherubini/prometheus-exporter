// @flow
const prometheusExporter = require('./lib');


const options = {

};

prometheusExporter.init(options, function(error, success) {
    console.log(error, success);
    if (error) {
        throw error;
    } else {
        console.log('success');
    }

});
