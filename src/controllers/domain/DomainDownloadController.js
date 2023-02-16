const DomainService = require('../../services/domain/DomainService')
const moment = require('moment')
const { Parser } = require('json2csv')

const findByStatus = async (request, response) => {
  try {
    const { status } = request.query
    const domains = await DomainService.loadAllByStatus(status)
    const editedDomain = domains.map((domain) => {
      let buyDate = moment(domain.buyDate)
      buyDate = buyDate.format('DD/MM/YYYY')
      let dueDate = moment(domain.dueDate)
      dueDate = dueDate.format('DD/MM/YYYY')

      return {
        Domínio: domain.name,
        Proprietário: domain.client.name,
        Data_da_Compra: buyDate,
        Data_do_Vencimento: dueDate,
        Valor_do_Registro: domain.price,
        Status: domain.status
      }
    })

    const fields = [
      'Domínio',
      'Proprietário',
      'Data_da_Compra',
      'Data_do_Vencimento',
      'Valor_do_Registro',
      'Status'
    ]
    const json2csvParser = new Parser({ fields })
    const csv = json2csvParser.parse(editedDomain)
    response.attachment('domains.csv')
    response.status(200).send(csv)
  } catch (err) {
    return response.status(500).json({ error: err.errors })
  }
}
module.exports = { findByStatus }
