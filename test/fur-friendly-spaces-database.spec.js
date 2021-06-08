const app = require('../src/app')
const knex = require('knex')

describe('Spaces Endpoints', () => {
  let db

  before('make knex instance', () => {
    db=knex({
      client:'pg',
      connection:process.env.TEST_DB_URL,
    })
    app.set('db',db)
  })

  it('GET / responds with 200 containing "Hello, world!"', () => {
    return supertest(app)
      .get('/')
      .expect(200, 'Hello, world!')
  })
})