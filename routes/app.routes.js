import express from 'express'
const router = express.Router()
import Playlist from '../models/palylist.model'
// let Playlist = [
//     {
//         "nombre": "lol",
//         "descripcion": "a",
//         "canciones": [
//             {
//                 "titulo": "veil",
//                 "artista": "no se",
//                 "album": "nu se",
//                 "año": 2019
//             },
//             {
//                 "titulo": "nose",
//                 "artista": "no se",
//                 "album": "nu se",
//                 "año": 2000
//             }
//         ]
//     },
//     {
//         "nombre": "ligoleyen",
//         "descripcion": "aeiou",
//         "canciones": [
//             {
//                 "titulo": "esetera",
//                 "artista": "no se",
//                 "album": "nu se",
//                 "año": 2019
//             },
//             {
//                 "titulo": "a",
//                 "artista": "no se",
//                 "album": "nu se",
//                 "año": 2000
//             }
//         ]
//     }
// ]

router.get('/lists', async (request, response) => {
    try {
        const lista = await Playlist.find()
        response.send(lista)
    } catch (err) {
        response.status(500).send(err)
    }
})

router.get('/lists/:nombre', async (request, response) => {
    try {
        let nombrePlaylist = request.params.nombre
        const lista = await Playlist.findOne({ nombre: nombrePlaylist })
        response.send(lista)
    } catch (err) {
        response.status(500).send(err)
    }
})

router.post('/lists', async (request, response) => {
    try {
        let nombre = request.body
        await Playlist.create(nombre)
        response.status(201).send(nombre)
    } catch (err) {
        response.status(500).send(err)
    }
})

router.put('/lists/:nombre', async (request, response) => {
    try {
        let nombrePlaylist = request.params.nombre
        let lista = request.body
        await Playlist.findByIdAndUpdate({ nombre: nombrePlaylist }, lista)
        const listaResponse = await Playlist.findOne({ nombre: nombrePlaylist })
        response.send(listaResponse)
    } catch (err) {
        response.status(500).send(err)
    }
})
router.delete('/lists/:nombre', async (request, response) => {
    try {
        let nombrePlaylist = request.params.nombre
        await Playlist.findOneAndRemove( {nombre: nombrePlaylist} )
        response.status(204).send()
    } catch (err) {
        response.status(500).send(err)
    }
})

router.get('/lists/:nombre/songs', async (request, response) => {
    try {
        let nombre = request.params.nombre
        const lista = Playlist.findOne(x => x.nombre == nombre)
        response.send(lista.canciones)
    } catch (err) {
        response.status(500).send(err)
    }
})

router.get('/lists/:nombre/songs/:titulo', async (request, response) => {
    try {
        let nombrePlaylist = request.params.nombre
        let tituloCancion = request.params.titulo
        const lista = await Playlist.findOne( {nombre: nombrePlaylist} )
        const cancion = await lista.findOne( {titulo: tituloCancion} )
        response.send(cancion)
    } catch (err) {
        response.status(500).send(err)
    }
})

router.post('/lists/:nombre/songs', async (request, response) => {
    try {
        let nombrePlaylist = request.params.nombre
        let cancion = request.body
        const lista = await Playlist.findOne( {nombre: nombrePlaylist} )
        await lista.canciones.create(cancion)
        response.status(201).send(cancion)
    } catch (err) {
        response.status(500).send(err)
    }
})

router.put('/lists/:nombre/songs/:titulo', (request, response) => {
    let nombre = request.params.nombre
    let titulo = request.params.titulo
    let lista = Playlist.filter(x => x.nombre == nombre)[0]
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

router.delete('/lists/:nombre/songs/:titulo', (request, response) => {
    let nombre = request.params.nombre
    let titulo = request.params.titulo
    let lista = Playlist.filter(x => x.nombre == nombre)[0]
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

export default router