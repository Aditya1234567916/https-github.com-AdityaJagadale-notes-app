import mongoose from 'mongoose'

const connection = {}

async function dbConnect() {
    if (connection.isConnection) {
        return
    }

    const db = await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })

    connection.isConnection = db.connections[0].readyState
    console.log(connection.isConnection)
}

export default dbConnect