import lambdaTester from 'lambda-tester';
import { expect } from 'chai';
import { findOne, find, create, update, deleteOne } from '../app/handler';
import * as competitorsMock from './competitors.mock';
import { competitors as CompetitorsModel } from '../app/model/competitors';
import sinon from 'sinon';

describe('FindOne [GET]', () => {
  it('success', () => {
    try {
      const s = sinon
        .mock(CompetitorsModel);

      s.expects('findOne')
        .atLeast(1)
        .atMost(3)
        .resolves(competitorsMock.findOne);

      return lambdaTester(findOne)
      .event({ pathParameters: { id: 25768396 } })
      .expectResult((result: any) => {
        expect(result.statusCode).to.equal(200);
        const body = JSON.parse(result.body);
        expect(body.code).to.equal(0);
        s.verify();
        s.restore();
      });
    } catch (err) {
      console.log(err);
    }
  });

  it('error', () => {
    try {
      const s = sinon
        .mock(CompetitorsModel);

      s.expects('findOne')
        .rejects(competitorsMock.castError);

      return lambdaTester(findOne)
      .event({ pathParameters: { id: 25768396 } })
      .expectResult((result: any) => {
        expect(result.statusCode).to.equal(200);
        const body = JSON.parse(result.body);
        expect(body.code).to.equal(1000);
        s.restore();
      });
    } catch (err) {
      console.log(err);
    }
  });
});

describe('Find [GET]', () => {
  it('success', () => {
    const s = sinon
      .mock(CompetitorsModel);

    s.expects('find')
      .resolves(competitorsMock.find);

    return lambdaTester(find)
    .event({})
    .expectResult((result: any) => {
      expect(result.statusCode).to.equal(200);
      const body = JSON.parse(result.body);
      expect(body.code).to.equal(0);
      s.restore();
    });
  });

  it('error', () => {
    const s = sinon
      .mock(CompetitorsModel);

    s.expects('find').rejects(competitorsMock.findError);

    return lambdaTester(find)
    .event({})
    .expectResult((result: any) => {
      expect(result.statusCode).to.equal(200);
      const body = JSON.parse(result.body);
      expect(body.code).to.equal(1000);
      s.restore();
    });
  });
});

describe('Create [POST]', () => {
  it('success', () => {
    const s = sinon
      .mock(CompetitorsModel);

    s.expects('create').resolves(competitorsMock.create);

    return lambdaTester(create)
      .event({ body: JSON.stringify({
        name: 'Apple',
        id: 30247892,
      })})
      .expectResult((result: any) => {
        expect(result.statusCode).to.equal(200);
        const body = JSON.parse(result.body);
        expect(body.code).to.equal(0);
        s.restore();
      });
  });

  it('error', () => {
    const s = sinon
      .mock(CompetitorsModel);

    s.expects('create').rejects(competitorsMock.createError);

    return lambdaTester(create)
      .event({ body: JSON.stringify({
        name: 'Apple',
        id: 30247892,
      })})
      .expectResult((result: any) => {
        expect(result.statusCode).to.equal(200);
        const body = JSON.parse(result.body);
        expect(body.code).to.equal(1000);
        s.restore();
      });
  });
});

describe('Update [PUT]', () => {
  it('success', () => {
    const s = sinon
      .mock(CompetitorsModel);

    s.expects('findOneAndUpdate').resolves(competitorsMock.update);

    return lambdaTester(update)
      .event({ pathParameters: { id: 30247892 }, body: JSON.stringify({
        name: 'Samsung',
        description: '',
      })})
      .expectResult((result: any) => {
        expect(result.statusCode).to.equal(200);
        const body = JSON.parse(result.body);
        expect(body.code).to.equal(0);
        s.restore();
      });
  });

  it('error', () => {
    const s = sinon
      .mock(CompetitorsModel);

    s.expects('findOneAndUpdate').rejects(competitorsMock.castError);

    return lambdaTester(update)
      .event({  pathParameters: { id: '30247892_' }, body: JSON.stringify({
        name: 'Samsung',
        description: '',
      })})
      .expectResult((result: any) => {
        expect(result.statusCode).to.equal(200);
        const body = JSON.parse(result.body);
        expect(body.code).to.equal(1000);
        s.restore();
      });
  });
});

describe('DeleteOne [Delete]', () => {
  it('success', () => {
    const s = sinon
      .mock(CompetitorsModel);

    s.expects('deleteOne').resolves(competitorsMock.deleteOne);

    return lambdaTester(deleteOne)
      .event({  pathParameters: { id: 30247892 } })
      .expectResult((result: any) => {
        expect(result.statusCode).to.equal(200);
        const body = JSON.parse(result.body);
        expect(body.code).to.equal(0);
        s.restore();
      });
  });

  it('deletedCount === 0', () => {
    const s = sinon
      .mock(CompetitorsModel);

    s.expects('deleteOne').resolves(competitorsMock.deletedCount);

    return lambdaTester(deleteOne)
      .event({ pathParameters: { id: 30247892 } })
      .expectResult((result: any) => {
        expect(result.statusCode).to.equal(200);
        const body = JSON.parse(result.body);
        expect(body.code).to.equal(1010);
        s.restore();
      });
  });

  it('error', () => {
    const s = sinon
      .mock(CompetitorsModel);

    s.expects('deleteOne').rejects(competitorsMock.castError);

    return lambdaTester(deleteOne)
      .event({ pathParameters: { id: '30247892_' } })
      .expectResult((result: any) => {
        expect(result.statusCode).to.equal(200);
        const body = JSON.parse(result.body);
        expect(body.code).to.equal(1000);
        s.restore();
      });
  });
});
