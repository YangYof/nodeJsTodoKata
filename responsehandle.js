const { headers } = require('./httpmothods.js')

function successHandle(res, todos){
    res.writeHead(200, headers)
    res.write(JSON.stringify({
        "success":"true",
        "data":todos
    }))
    res.end()
};

function errorHandle(res, state, message){
    res.writeHead(state, headers)
    res.write(JSON.stringify({
        "success":"false",
        "message":message
    }));
    res.end();
};

module.exports = {
    successHandle, errorHandle
};