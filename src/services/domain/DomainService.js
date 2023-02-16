const Domain = require('../../models/Domain')

const create = (body) => Domain.create(body)
const loadByName = (name) => Domain.findOne({ name })

module.exports = {
  create,
  loadByName
}
