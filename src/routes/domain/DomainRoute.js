const route = require('express').Router()
const DomainController = require('../../controllers/domain/DomainController')
const authMiddleware = require('../../middlewares/auth')

route.post('/new-domain', authMiddleware, DomainController.store)
route.get('/index-domain', authMiddleware, DomainController.index)

module.exports = route
