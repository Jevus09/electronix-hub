import express from 'express'
import dotenv from'dotenv'
import connectdb from './config/db.js'
import colors from 'colors'
import prductRoutes from './routes/productRoutes.js'
import { errorHandler, notFound } from './middleware/errorMiddleware.js'

const app = express()
connectdb()

dotenv.config()

app.get('/', (req, res) => {
    res.send('API is running...')
})

app.use('/api/products', prductRoutes)


app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`server runing in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold))