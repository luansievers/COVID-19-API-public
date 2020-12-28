'use strict'

/*
|--------------------------------------------------------------------------
| AnswerSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
/** @type {import('@adonisjs/lucid/src/Database')} */
const Database = use('Database')

class FullSeeder {
  async run() {
    console.log('--FullSeeder--')
    console.log('---QuestionSeeder---')
    const questions = await Factory
      .model('App/Models/Question')
      .createMany(9,[
          {value: 'question.age', type: 'number'} ,
          {value: 'question.contact_covid19', type: 'boolean'} ,
          {value: 'question.fever', type: 'boolean'} ,
          {value: 'question.tiredness', type: 'boolean'} ,
          {value: 'question.cough', type: 'boolean'} ,
          {value: 'question.aches_and_pains', type: 'boolean'} ,
          {value: 'question.nasal_congestion', type: 'boolean'} ,
          {value: 'question.runny_nose', type: 'boolean'} ,
          {value: 'question.sore_throat', type: 'boolean'} ,
          {value: 'question.diarrhea', type: 'boolean'}  
      ])
    console.log('---QuestionSeeder---')
    // console.log('---UserSeeder--')
    // const users = await Factory
    //   .model('App/Models/User')
    //   .createMany(10)
    // console.log('---UserSeeder--')

    // for (let user of users) {
    //   for (let question of questions) {
    //       const answer = await Factory.model('App/Models/Answer').make({value: question.value})
    //       await user.answer().save(answer)
    //       await question.answers().save(answer)
    //   }
    //   console.log('---LocationSeeder---')
    //   const location = await Factory.model('App/Models/Location').make()
    //   await Database
    //     .raw(`insert into locations(coordinates, user_id, created_at, updated_at)
    //     VALUES ((ST_SetSRID(ST_MakePoint(${location.coordinates[0]},${location.coordinates[1]}), 4326)),
    //      ${user.id}, ${Database.fn.now()}, ${Database.fn.now()})`)
    //   console.log('---LocationSeeder---')
    // }

    for (let index = 0; index < 20000; index++) {
      const location = await Factory.model('App/Models/Location').make()
      await Database
        .raw(`insert into locations(coordinates, created_at, updated_at)
        VALUES ((ST_SetSRID(ST_MakePoint(${location.coordinates[1]},${location.coordinates[0]}), 4326)), ${Database.fn.now()}, ${Database.fn.now()})`)
      
    }
    console.log('--FullSeeder--')
  }
}

module.exports = FullSeeder
