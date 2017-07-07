const express = require('express')
const app = express('app')
app.use(express.static('./www'))
app.use('/home', (req, res) => {
  res.setHeader('set-cookie', 'age=18')
  res.end('ok')
})
app.listen(3000)
