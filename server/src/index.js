import express from 'express'
import cors from 'cors'
import errors from './utils/errors/errorHandler'
import router from './router/index'

const PORT = process.env.PORT || 3001
const app = express()

app.use(cors());
app.use(express.json())
app.use('/api',router)
app.use(errors)

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
})

