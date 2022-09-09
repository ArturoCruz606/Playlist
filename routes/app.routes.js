import express from 'express'
const router = express.Router()
import Playlist from '../models/playlist.model'
// let Playlist = [
    // {
    //     "nombre": "lol",
    //     "descripcion": "a",
    //     "canciones": [
    //         {
    //             "titulo": "veil",
    //             "artista": "no se",
    //             "album": "nu se",
    //             "año": 2019
    //         },
    //         {
    //             "titulo": "nose",
    //             "artista": "no se",
    //             "album": "nu se",
    //             "año": 2000
    //         }
    //     ]
    // },
    // {
    //     "nombre": "ligoleyen",
    //     "descripcion": "aeiou",
    //     "canciones": [
    //         {
    //             "titulo": "esetera",
    //             "artista": "no se",
    //             "album": "nu se",
    //             "año": 2019
    //         },
    //         {
    //             "titulo": "a",
    //             "artista": "no se",
    //             "album": "nu se",
    //             "año": 2000
    //         }
    //     ]
    // }
// ]

router.get('/lists', async (request, response) => {
    try {
        const lista = await Playlist.find()
        response.send(lista)
    } catch (err) {
        console.log(err)
        response.status(500).send(err)
    }
})

router.get('/lists/:nombre', async (request, response) => {
    try {
        let nombrePlaylist = request.params.nombre
        const lista = await Playlist.findOne({ nombre: nombrePlaylist })
        response.send(lista)
    } catch (err) {
        console.log(err)
        response.status(500).send(err)
    }
})

router.post('/lists', async (request, response) => {
    try {
        const playlist = request.body
        await Playlist.create(playlist)
        response.status(201).send(playlist)
    } catch (err) {
        console.log(err)
        response.status(500).send(err)
    }
})

router.put('/lists/:nombre', async (request, response) => {
    try {
        let nombrePlaylist = request.params.nombre
        let lista = request.body
        await Playlist.findOneAndUpdate({ nombre: nombrePlaylist }, lista)
        const listaResponse = await Playlist.findOne({ nombre: nombrePlaylist })
        response.send(listaResponse)
    } catch (err) {
        console.log(err)
        response.status(500).send(err)
    }
})
router.delete('/lists/:nombre', async (request, response) => {
    try {
        let nombrePlaylist = request.params.nombre
        await Playlist.findOneAndRemove( {nombre: nombrePlaylist} )
        response.status(204).send()
    } catch (err) {
        console.log(err)
        response.status(500).send(err)
    }
})

router.get('/lists/:nombre/songs', async (request, response) => {
    try {
        let nombrePlaylist = request.params.nombre
        const lista = await Playlist.findOne( {nombre: nombrePlaylist} )
        response.send(lista.canciones)
    } catch (err) {
        console.log(err)
        response.status(500).send(err)
    }
})

router.get('/lists/:nombre/songs/:titulo', async (request, response) => {
    try {
        let nombrePlaylist = request.params.nombre
        let tituloCancion = request.params.titulo
        const lista = await Playlist.findOne( {nombre: nombrePlaylist} )
        const cancion = lista.canciones.find(x => x.titulo == tituloCancion)
        response.send(cancion)
    } catch (err) {
        console.log(err)
        response.status(500).send(err)
    }
})

router.post('/lists/:nombre/songs', async (request, response) => {
    try {
        let nombrePlaylist = request.params.nombre
        let cancion = request.body
        const lista = await Playlist.findOne( {nombre: nombrePlaylist} )
        lista.canciones.push(cancion)
        await Playlist.findOneAndUpdate({nombre: nombrePlaylist}, lista)
        response.status(201).send(lista)
    } catch (err) {
        console.log(err)
        response.status(500).send(err)
    }
})

router.put('/lists/:nombre/songs/:titulo', async (request, response) => {
    try{
        let nombrePlaylist = request.params.nombre
        let tituloCancion = request.params.titulo
        let cancionUpdate = request.body
        const lista = await Playlist.findOne( {nombre: nombrePlaylist} )
        const cancion = lista.canciones.find(x => x.titulo == tituloCancion)
        cancion.titulo = cancionUpdate.titulo
        cancion.artista = cancionUpdate.artista
        cancion.album = cancionUpdate.album
        cancion.año = cancionUpdate.año
        await Playlist.findOneAndUpdate( {nombre: nombrePlaylist}, lista )
        const listaResponse = await Playlist.findOne( {nombre: nombrePlaylist} )
        response.status(204).send(listaResponse)
    }catch (err) {
        console.log(err)
        response.status(500).send(err)
    }
})

router.delete('/lists/:nombre/songs/:titulo', async (request, response) => {
        let nombrePlaylist = request.params.nombre
        let tituloCancion = request.params.titulo
        const lista = await Playlist.findOne( {nombre: nombrePlaylist} )
        const cancion = lista.canciones.find(x => x.titulo == tituloCancion)
        let indice = lista.canciones.indexOf(cancion)
        lista.canciones.splice(indice, 1)
        await Playlist.findOneAndUpdate( {nombre: nombrePlaylist}, lista )
        const listaResponse = await Playlist.findOne( {nombre: nombrePlaylist} )
        response.status(204).send(listaResponse)
})

export default router