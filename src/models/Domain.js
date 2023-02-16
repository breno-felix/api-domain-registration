const mongoose = require('mongoose')

const DomainSchema = new mongoose.Schema({
  client: {
    id: { type: String, required: true },
    name: { type: String, required: true }
  },
  name: { type: String, required: true },
  buyDate: { type: Date, default: Date.now },
  dueDate: {
    type: Date,
    default: function () {
      const date = new Date(this.buyDate)
      date.setMonth(date.getMonth() + 12)
      return date
    }
  },
  price: { type: Number, required: true, min: 0 },
  status: { type: String, required: true, default: 'Ativo' }
})

DomainSchema.set('timestamps', true)

module.exports = mongoose.model('Domain', DomainSchema)
