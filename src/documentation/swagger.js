const env = require('../config/envfile')

module.exports = {
  openapi: '3.0.0',
  info: {
    title: 'API Domain Registration',
    summary: 'A company that sells domains.',
    description:
      'This API aims to enable the routine operation of a company that sells domains.',
    version: '1.0',
    termsOfService: `${env.appUrl}/terms`,
    contact: {
      name: 'Breno Felix',
      email: 'regis.dom.api@gmail.com'
    }
  },
  tags: [
    { name: 'User', description: 'Operations about user' },
    { name: 'Domain', description: 'Operations about domain' }
  ],
  servers: [
    {
      url: env.appUrl,
      description: 'API de produção'
    }
  ],
  paths: {
    '/sign-up': {
      post: {
        summary: 'Create user',
        description: 'Route to sign up a new user.',
        tags: ['User'],
        requestBody: {
          required: true,
          $ref: '#/components/requestBodies/UserSignUp'
        },
        responses: {
          201: {
            $ref: '#/components/responses/Created'
          },
          400: {
            $ref: '#/components/responses/BadRequest'
          },
          500: {
            $ref: '#/components/responses/ServerError'
          }
        }
      }
    },
    '/login': {
      post: {
        summary: 'Sign in user',
        description: 'Performs user authentication and returns access token',
        tags: ['User'],
        requestBody: {
          required: true,
          $ref: '#/components/requestBodies/UserLogin'
        },
        responses: {
          200: {
            description: 'Ok',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    token: {
                      type: 'string',
                      description: 'JWT Token for authenticated user',
                      example:
                        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkJyZW5vIEZlbGl4IiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
                    }
                  }
                }
              }
            }
          },
          400: {
            $ref: '#/components/responses/BadRequest'
          },
          401: {
            $ref: '#/components/responses/Unauthorized'
          },
          500: {
            $ref: '#/components/responses/ServerError'
          }
        }
      }
    },
    '/new-domain': {
      post: {
        security: [
          {
            bearerAuth: []
          }
        ],
        summary: 'Create a new domain',
        description:
          'This endpoint creates a new domain with the given name and price. Needed login.',
        tags: ['Domain'],
        requestBody: {
          required: true,
          $ref: '#/components/requestBodies/NewDomain'
        },
        responses: {
          201: {
            $ref: '#/components/responses/Created'
          },
          400: {
            $ref: '#/components/responses/BadRequest'
          },
          401: {
            $ref: '#/components/responses/Unauthorized'
          },
          500: {
            $ref: '#/components/responses/ServerError'
          }
        }
      }
    },
    '/index-domain': {
      get: {
        security: [
          {
            bearerAuth: []
          }
        ],
        summary: 'Show all domains',
        description: 'This endpoint show all domains and needed login.',
        tags: ['Domain'],
        responses: {
          200: {
            description: 'Ok',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    type: 'object',
                    $ref: '#/components/schemas/Domain'
                  }
                }
              }
            }
          },
          401: {
            $ref: '#/components/responses/Unauthorized'
          },
          500: {
            $ref: '#/components/responses/ServerError'
          }
        }
      }
    }
  },
  components: {
    schemas: {
      User: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            description: "The user's name",
            required: true,
            example: 'Breno Felix'
          },
          email: {
            type: 'string',
            description: "The user's email, must be unique",
            required: true,
            example: 'brenodev.felix@gmail.com'
          },
          password: {
            type: 'string',
            description: "The user's password",
            required: true,
            example: 'password123'
          },
          admin: {
            type: 'boolean',
            description: "The user's type, default to false",
            default: false
          }
        },
        additionalProperties: false
      },
      Domain: {
        type: 'object',
        properties: {
          _id: {
            type: 'string',
            description: 'Automatically generated by Mongoose',
            required: true,
            example: '63e417f8369e2dab767e6ddc'
          },
          client: {
            type: 'object',
            description: "The domain's user, it must exist",
            properties: {
              id: {
                type: 'string',
                description: "The user's id, it must exist",
                required: true,
                example: '63e41caae48b4160afb18192'
              },
              name: {
                type: 'string',
                description: "The user's name",
                required: true,
                example: 'Breno Felix'
              }
            }
          },
          buyDate: {
            type: 'date-time',
            description: 'Domain buy date',
            required: true,
            example: '2023-02-16T21:45:28.016Z'
          },
          dueDate: {
            type: 'date-time',
            description: 'Domain expiration date, which is 12 months after buy',
            required: true,
            example: '2024-02-16T21:45:28.016Z'
          },
          price: {
            type: 'number',
            description: "The domain's price",
            required: true,
            minimum: 0,
            example: 26.9
          },
          status: {
            type: 'string',
            description: "The domain's status",
            required: true,
            example: 'Ativo'
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
            required: true,
            description: 'Automatically generated by Mongoose',
            example: '2023-02-16T21:45:28.016Z'
          },
          updatedAt: {
            type: 'string',
            format: 'date-time',
            required: true,
            description: 'Automatically generated by Mongoose',
            example: '2023-02-16T21:45:28.016Z'
          }
        },
        additionalProperties: false
      }
    },
    responses: {
      Created: {
        description: 'Created',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                message: {
                  type: 'string',
                  description: 'Success message',
                  default:
                    'The request was successful and a new resource was created as a result.'
                }
              }
            }
          }
        }
      },
      NoContent: {
        description: 'NoContent',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                message: {
                  type: 'string',
                  description: 'Success message',
                  default:
                    'The request was successfully processed but is not returning any content.'
                }
              }
            }
          }
        }
      },
      BadRequest: {
        description: 'Bad Request - Missing or Invalid Parameters',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                error: {
                  type: 'string',
                  description: 'Error message',
                  example: 'Missing param: paramName'
                }
              }
            }
          }
        }
      },
      Unauthorized: {
        description: 'Unauthorized - Incorrect credentials',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                error: {
                  type: 'string',
                  description: 'Error message',
                  example: 'Unauthorized'
                }
              }
            }
          }
        }
      },
      Forbidden: {
        description: 'Forbidden',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                error: {
                  type: 'string',
                  description: 'Error message',
                  example: 'Access denied you do not have permission to access'
                }
              }
            }
          }
        }
      },
      ServerError: {
        description: 'Internal Server Error',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                error: {
                  type: 'string',
                  description: 'Error message',
                  example: 'Internal error.'
                }
              }
            }
          }
        }
      }
    },
    requestBodies: {
      UserSignUp: {
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/User'
            }
          }
        },
        description:
          'User object needed to create a new user. RepeatPassword is mandatory and must be equal to password.',
        required: true
      },
      UserLogin: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                email: {
                  type: 'string',
                  description: "The user's email",
                  required: true,
                  example: 'brenodev.felix@gmail.com'
                },
                password: {
                  type: 'string',
                  description: "The user's password",
                  required: true,
                  example: 'password123'
                }
              },
              additionalProperties: false
            }
          }
        },
        description: 'User object needed to sign in a existing user.',
        required: true
      },
      NewDomain: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                name: {
                  type: 'string',
                  description: "The domain's name",
                  required: true,
                  example: 'meudominio.com'
                },
                price: {
                  type: 'number',
                  description: "The domain's price",
                  required: true,
                  minimum: 0,
                  example: 26.9
                }
              }
            }
          }
        },
        description: 'Domain object needed to create a new domain.',
        required: true
      }
    },
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT'
      }
    }
  }
}
