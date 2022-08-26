import express, { json } from 'express'
import morgan from 'morgan'
import 'dotenv/config'
import appRoutes from './routes/app.routes'
const app = express()
app.use(json())
app.use(morgan('dev'))
app.use(appRoutes)
const port = process.env.PORT
app.listen(port, () => {
    console.log(`Escuchando pedidos en PORT: ${port}`)
})