async function find() {
    return fetch('https://ariel-back.vercel.app./api/trabajos')
        .then(response => {
            if (response.ok) {
                return response.json()
            }
            else {
                throw new Error('No se pudo obtener las trabajos')
            }
        })
}

async function findDestacadas() {
    return fetch('http://localhost:2022/api/trabajos?destacada=true')
        .then(response => {
            if (response.ok) {
                return response.json()
            }
            else {
                throw new Error('No se pudo obtener las trabajos')
            }
        })
}

async function findById(id) {
    return fetch(`http://localhost:2022/api/trabajos/${id}`)
        .then(response => {
            if (response.ok) {
                return response.json()
            }
            else {
                throw new Error('No se pudo obtener las trabajos')
            }
        })
}

async function create(pelicula) {
    return fetch('http://localhost:2022/api/trabajos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token')
        },
        body: JSON.stringify(pelicula)
    })
        .then(response => response.json())
}

async function edit(id, pelicula) {
    return fetch(`http://localhost:2022/api/trabajos/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token')
        },
        body: JSON.stringify(pelicula)
    })
        .then(response => response.json())
}

async function eliminar(id) {
    return fetch(`http://localhost:2022/api/trabajos/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token')
        },
    })
        .then(response => response.json())
}

export {
    find,
    findById,
    findDestacadas,
    create,
    edit,
    eliminar
}