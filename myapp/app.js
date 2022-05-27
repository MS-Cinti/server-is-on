const express = require('express')
const app = express()
const port = 3000
const fs = require('fs')
const fileUpload = require("express-fileupload");


app.get('/', (req, res) => {
  res.send(`<h1>Hello World! It's Codecool.</h1>`)
})

const getStudentData = () => {
  //nem kell '/' mert egy szinten van a data mappával
  const jsonData = fs.readFileSync('data/students.json') 
  return JSON.parse(jsonData)    
}

app.get('/api/students', (req, res) => {
  const students = getStudentData()
  res.send(students)
})

app.get('/api/students/:id', (req, res) => {
  const id = req.params.id
  //console.log(req.params.id)
  const existStudents = getStudentData()
  //console.log(existStudents)
  //ez akkor működik, ha sorban vannak id szerint az objectek az arrayben 
  const filterStudent = existStudents[id-1]  //-1, mert 0-ról indul
  //console.log(filterStudent)

  if (filterStudent === undefined) {
    return res.status(409).send('id does not exist')
  }
  res.send(filterStudent)
})

app.get('/api/status/active', (req, res) => {
  const status = req.params.status
  //console.log(req.params.status)
  const existStudents = getStudentData()
  const filterStatusTrue = existStudents.filter(students => students.status === true)

  res.send(filterStatusTrue)
})

app.get('/api/status/finished', (req, res) => {
  const status = req.params.status
  //console.log(req.params.status)
  const existStudents = getStudentData()
  const filterStatusFalse = existStudents.filter(students => students.status === false)

  res.send(filterStatusFalse)
})

/* //optional task: add students
app.post('/upload/:id', (req, res) => {
  console.log('first')
  const existStudents = getStudentData()
  //const name = req.params.name
  const studentData = req.body
  console.log(req.body)
  existStudents.push(studentData)
  res.send(existStudents)
})
*/

app.use("/myapp", express.static(`${__dirname}/../myapp`))
app.use("/data", express.static(`${__dirname}/../myapp/data`))
app.use(fileUpload());

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})