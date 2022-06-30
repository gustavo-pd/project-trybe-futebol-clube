import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import Team from '../database/models/team';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa a função findAll para rota /teams', () => {
  let chaiHttpResponse: Response;

  const arrayTeams = [{ id: 1, teamName: 'Avaí/Kindermann' },
  { id: 2, teamName: 'Bahia' },
  { id: 3, teamName: 'Botafogo' },
  { id: 4, teamName: 'Corinthians' },
  { id: 5, teamName: 'Cruzeiro' },
  { id: 6, teamName: 'Ferroviária' }];

  before(async () => {
    sinon
      .stub(Team, "findAll")
      .resolves(arrayTeams as Team[]);
  });

  after(()=>{
    (Team.findAll as sinon.SinonStub).restore();
  })

  it('Procura todos os times do banco', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/teams');

    const array = chaiHttpResponse.body;

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(array.length).to.be.equal(6);
    expect(array).to.deep.equal(arrayTeams);
  });
});

describe('Testa a função findOne para rota /teams', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(Team, "findByPk")
      .resolves({ id: 1, teamName: 'Avaí/Kindermann' } as Team);
  });

  after(()=>{
    (Team.findByPk as sinon.SinonStub).restore();
  })

  it('Testa se retorna corretamente os times passados', async () => {
    chaiHttpResponse = await chai
    .request(app)
    .get('/teams');
    
    expect(chaiHttpResponse.status).to.equal(200);
    expect(chaiHttpResponse.body[0]).to.have.property('id');
    expect(chaiHttpResponse.body[0]).to.have.property('teamName');
    expect(chaiHttpResponse.body[0].id).to.equal(1);
    expect(chaiHttpResponse.body[0].teamName).to.equal('Avaí/Kindermann');
  }); 
});
