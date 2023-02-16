const route = require('express').Router()
const DomainController = require('../../controllers/domain/DomainController')
const authMiddleware = require('../../middlewares/auth')
const authAdminMiddleware = require('../../middlewares/authAdmin')

route.post('/new-domain', authMiddleware, DomainController.store)
route.get('/index-domain', authMiddleware, DomainController.index)
route.patch(
  '/update-domain/:domain_id',
  authMiddleware,
  authAdminMiddleware,
  DomainController.update
)

module.exports = route
