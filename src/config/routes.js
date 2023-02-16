const UserRoute = require('../routes/user/UserRoute')
const DomainRoute = require('../routes/domain/DomainRoute')

module.exports = (app) => {
  app.use('/api', UserRoute)
  app.use('/api', DomainRoute)
}
