// @flow
const prometheusExporter = require('./src');


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
