const route = require('express').Router()
const DomainController = require('../../controllers/domain/DomainController')
const DomainDownloadController = require('../../controllers/domain/DomainDownloadController')
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
route.delete(
  '/delete-domain/:domain_id',
  authMiddleware,
  authAdminMiddleware,
  DomainController.destroy
)
route.get('/show-domain/:domain_id', authMiddleware, DomainController.show)
route.get(
  '/findByStatus-domain',
  authMiddleware,
  DomainDownloadController.findByStatus
)

module.exports = route
