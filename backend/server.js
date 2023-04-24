import express from 'express'
import dotenv from'dotenv'
import connectdb from './config/db.js'
import colors from 'colors'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/usersRoutes.js'
import { errorHandler, notFound } from './middleware/errorMiddleware.js'


connectdb()

dotenv.config()

const app = express()

app.use(express.json())


app.get('/', (req, res) => {
    res.send('API is running...')
})

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)

app.use(notFound)
app.use(errorHandler)




const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`server runing in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold))