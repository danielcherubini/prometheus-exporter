const os = require('os');
const fs = require('fs');
const axios = require('axios');
const path = require('path');
const decompressTargz = require('decompress-targz');

function getFileName(version) {
    let file = '';
    switch (os.type()) {
    case 'Darwin':
        file = `node_exporter-${version.substr(1)}.darwin-amd64.tar.gz`;
        break;
    case 'Linux':
        file = `node_exporter-${version.substr(1)}.linux-amd64.tar.gz`;
        break;
    }
    return file;
}

function downloadFile() {
    console.warn('Downloading Latest node_exporter Release');
    axios.get('https://api.github.com/repos/prometheus/node_exporter/releases/latest')
    .then(releases => {
        const latestTagVersion = releases.data.tag_name;
        const filename = getFileName(latestTagVersion);
        const fileStream = fs.createWriteStream(path.join(__dirname, '/lib/node_exporter'), {mode: 0o744, autoClose: true});
        const axiosConfig = {
            method: 'get',
            url: `https://github.com/prometheus/node_exporter/releases/download/${latestTagVersion}/${filename}`,
            responseType: 'stream'
        };
        axios(axiosConfig)
        .then(release => {
            decompressTargz()(release.data).then(files => {
                for (const file of files) {
                    if (file.path.includes('/node_exporter')) {
                        fileStream.write(file.data);
                        console.warn(`Downloaded Latest Release: ${filename}`);
                    }
                }
            });
        })
        .catch(error => {
            throw error;
        });
    })
    .catch(error => {
        console.error(error);
        throw error;
    });
}

downloadFile();
