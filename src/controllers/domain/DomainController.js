const DomainService = require('../../services/domain/DomainService')
const yup = require('yup')

const store = async (request, response) => {
  const schema = yup.object().shape({
    name: yup.string().required(),
    price: yup.number().required().positive().moreThan(0)
  })

  try {
    await schema.validateSync(request.body, { abortEarly: false })
  } catch (err) {
    return response.status(400).json({ error: err.errors })
  }

  const { name, price } = request.body
  const { userId, userName } = request

  const domainExists = await DomainService.loadByName(name)

  if (domainExists) {
    return response.status(400).json({ error: 'Domain already exists' })
  }

  await DomainService.create({
    client: {
      id: userId,
      name: userName
    },
    name,
    price
  })

  return response
    .status(201)
    .json(
      'The request was successful and a new resource was created as a result.'
    )
}

const index = async (request, response) => {
  const domains = await DomainService.loadAll()
  return response.status(200).json(domains)
}

const update = async (request, response) => {
  const schema = yup.object().shape({
    status: yup.string().required()
  })

  try {
    await schema.validateSync(request.body, { abortEarly: false })
  } catch (err) {
    return response.status(400).json({ error: err.errors })
  }

  const { status } = request.body
  const { domain_id } = request.params

  try {
    await DomainService.updateOne(domain_id, status)
  } catch (error) {
    return response.status(400).json({ error: error.message })
  }

  return response
    .status(204)
    .json(
      'The request was successfully processed but is not returning any content.'
    )
}

module.exports = { store, index, update }
