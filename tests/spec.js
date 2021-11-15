const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
const { setupServer } = require("../src/server");
chai.should();

const server = setupServer();