'use strict'

/** @typedef {import('@adonisjs/auth/src/Auth')} Auth */
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

class AnswerController {

  /**
  * POST answer
  *
  * @param {object} ctx
  * @param {Auth} ctx.auth
  * @param {Request} ctx.Request
  * @param {Response} ctx.response
  */
  async answer({ auth, request, response }) {
    try {
      const params = request.all()

      const Question = use('App/Models/Question')

      const question = await Question.findBy('value', params.question)

      if (!question) {
        throw new Error('Question not found')
      }else if(question.type === 'boolean' && typeof(params.value) !== 'boolean'){
        throw new Error('Value not allowed')
      } else if(question.type === 'number' && typeof(params.value) !== 'number') {
        throw new Error('Value not allowed')
      }

      const user = await auth.getUser()

      const Answer = use('App/Models/Answer')
      const answer = new Answer()

      if(question.type === 'boolean') {
        answer.value = params.value ? 1 : 0
      } else{
        answer.value = params.value
      }
      answer.question_id = question.id

      await user.answers().save(answer)

      return response.status(200).send()
    } catch (error) {
      return response.status(400).send(error)
    }
  }
}

module.exports = AnswerController
