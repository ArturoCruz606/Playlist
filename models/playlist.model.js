import mongoose from "mongoose"

const playListSchema = new mongoose.Schema({
    "nombre": {
        type: String,
        required: true
    },
    "descripcion":{
        type: String,
        required: false
    },
    "canciones": {
        type: Array,
        require: false
    }
},
    {
        timestamps: true,
        versionKey: false
    }
)

const Playlist = mongoose.model('Playlist', playListSchema)

export default Playlist