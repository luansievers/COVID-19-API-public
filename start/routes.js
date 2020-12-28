'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.post('users/login',   'UserController.login')
Route.get('users/me',       'UserController.me').middleware(['auth'])


Route.post('locations/find', 'LocationController.find')
Route.post('locations/store', 'LocationController.store').middleware(['auth'])

Route.get('questions', 'QuestionController.index').middleware(['auth'])
Route.post('answers',  'AnswerController.answer').middleware(['auth'])

Route.get('/', async () => {
  return 'ok'
})
