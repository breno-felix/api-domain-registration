const Domain = require('../../models/Domain')

const create = (body) => Domain.create(body)
const loadByName = (name) => Domain.findOne({ name })
const loadAll = () => Domain.find()
const updateOne = (id, status) => Domain.updateOne({ _id: id }, { status })

module.exports = {
  create,
  loadByName,
  loadAll,
  updateOne
}
