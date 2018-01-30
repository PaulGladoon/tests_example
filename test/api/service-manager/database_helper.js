const ODatabase = require('orientjs');

let db = new ODatabase({
    host:     'Some Host',
    port: 'Some Port',
    pool: {
            "max": 30
    },
    username: '',
    password: '',
    }).use({
        "name":"",
        "username": "",
        "password": ""
});

module.exports = {

    createUser,
    setUserPermission,
    setUserRole,
    createBranvas,
    setBranvasLvl,
    attachBranvasToUser,
    createCompany,
    attachBranvasToCompany,
    attachCompanyToUser,
    attachOptionToBranvas,
    attachNewCodeToBranvas,
    createAccount,
    attachAccountToUser,
    attachAccountToBranvas,
    attachAccountToCompany

};

async function createUser(login, globalId, userId, name) {
    await db.open();
    await db.query(`insert into User set 
                                login='${login}', 
                                globalId='${globalId}', 
                                id=${userId}, 
                                name='${name}'`);
    await db.close();
}

async function setUserRole(globalId, role) {
    await db.open();
    await db.query(`create edge UserRole from 
                                (select from Node where code = '${role}') to 
                                (select from User where externalId='${globalId}')`);
    await db.close();
}

async function setUserPermission(globalId, permission) {
    await db.open();
    await db.query(`create edge UserPermission from 
                                (select from Node where code ${Array.isArray(permission) ? 
                                `in ${JSON.stringify(permission)}` : `= '${permission}'`}) to 
                                (select from User where globalId='${globalId}')`);
    await db.close();
}

async function createBranvas(branvasId, branvasName, branvasStatus) {
    await db.open();
    await db.query(`INSERT INTO Branvas (id, name, status) VALUES 
                                ('${branvasId}', '${branvasName}', '${branvasStatus}')`);
    await db.close();
}

async function setBranvasLvl(branvasLvl, branvasId) {
    await db.open();
    await db.query(`Create edge BranvasLevel from 
                                (select from Level where level = '${branvasLvl}' ) to 
                                (select from Branvas where id = '${branvasId}')`);
    await db.close();
}

async function attachBranvasToUser(userId, branvasId) {
    await db.open();
    await db.query(`Create edge BranvasUser from 
                                (select from User where id = '${userId}') to 
                                (select from Branvas where id = '${branvasId}')`);
    await db.close();
}

async function createCompany(name, globalId, companyId) {
    await db.open();
    await db.query(`INSERT INTO Company (name, globalId, id) VALUES 
                                ('${name}', '${globalId}', '${companyId}')`);
    await db.close();
}

async function attachBranvasToCompany(companyId, branvasId) {
    await db.open();
    await db.query(`Create edge BranvasCompany from 
                                (select from Company where id = '${companyId}') to 
                                (select from Branvas where id = '${branvasId}')`);
    await db.close();
}

async function attachCompanyToUser(companyId, userId) {
    await db.open();
    await db.query(`Create edge UserCompany from 
                                (select from Company where id = '${companyId}') to 
                                (select from User where id = '${userId}')`);
    await db.close();
}

async function attachOptionToBranvas(optionCode, branvasId) {
    await db.open();
    await db.query(`create edge BranvasNode from 
                                (select from Node where code = '${optionCode}' and category = 'operation' ) to 
                                (select from Branvas where id = '${branvasId}')`);
    await db.close();
}

async function attachNewCodeToBranvas(newCode, branvasId) {
    await db.open();
    await db.query(`create edge BranvasNode from 
                                (select from Node where code = '${newCode}' and category = 'application' ) to 
                                (select from Branvas where id = '${branvasId}')`);
    await db.close();
}

async function createAccount(number, globalId, currency, accountId, type) {
    await db.open();
    await db.query(`INSERT INTO Account (number, globalId, currency, id, type) VALUES 
                                ('${number}', '${globalId}', '${currency}', '${accountId}', '${type}')`);
    await db.close();
}

async function attachAccountToUser(accountId, userId) {
    await db.open();
    await db.query(`Create edge UserAccount from 
                                (select from Account where id = '${accountId}') to 
                                (select from User where id = '${userId}')`);
    await db.close();
}

async function attachAccountToBranvas(accountId, branvasId) {
    await db.open();
    await db.query(`Create edge BranvasAccount from 
                                (select from Account where id = '${accountId}') to 
                                (select from Branvas where id = '${branvasId}')`);
    await db.close();
}

async function attachAccountToCompany(accountId, companyId) {
    await db.open();
    await db.query(`Create edge CompanyAccount from 
                                (select from Account where id = '${accountId}') to 
                                (select from Company where id = '${companyId}')`);
    await db.close();
}




