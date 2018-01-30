const environment = require('../environments/config.js');
const requestData = require('../service-data/index.js');
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = require('chai').expect;

chai.use(chaiHttp);

module.exports = {

    createBranvas,
    provideCreate,
    getOperation,
    processConfirm,
    provideAttach

};

async function createBranvas(userGlobalId, level, parentId) {
    const { endpoint, headers } = requestData.createBranvas_data;
    const res = await chai.request(environment.sandbox.url)
        .post(endpoint)
        .set(headers.contentType.key, headers.contentType.value)
        .set(headers.userGlobalId.key, headers.userGlobalId.value)
        .send({ userExternalId: userGlobalId, level, parentId })
        .catch(console.error);

    expect(res).to.have.status(200);
    expect(res).to.be.json;

    return res.body.branvas.id;
}

async function provideCreate(serviceData, startDatetime, endDatetime, provide, type, cycle, period) {
    const { headers, preconditions: { userGlobalId } } = serviceData;
    const res = await chai.request(environment.sandbox.url)
        .post(requestData.provideCreate_data.endpoint)
        .set(headers.contentType.key, headers.contentType.value)
        .set(headers.userGlobalId.key, userGlobalId)
        .send({ startDatetime, endDatetime, provideLi: provide, type, refreshCycle: cycle, lookBackPeriod: period })
        .catch(console.error);

    expect(res).to.have.status(200);
    expect(res).to.be.json;

    return res.body.uuid;
}

async function getOperation(serviceData) {
    const { headers, preconditions: { userGlobalId, provideId } } = serviceData;
    const res = await chai.request(environment.sandbox.url)
        .get(requestData.getOperation_data.endpoint + '?' + 'userGlobalId=' + userGlobalId + '&size=1000')
        .set(headers.contentType.key, headers.contentType.value)
        .set(headers.userGlobalId.key, userGlobalId)
        .catch(console.error);

    expect(res).to.have.status(200);
    expect(res).to.be.json;

    const searchResult = res.body.find((item) => item.payload.uuid === provideId);

    return searchResult.uuid;
}

async function processConfirm(serviceData, eventId) {
    const { headers, preconditions: { userGlobalId, processStatus: status } } = serviceData;
    const res = await chai.request(environment.sandbox.url)
        .post(requestData.processConfirm_data.endpoint)
        .set(headers.contentType.key, headers.contentType.value)
        .set(headers.userGlobalId.key, userGlobalId)
        .send({ eventId, status })
        .catch(console.error);

    expect(res).to.have.status(200);
    expect(res).to.be.json;
    expect(res.body.result).to.equal('approved');
}

async function provideAttach(serviceData, branvasId) {
    const { headers, preconditions: { userGlobalId, provideId } } = serviceData;
    const res = await chai.request(environment.sandbox.url)
        .post(requestData.provideAttach_data.endpoint)
        .set(headers.contentType.key, headers.contentType.value)
        .set(headers.userGlobalId.key, userGlobalId)
        .send({ provideId, branvasId: branvasId })
        .catch(console.error);

    expect(res).to.have.status(200);
    expect(res).to.be.json;
}




