const Domain = require('../../models/Domain')

const create = (body) => Domain.create(body)
const loadByName = (name) => Domain.findOne({ name })
const loadAll = () => Domain.find()

module.exports = {
  create,
  loadByName,
  loadAll
}
