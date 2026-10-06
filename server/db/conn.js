require('mongodb').MongoClient
const connectionString = process.env.dburl || 'mongodb://localhost:27017'
const client = new MongoClient(connectionString)
let conn
try {
    conn = await client.connect()
} catch(e) {
    console.error(e)
}
let db = conn.db('globe')
export default db