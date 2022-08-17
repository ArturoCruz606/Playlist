const { request, response } = require('express')
const express = require('express')
const app = express()
app.use(express.json())
const port = 3000

let playlists = [
    {
        nombre: "lol",
        descripcion: "a",
        canciones: [
            {
                titulo: "veil",
                artista: "no se",
                album: "nu se",
                año: 2019
            },
            {
                titulo: "nose",
                artista: "no se",
                album: "nu se",
                año: 2000
            }
        ]
    }
]

app.get('/lists', (request, response) =>{
    response.send(playlists)
})

app.get('/lists/:nombre', (request, response) =>{
    let nombre = request.params.nombre
    let lista = playlists.filter(x => x.nombre == nombre)[0]
    if(lista == null)
    {
        response.status(404).send()
        return
    }
    response.send(lista)
})

app.post('/lists', (request, response) =>{
    if(request.body.nombre == null)
        response.status(400).send()
    playlists.push(request.body)
    response.status(201).send()
})

app.put('/lists/:nombre', (request, response) =>{
    let nombre = request.params.nombre
    let lista = playlists.filter(x => x.nombre == nombre)[0]
    if(lista == null)
    {
        response.status(404).send()
        return
    }
    lista.descripcion = request.body.descripcion
    response.send(request.body)
})
app.delete('/lists/:nombre', (request, response) =>{
    let nombre = request.params.nombre
    let lista = playlists.filter(x => x.nombre == nombre)[0]
    if(lista == null)
    {
        response.status(404).send()
        return
    }
    let indice = playlists.indexOf(lista)
    playlists.splice(indice, 1)
    response.status(204).send()
})


app.listen(port)