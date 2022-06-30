import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import User from '../database/models/user';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa a função findOne para rota /login', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(User, "findOne")
      .resolves({
        id: 1,
        username: "Admin",
        role: "admin",
        email: "admin@admin.com",
        password: "$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW"
      } as User);
  });

  after(()=>{
    (User.findOne as sinon.SinonStub).restore();
  })

  it('Quando um login existente da db é passado ele deve responder status 200', async () => { 
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({
        email:'admin@admin.com',
        password:'secret_admin'
      });
    
    expect(chaiHttpResponse.status).to.be.equal(200)
  });
    
  it('Quando um login inexistente é passado, ele deve responder status ', async () => { 
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({
        email:'admin@admin.com',
        password:'minhasenhatorta'
      });
    
      expect(chaiHttpResponse.status).to.be.equal(401)
  });
});
