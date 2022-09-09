import {Router} from 'express'
import {leerPlaylists, leerPlaylist, añadirPlaylist, actualizarPlaylist, eliminarPlaylist, leerCanciones, leerCancion, añadirCancion, actualizarCancion, eliminarCancion} from '../controllers/playlist.controller'
const router = Router()
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

// Gets

router.get('/lists',leerPlaylists )

router.get('/lists/:nombre', leerPlaylist)

router.get('/lists/:nombre/songs', leerCanciones)

router.get('/lists/:nombre/songs/:titulo', leerCancion)

//POSTS

router.post('/lists', añadirPlaylist)

router.post('/lists/:nombre/songs', añadirCancion)

//PUTS

router.put('/lists/:nombre', actualizarPlaylist)

router.put('/lists/:nombre/songs/:titulo', actualizarCancion)

//DELETES

router.delete('/lists/:nombre', eliminarPlaylist)

router.delete('/lists/:nombre/songs/:titulo', eliminarCancion)

export default router