'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with questions
 */
class QuestionController {
  /**
   * Show a list of all questions.
   * GET questions
   *
   * @param {object} ctx
   * @param {Response} ctx.response
   */
  async index ({ response }) {
    try {
      const Question = use('App/Models/Question')
      const data = await Question.all()
      return response.status(200).send(data)
    } catch (error) {
      return response.status(400).send()
    }
  }
}

module.exports = QuestionController
