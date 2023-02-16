const route = require('express').Router()
const DomainController = require('../../controllers/domain/DomainController')
const authMiddleware = require('../../middlewares/auth')

route.post('/new-domain', authMiddleware, DomainController.store)

module.exports = route
