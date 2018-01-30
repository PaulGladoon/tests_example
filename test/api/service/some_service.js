const environment = require('../environments/config.js');
const getServiceData = require('../service-data/someService_data.js');
const dbHelper = require('../service-manager/database_helper.js');
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = require('chai').expect;

chai.use(chaiHttp);

describe('Some service, story [1]',() => {

    const serviceData = getServiceData();

    before(async function () {
        this.timeout(50000);
        const {
            preconditions: {
                userLogin,
                userGlobalId,
                userId,
                userName,
                userRole,
                userPermission,
                branvasUserId,
                branvasUserName,
                branvasStatus,
                branvasUserLvl,
                accountNumber,
                accountGlobalId,
                accountCurrency,
                accountId,
                accountType,
                companyName,
                companyGlobalId,
                companyId,
                branvasCompanyId,
                branvasCompanyName,
                branvasCompanyLvl,
                optionCode,
                newCode,
                additionalUserInfo
            }
        } = serviceData;

        await dbHelper.createUser(userLogin, userGlobalId, userId, userName);
        await dbHelper.setUserRole(userGlobalId, userRole);
        await dbHelper.setUserPermission(userGlobalId, userPermission);

        // Create additional user
        await dbHelper.createUser(userLogin + additionalUserInfo,
                                  userGlobalId + additionalUserInfo,
                                  userId + additionalUserInfo,
                                  userName + additionalUserInfo);

        await dbHelper.setUserRole(userGlobalId + additionalUserInfo, userRole);
        await dbHelper.setUserPermission(userGlobalId + additionalUserInfo, userPermission);

        await dbHelper.createBranvas(branvasUserId, branvasUserName, branvasStatus);
        await dbHelper.setBranvasLvl(branvasUserLvl, branvasUserId);
        await dbHelper.attachBranvasToUser(userId, branvasUserId);
        await dbHelper.attachOptionToBranvas(optionCode, branvasUserId);
        await dbHelper.attachNewCodeToBranvas(newCode, branvasUserId);

        await dbHelper.createAccount(accountNumber,
                                     accountGlobalId,
                                     accountCurrency,
                                     accountId,
                                     accountType);

        await dbHelper.createCompany(companyName, companyGlobalId, companyId);

        await dbHelper.createBranvas(branvasCompanyId, branvasCompanyName, branvasStatus);
        await dbHelper.setBranvasLvl(branvasCompanyLvl, branvasCompanyId);
        await dbHelper.attachBranvasToCompany(companyId, branvasCompanyId);
        await dbHelper.attachOptionToBranvas(optionCode, branvasCompanyId);
        await dbHelper.attachNewCodeToBranvas(newCode, branvasCompanyId);

        await dbHelper.attachCompanyToUser(companyId, userId);

        await dbHelper.attachAccountToBranvas(accountId, branvasUserId);
        await dbHelper.attachAccountToCompany(accountId, companyId);

    });

    it('Service is available', async () => {
        const {endpoint, headers} = getServiceData();

        const res = await chai.request(environment.sandbox.url)
            .get(endpoint + '/status')
            .set(headers.contentType.key, headers.contentType.value)
            .catch(console.error);

        expect(res).to.have.status(200);
        expect(res).to.be.html;
        expect(res.text).to.equal('OK');

    });

    it('Positive CASE #1', async () => {
        const {endpoint, headers, preconditions: { userGlobalId,
                                                   userName,
                                                   userLogin,
                                                   companyGlobalId,
                                                   companyName,
                                                   accountGlobalId,
                                                   accountNumber,
                                                   accountType,
                                                   accountCurrency } } = serviceData;

        const res = await chai.request(environment.sandbox.url)
            .post(endpoint)
            .set(headers.contentType.key, headers.contentType.value)
            .set(headers.userGlobalId.key, userGlobalId)
            .send({ userExternalId: userGlobalId })
            .catch(console.error);

        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body.user.externalId).to.equal(userGlobalId);
        expect(res.body.user.name).to.equal(userName);
        expect(res.body.user.login).to.equal(userLogin);
        expect(res.body.company.externalId).to.equal(companyGlobalId);
        expect(res.body.company.name).to.equal(companyName);
        expect(res.body.accounts).not.empty;
        expect(res.body.accounts[0].externalId).to.equal(accountGlobalId);
        expect(res.body.accounts[0].number).to.equal(accountNumber);
        expect(res.body.accounts[0].type).to.equal(accountType);
        expect(res.body.accounts[0].userGlobalId).exist;
        expect(res.body.accounts[0].companyGlobalId).to.equal(companyGlobalId);
        expect(res.body.accounts[0].currency).to.equal(accountCurrency);

    });

    it('Positive CASE #2', async () => {
        const {endpoint, headers, preconditions: { userGlobalId,
                                                   userName,
                                                   userLogin,
                                                   companyGlobalId,
                                                   companyName,
                                                   accountGlobalId,
                                                   accountNumber,
                                                   accountType,
                                                   accountCurrency,
                                                   optionCode } } = serviceData;

        const res = await chai.request(environment.sandbox.url)
            .post(endpoint)
            .set(headers.contentType.key, headers.contentType.value)
            .set(headers.userGlobalId.key, userGlobalId)
            .send({ userExternalId: userGlobalId, operationCode: optionCode })
            .catch(console.error);

        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body.user.externalId).to.equal(userGlobalId);
        expect(res.body.user.name).to.equal(userName);
        expect(res.body.user.login).to.equal(userLogin);
        expect(res.body.company.externalId).to.equal(companyGlobalId);
        expect(res.body.company.name).to.equal(companyName);
        expect(res.body.accounts).not.empty;
        expect(res.body.accounts[0].externalId).to.equal(accountGlobalId);
        expect(res.body.accounts[0].number).to.equal(accountNumber);
        expect(res.body.accounts[0].type).to.equal(accountType);
        expect(res.body.accounts[0].userGlobalId).exist;
        expect(res.body.accounts[0].companyGlobalId).to.equal(companyGlobalId);
        expect(res.body.accounts[0].currency).to.equal(accountCurrency);

    });

    it('Positive CASE #3', async () => {
        const {endpoint, headers, preconditions: { userGlobalId,
                                                   userName,
                                                   userLogin,
                                                   companyGlobalId,
                                                   companyName,
                                                   accountGlobalId,
                                                   accountNumber,
                                                   accountType,
                                                   accountCurrency,
                                                   newCode } } = serviceData;

        const res = await chai.request(environment.sandbox.url)
            .post(endpoint)
            .set(headers.contentType.key, headers.contentType.value)
            .set(headers.userGlobalId.key, userGlobalId)
            .send({ userExternalId: userGlobalId, applicationCode: newCode })
            .catch(console.error);

        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body.user.externalId).to.equal(userGlobalId);
        expect(res.body.user.name).to.equal(userName);
        expect(res.body.user.login).to.equal(userLogin);
        expect(res.body.company.externalId).to.equal(companyGlobalId);
        expect(res.body.company.name).to.equal(companyName);
        expect(res.body.accounts).not.empty;
        expect(res.body.accounts[0].externalId).to.equal(accountGlobalId);
        expect(res.body.accounts[0].number).to.equal(accountNumber);
        expect(res.body.accounts[0].type).to.equal(accountType);
        expect(res.body.accounts[0].userGlobalId).exist;
        expect(res.body.accounts[0].companyGlobalId).to.equal(companyGlobalId);
        expect(res.body.accounts[0].currency).to.equal(accountCurrency);

    });

    it('Negative CASE #1', async () => {
        const {endpoint, headers, preconditions: { userGlobalId },
                                           body: { invalidUserGlobalId }} = serviceData;

        const res = await chai.request(environment.sandbox.url)
            .post(endpoint)
            .set(headers.contentType.key, headers.contentType.value)
            .set(headers.userGlobalId.key, userGlobalId)
            .send({ userGlobalId: invalidUserGlobalId })
            .catch(console.error);

        expect(res).to.have.status(400);
        expect(res).to.be.json;
        expect(res.body.message).to.equal('User was not found. Please provide valid user id in your request. Action Failed!');
        expect(res.body.details).empty;
        expect(res.body.code).to.equal(400);

    });

    it('Negative CASE #2', async () => {
        const {endpoint, headers, preconditions: { userGlobalId, additionalUserInfo } } = serviceData;

        const res = await chai.request(environment.sandbox.url)
            .post(endpoint)
            .set(headers.contentType.key, headers.contentType.value)
            .set(headers.userGlobalId.key, userGlobalId)
            .send({ userGlobalId: userGlobalId + additionalUserInfo })
            .catch(console.error);

        expect(res).to.have.status(400);
        expect(res).to.be.json;
        expect(res.body.message).to.equal('No userGlobalId found for this user. Action failed!');
        expect(res.body.details).empty;
        expect(res.body.code).to.equal(400);

    });

    it('Negative CASE #3', async () => {
        const {endpoint, headers, preconditions: { userGlobalId,
                                                   userName,
                                                   userLogin,
                                                   companyGlobalId,
                                                   companyName } } = serviceData;

        const res = await chai.request(environment.sandbox.url)
            .post(endpoint)
            .set(headers.contentType.key, headers.contentType.value)
            .set(headers.userGlobalId.key, userGlobalId)
            .send({ userExternalId: userGlobalId, optionCode: 'invalid' })
            .catch(console.error);

        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body.user.externalId).to.equal(userGlobalId);
        expect(res.body.user.name).to.equal(userName);
        expect(res.body.user.login).to.equal(userLogin);
        expect(res.body.company.externalId).to.equal(companyGlobalId);
        expect(res.body.company.name).to.equal(companyName);
        expect(res.body.accounts).empty;

    });

    it('Negative CASE #4', async () => {
        const {endpoint, headers, preconditions: { userGlobalId,
            userName,
            userLogin,
            companyGlobalId,
            companyName } } = serviceData;

        const res = await chai.request(environment.sandbox.url)
            .post(endpoint)
            .set(headers.contentType.key, headers.contentType.value)
            .set(headers.userGlobalId.key, userGlobalId)
            .send({ userExternalId: userGlobalId, newCode: 'invalid' })
            .catch(console.error);

        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body.user.externalId).to.equal(userGlobalId);
        expect(res.body.user.name).to.equal(userName);
        expect(res.body.user.login).to.equal(userLogin);
        expect(res.body.company.externalId).to.equal(companyGlobalId);
        expect(res.body.company.name).to.equal(companyName);
        expect(res.body.accounts).empty;

    });

});