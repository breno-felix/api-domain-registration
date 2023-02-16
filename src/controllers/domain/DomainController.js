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

  const domainExists = await DomainService.loadByName(request.body.name)

  if (domainExists) {
    return response.status(400).json({ error: 'Domain already exists' })
  }
  const { name, price } = request.body
  const { userId, userName } = request

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

module.exports = { store, index }
