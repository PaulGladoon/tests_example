const role = require('./codes/role_data.js');
const permission = require('./codes/permission_data.js');
const branvasLvl = require('./codes/branvasLvl_data.js');
const moment = require('moment');
const preconditions_helper = require('../service-manager/precondition_helper.js');

module.exports = function() {

    return {
        endpoint: '/someEndpoint', // mandatory
        preconditions: {
            userLogin: 'at-login' + Date.now(),
            userGlobalId: 'at-ex-id' + Date.now(),
            userId: Date.now(),
            userName: 'at-name' + Date.now(),
            userRole: role.ASYS,
            userPermission: [permission.TNEPA, permission.TNEM, permission.TNEG],
            branvasUserId: 'at-branvas-id' + Date.now(),
            branvasUserName: 'at-branvas-name' + Date.now(),
            branvasUserLvl: branvasLvl.RSU,
            branvasStatus: 'active',
            accountNumber: 'at-account-num' + Date.now(),
            accountGlobalId: 'at-account-exId' + Date.now(),
            accountCurrency: 'CAD',
            accountId: 'at-account-id' + Date.now(),
            accountType: 'BOP',
            companyName: 'at-company-name' + Date.now(),
            companyGlobalId: 'at-company-exId' + Date.now(),
            companyId: 'at-company-id' + Date.now(),
            branvasCompanyId: 'at-branvas-cmp-id' + Date.now(),
            branvasCompanyName: 'at-branvas-cmp-name' + Date.now(),
            branvasCompanyLvl: branvasLvl.PMC,
            optionCode: ['Transfer'],
            newCode: ['Business'],
            additionalUserInfo: preconditions_helper.randomInteger(1, 1000)
        },
        headers: {
            contentType: {
                key: 'Content-Type', // mandatory
                value: 'application/json' // mandatory
            },
            userGlobalId: {
                key: 'userGlobalId', // mandatory
                value: '' // mandatory
            }
        },
        body: {
            invalidUserGlobalId: '430022'
        }

    }
};