import { useState, useEffect } from "react"
import {useParams} from 'react-router-dom'
import * as trabajosServices from "../services/trabajos.services"

function DetalleTrabajo(){
    const {id} = useParams()
    const [trabajo, setTrabajo] = useState({})

    useEffect(()=>{
        trabajosServices.findById(id)
        .then(data => {
            setTrabajo(data)
        })
    }, [id])

    return <div className="detalle-contenedor">
            <h2>{trabajo.nombre}</h2>
            <p>Fecha: {trabajo.fecha}</p>
            </div>
}

export default DetalleTrabajo