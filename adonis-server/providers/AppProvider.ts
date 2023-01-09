import type { ApplicationContract } from '@ioc:Adonis/Core/Application'

export default class AppProvider {
  constructor(protected app: ApplicationContract) {}

  public register() {
    // Register your own bindings
  }

  public async boot() {
    // IoC container is ready
  }

  public async ready() {
    // App is ready
    // require('../app/Cron/index')
    import('../app/Cron/index')
    // import('../app/Moments/index')
  }

  public async shutdown() {
    // Cleanup, since app is going down
  }
}
