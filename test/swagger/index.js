const SwaggerParser = require('swagger-parser');
const path = require('path');
const fs = require('fs');
const Log = require('log');
const log = new Log('debug', fs.createWriteStream('swagger-errors.log'));

const rootPath = path.join(__dirname, 'services');

const services = fs
    .readdirSync(rootPath)
    .filter(file => fs.statSync(path.join(rootPath, file)).isDirectory());

services.forEach(service => {
    const isSwaggerYAMLExists = fs.existsSync(path.join(rootPath, service, 'swagger.yaml'));

    if (isSwaggerYAMLExists) {
        SwaggerParser
            .validate(path.join(rootPath, service, 'swagger.yaml'))
            .then(function (api) {
                console.log(`\n[SUCCESS] API name: ${api.info.title}, Version: ${api.info.version}`);
            })
            .catch(function (err) {
                log.error('\n', err.message);
            });
    }
});

