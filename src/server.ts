import express, { NextFunction, Request, Response } from 'express'
import 'express-async-errors'
import SwaggerUi from 'swagger-ui-express'

import './database'

import './shared/container'

import { AppError } from './errors/appError'
import { router } from './routes'
import swaggerFile from './swagger.json'
// para importar o arquivo de banco de dados, o import ja reconhece o index

const app = express()

app.use(express.json())
// falar a rota que vai ficar a documentacao, chamar o servidor, e passar um setup
app.use('/api-docs', SwaggerUi.serve, SwaggerUi.setup(swaggerFile))

// importa todas as rotas que serao utilizadas
app.use(router)

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  // verifica se a instancia eh do tipo appError
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      message: err.message,
    })
  }
  // se a instancia nao for do tipo appErro e for do tipo Error:
  return res.status(500).json({
    status: 'error',
    message: `Internal server error - ${err.message}`,
  })
})

app.listen(3333, () => console.log('Server is running'))

/*
⠄⠠⢀⠐⡀⢐⠐⠐⠄⠂⠐⠄⠂⠐⠄⠐⠄⠂⠐⠈⠠⠑⠨⠢⡊⠔⡐⠄
⠄⠂⠠⠐⠄⠄⡀⠄⠂⠄⠄⠄⠄⠄⠄⠄⠂⠄⠄⠄⢀⠄⡀⠄⠈⠨⠠⡁
⠄⠈⠄⠄⡀⢂⠠⠐⢀⠂⠠⠈⠄⠂⠄⠄⠄⠄⠄⠈⠄⠠⠄⠂⡀⠄⠈⠐
⠄⠄⠄⡂⡐⠠⡂⠅⡂⠌⡐⠈⠄⠨⢀⠂⡁⠌⠠⡁⡂⠅⠌⠄⢂⠠⠄⠄
⠄⠄⢂⠢⢨⣶⡾⢷⣦⡅⡂⠅⡡⢁⠂⡂⡂⢅⢑⣴⣾⠾⣮⣌⢐⠠⠄⠄
⠄⠄⢂⢊⢿⡏⠡⠂⢽⡗⢌⢂⠢⡁⠪⡐⠄⢕⢸⣿⠑⠡⢸⡿⢐⠨⠄⠄
⠄⠄⠅⡢⡙⠿⣾⢼⠟⡕⡑⢔⠡⡊⢌⠢⡑⡑⡌⡻⢷⢷⠟⢍⠢⡁⠂⠄
⠄⠄⠌⡂⡪⡑⡆⣇⣣⣱⣸⣰⣱⣜⣬⣪⣬⣦⣣⣎⣖⣔⣕⢅⢕⠨⠄⠄
⠄⠄⡑⣬⣺⡾⣿⣿⣻⣯⣿⣟⣿⣽⣿⣻⣿⣾⢿⣻⣿⣻⣯⣿⣲⢅⠄⠄
⠄⠄⢪⢗⣯⡏⠙⣯⣿⣯⣷⣿⣿⣽⣾⣿⢷⣿⡿⣿⣻⠝⢓⡷⡯⡣⠄⠁
⠄⠄⠈⢝⢞⡿⣦⡀⠙⠯⢿⢷⣿⣽⢿⣾⢿⡯⡟⠏⢁⢤⡿⡝⡕⠁⠄⡀
⠄⠄⠄⠄⠑⠝⣗⣟⡷⣤⣀⣁⠈⠈⠉⠊⣁⡠⣤⢶⣻⢽⠱⠑⠄⠄⠄⠄
⠄⠄⠄⠄⠄⠄⠐⠸⠹⠽⡽⣽⣻⣻⣟⣟⣷⣻⢽⢫⠣⠃⠄⠄⠄⠄⠄⠁
⠄⠄⠄⠄⠄⠄⠄⠄⠈⠁⠣⢣⢓⢗⢳⢹⢸⠸⠈⡀⠄⠄⠄⠄⠄⠄⠄⠄
⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄
⠄⠄⠄⠄⠄⠄⠄⠄⠄I CAN SEE YOU⠄⠄⠄⠄⠄⠄⠄⠄
*/
