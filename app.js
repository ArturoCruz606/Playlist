const { request, response } = require('express')
const express = require('express')
const app = express()
app.use(express.json())
const port = 3000

let playlists = [
    {
        "nombre": "lol",
        "descripcion": "a",
        "canciones": [
            {
                "titulo": "veil",
                "artista": "no se",
                "album": "nu se",
                "año": 2019
            },
            {
                "titulo": "nose",
                "artista": "no se",
                "album": "nu se",
                "año": 2000
            }
        ]
    },
    {
        "nombre": "ligoleyen",
        "descripcion": "aeiou",
        "canciones": [
            {
                "titulo": "esetera",
                "artista": "no se",
                "album": "nu se",
                "año": 2019
            },
            {
                "titulo": "a",
                "artista": "no se",
                "album": "nu se",
                "año": 2000
            }
        ]
    }
]

app.get('/lists', (request, response) => {
    response.send(playlists)
})

app.get('/lists/:nombre', (request, response) => {
    let nombre = request.params.nombre
    let lista = playlists.filter(x => x.nombre == nombre)[0]
    if (lista == null) {
        response.status(404).send("no se encuentra la lista")
        return
    }
    response.send(lista)
})

app.post('/lists', (request, response) => {
    if (request.body.nombre == null || request.body.nombre == "")
        response.status(400).send("no se nombro la nueva playlist")
    playlists.push(request.body)
    response.status(201).send("listo")
})

app.put('/lists/:nombre', (request, response) => {
    let nombre = request.params.nombre
    let lista = playlists.filter(x => x.nombre == nombre)[0]
    if (lista == null) {
        response.status(404).send("no se encuentra la lista")
        return
    }
    if (request.body.nombre != nombre)
        response.status(409).send("no se puede modificar el nombre de la lista")
    lista.descripcion = request.body.descripcion
    response.status(204).send(request.body)
})
app.delete('/lists/:nombre', (request, response) => {
    let nombre = request.params.nombre
    let lista = playlists.filter(x => x.nombre == nombre)[0]
    if (lista == null) {
        response.status(404).send("no se encuentra la lista")
        return
    }
    let indice = playlists.indexOf(lista)
    playlists.splice(indice, 1)
    response.status(201).send("listo")
})

app.get('/lists/:nombre/songs', (request, response) => {
    let nombre = request.params.nombre
    let lista = playlists.find(x => x.nombre == nombre)
    response.send(lista.canciones)
})

app.get('/lists/:nombre/songs/:titulo', (request, response) => {
    let nombre = request.params.nombre
    let titulo = request.params.titulo
    let lista = playlists.filter(x => x.nombre == nombre)[0]
    if (lista == null) {
        response.status(404).send("no se encuentra la lista")
        return
    }
    let cancion = lista.canciones.find(x => x.titulo == titulo)
    if (cancion == null) {
        response.status(404).send("no se encuentra la cancion")
        return
    }
    response.send(cancion)
})

app.post('/lists/:nombre/songs', (request, response) => {
    let nombre = request.params.nombre
    let lista = playlists.filter(x => x.nombre == nombre)[0]
    if (lista == null) {
        response.status(404).send("no se encuentra la lista")
        return
    }
    if (request.body.titulo == null || request.body.titulo == "")
        response.status(400).send("no se nombro la nueva cancion")
    lista.canciones.push(request.body)
    response.status(201).send("listo")
})

app.put('/lists/:nombre/songs/:titulo', (request, response) => {
    let nombre = request.params.nombre
    let titulo = request.params.titulo
    let lista = playlists.filter(x => x.nombre == nombre)[0]
    if (lista == null) {
        response.status(404).send("no se encuentra la lista")
        return
    }
    let cancion = lista.canciones.find(x => x.titulo == titulo)
    if (cancion == null) {
        response.status(404).send("no se encuentra la cancion")
        return
    }
    cancion.artista = request.body.artista
    cancion.album = request.body.album
    cancion.año = request.body.año
    response.status(204).send("listo")
})

app.delete('/lists/:nombre/songs/:titulo', (request, response) => {
    let nombre = request.params.nombre
    let titulo = request.params.titulo
    let lista = playlists.filter(x => x.nombre == nombre)[0]
    if (lista == null) {
        response.status(404).send("no se encuentra la lista")
        return
    }
    let cancion = lista.canciones.find(x => x.titulo == titulo)
    if (cancion == null) {
        response.status(404).send("no se encuentra la cancion")
        return
    }
    let indice = lista.canciones.indexOf(cancion)
    lista.canciones.splice(indice, 1)
    response.status(204).send("listo")
})
app.listen(port)