# Description
This repository contains an example of auto-tests API and e2e. Any coincidence with real projects and organizations is random.

# Used Technologies:
ChaiJS; Chai-httpJS; EmailJS; LogJS; MochaJS; MochawesomeJS; MomentJS; OrientJS; ProtractorJS; Swagger-parserJS.

# How to run tests:
How to run Mocha API test:

If you need to run all tests:
`npm run test-all-services`
(This command also generates the report)

If you need to run the test of the specific service:
mocha test/api/service/<here name of the service>
example:
`mocha test/api/service/some_service.js --exit`

If you need to run the test of the specific service and generate the report:
example:
`mocha test/api/service/some_service.js --reporter mocha-simple-html-reporter --reporter-options output=service_report.html --exit`

If you need to send a full report:
`npm run send-report`

If you need to run swagger test:
`npm run test-swagger`

How to run e2e test:
`protractor conf.js`
