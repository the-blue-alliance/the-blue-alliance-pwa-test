import { StackdriverErrorReporter } from 'stackdriver-errors-js'

let errorReporter = {report: console.error}
if (process.env.NODE_ENV === 'production' && typeof window !== 'undefined') {
  window.StackTrace = require('stacktrace-js')
  errorReporter = new StackdriverErrorReporter()
  errorReporter.start({
    projectId: 'tbatv-prod-hrd',
    key: 'AIzaSyDZsf6LR_SWACeg96tPMo6vXY9B0Lmf6UY',
    service: 'tba-pwa',
    // version: '<my-service-version>',  // TODO: Use build verison
  })
}

export default errorReporter
