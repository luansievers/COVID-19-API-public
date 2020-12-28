'use strict'

/*
|--------------------------------------------------------------------------
| QuestionSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

class QuestionSeeder {
  async run() {
    console.log('---QuestionSeeder---');
    await Factory
      .model('App/Models/Question')
      .createMany(9, [
        {value: 'question.age', type: 'number'},
        {value: 'question.contact_covid19', type: 'boolean'},
        {value: 'question.fever', type: 'boolean'},
        {value: 'question.tiredness', type: 'boolean'},
        {value: 'question.cough', type: 'boolean'},
        {value: 'question.aches_and_pains', type: 'boolean'},
        {value: 'question.nasal_congestion', type: 'boolean'},
        {value: 'question.runny_nose', type: 'boolean'},
        {value: 'question.sore_throat', type: 'boolean'},
        {value: 'question.diarrhea', type: 'boolean'}
      ]);
    console.log('---QuestionSeeder---')
  }
}

module.exports = QuestionSeeder
