const { expect } = require('chai');
const supertest = require('supertest');
const app = require('../src/app');
const databaseService = require('../src/databaseService')
//const STORE = require('../dummy-store')

describe('Spaces Endpoints', () => {
    let db;

    before("make knex instance", () => {
        db = knex({
        client: "pg",
        connection: process.env.TEST_DATABASE_URL,
        });
        app.set("db", db);
    });

    after("disconnect from test database", () => db.destroy());

    before("clean the table", () =>
        db("entries")
            .truncate()
            .then(() => db.raw("TRUNCATE TABLE spaces RESTART IDENTITY CASCADE"))
    );

    //const testSpaces = STORE.spaces;

    beforeEach("insert test spaces", () => {
        return db
            .into("spaces")
            .insert(testSpaces)
    });

    afterEach("return db to original settings", () => 
        db("spaces")
            .truncate()
            .then(() => db.raw("TRUNCATE TABLE spaces RESTART IDENTITY CASCADE"))
    );

    it('should return a message from GET /api/', () => {
        return supertest(app)
            .get('/api/')
            .expect(200, 'Database Endpoint Homepage')
    });

    it('GET /api/spaces', () => {
        return supertest(app)
            .get('/api/spaces')
            .expect(200, {})
            /*.expect('Content-Type', /json/)
            .then(res => {
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.lengthOf.at.least(1);
                const result = res.body;
                expect(result).to.include.all.keys('spaces','types')
                expect(result.spaces[0]).to.include.all.keys(
                    'id','name','address','city','type','upCount','downCount'
                );
            });*/
    });
});
