'use strict'

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')


Factory.blueprint('App/Models/User', async (faker) => {
    return {
        name: faker.name(),
        avatar: faker.avatar(),
        email: faker.email(),
        source_id: faker.natural(),
        login_source: faker.pickone(['google', 'facebook'])
    }
})

Factory.blueprint('App/Models/Question', async (faker, i, data) => {
    return {
        value: data[i].value || faker.string(),
        type: data[i].type || faker.pickone(['number', 'boolean'])
    }
})

Factory.blueprint('App/Models/Answer', async (faker, i, data) => {
    if (data.value === 'question.age') {
        return {
            value: faker.natural({min: 1, max: 100})
        }
    }
    return {
        value: faker.bool({likelihood: 85}) ? 1 : 0
    }
})

Factory.blueprint('App/Models/Location', async (faker, i, data) => {
    return {
        coordinates: [faker.longitude(), faker.latitude()]
    }
})