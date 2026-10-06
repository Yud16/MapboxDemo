require('./loadEnvironment')
require('./db/conn')

const projectRouter = require('./routes/projects')
app.use('/projects', projectRouter)