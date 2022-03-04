

function errorHandle(res, status, message){
    const headers = {
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'PATCH, POST, GET,OPTIONS,DELETE',
        'Content-Type': 'application/json'
    }
    res.writeHead(status, headers)
    res.write(JSON.stringify({
        "success":"false",
        "message":message
    }))
    res.end()
}

module.exports = errorHandle