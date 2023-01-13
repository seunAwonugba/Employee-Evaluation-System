/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/api/v1', async () => {
  return { success: 'true' }
})

Route.group(() => {
  Route.get('managers', 'UsersController.getManagers')
  Route.get('members', 'UsersController.getMembers')

  Route.get('manager/:id', 'UsersController.getManager')
  Route.get('member/:id', 'UsersController.getMember')

  Route.get('members/branch', 'UsersController.getMembersByBranch')
  Route.get('managers/branch', 'UsersController.getManagersByBranch')

  Route.post('evaluation/manager/submit-form', 'FormsController.submitManagerForm')
  Route.post('evaluation/member/submit-form', 'FormsController.submitMemberForm')

  Route.get('evaluation/manager/:id', 'EvaluationsController.getManagerEvaluations')
  Route.get('evaluation/member/:id', 'EvaluationsController.getMemberEvaluations')
}).prefix('api/v1/')
