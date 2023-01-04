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
import UsersController from 'App/Controllers/Http/UsersController'

Route.get('/api/v1', async () => {
  return { success: 'true' }
})

Route.group(() => {
  Route.get('users', 'UsersController.getUsers')
  Route.get('manager/:id', 'UsersController.getManager')
  Route.get('members/branch', 'UsersController.getMembersByBranch')
  Route.post('evaluation/manager/submit-form', 'FormsController.submitManagerForm')
}).prefix('api/v1/')
