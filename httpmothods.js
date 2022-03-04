const headers = {
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'PATCH, POST, GET,OPTIONS,DELETE',
        'Content-Type': 'application/json'
}

const REQUESTMETHODS = {
    "get":"GET",
    "post":"POST",
    "delete":"DELETE",
    "patch":"PATCH",
}

module.exports = {
    headers, REQUESTMETHODS
}