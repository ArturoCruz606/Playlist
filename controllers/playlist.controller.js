import { request, response } from 'express'
import Playlist from '../models/playlist.model'

export const leerPlaylists = async (request, response) => {
    try {
        const lista = await Playlist.find()
        response.send(lista)
    } catch (err) {
        console.log(err)
        response.status(500).send(err)
    }
}

export const leerPlaylist = async (request, response) => {
    try {
        let nombrePlaylist = request.params.nombre
        const lista = await Playlist.findOne({ nombre: nombrePlaylist })
        response.send(lista)
    } catch (err) {
        console.log(err)
        response.status(500).send(err)
    }
}

export const añadirPlaylist = async (request, response) => {
    try {
        const playlist = request.body
        await Playlist.create(playlist)
        response.status(201).send(playlist)
    } catch (err) {
        console.log(err)
        response.status(500).send(err)
    }
}

export const actualizarPlaylist = async (request, response) => {
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
}

export const eliminarPlaylist = async (request, response) => {
    try {
        let nombrePlaylist = request.params.nombre
        await Playlist.findOneAndRemove( {nombre: nombrePlaylist} )
        response.status(204).send()
    } catch (err) {
        console.log(err)
        response.status(500).send(err)
    }
}

export const leerCanciones = async (request, response) => {
    try {
        let nombrePlaylist = request.params.nombre
        const lista = await Playlist.findOne( {nombre: nombrePlaylist} )
        response.send(lista.canciones)
    } catch (err) {
        console.log(err)
        response.status(500).send(err)
    }
}

export const leerCancion = async (request, response) => {
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
}

export const añadirCancion = async (request, response) => {
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
}

export const actualizarCancion = async (request, response) => {
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
}

export const eliminarCancion = async (request, response) => {
    let nombrePlaylist = request.params.nombre
        let tituloCancion = request.params.titulo
        const lista = await Playlist.findOne( {nombre: nombrePlaylist} )
        const cancion = lista.canciones.find(x => x.titulo == tituloCancion)
        let indice = lista.canciones.indexOf(cancion)
        lista.canciones.splice(indice, 1)
        await Playlist.findOneAndUpdate( {nombre: nombrePlaylist}, lista )
        const listaResponse = await Playlist.findOne( {nombre: nombrePlaylist} )
        response.status(204).send(listaResponse)
}