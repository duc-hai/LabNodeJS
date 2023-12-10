async function getUsers (page) {
    let url = `${process.env.GOREST_BASE_URL}/public-api/users?page=${page}`
    let resp = await fetch (url, {
        method: "GET",
    })
    let data = await resp.json()
    // console.log(data)
    return data
}

async function addUser (userData) {
    // console.log(userData)
    let url = `${process.env.GOREST_BASE_URL}/public-api/users`
    let resp = await fetch (url, {
        method: "POST",
        headers: {
            'Authorization' : `Bearer ${process.env.TOKEN}`,
            'Content-Type' : 'application/json',
        },
        body: JSON.stringify(userData)
    })
    let data = await resp.json()
    // console.log(data)
    return data
}

async function detailUser (id) {
    // console.log(id)
    let url = `${process.env.GOREST_BASE_URL}/public-api/users/${id}`
    let resp = await fetch (url, {
        method: "GET",
        
    })
    let data = await resp.json()
    // console.log(data)
    return data
}

async function deleteUser (id) {
    let url = `${process.env.GOREST_BASE_URL}/public-api/users/${id}`
    let resp = await fetch (url, {
        method: "DELETE",
        headers: {
            'Authorization' : `Bearer ${process.env.TOKEN}`,
        },
        body: id
    })
    let data = await resp.json()
    return data
}

async function updateUser (id, data) {
    let url = `${process.env.GOREST_BASE_URL}/public-api/users/${id}`
    let resp = await fetch (url, {
        method: "PUT",
        headers: {
            'Authorization' : `Bearer ${process.env.TOKEN}`,
            'Content-Type' : 'application/json',
        },
        body: JSON.stringify(data)
    })
    let rel = await resp.json()
    return rel
}

module.exports = {getUsers, addUser, detailUser, deleteUser, updateUser}