const http = require('http')
const { v4: uuidv4 } = require('uuid')
const errorHandle = require('./errorhandle.js')
const todos = []

const requestListener = (req, res) => {
    const headers = {
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'PATCH, POST, GET,OPTIONS,DELETE',
        'Content-Type': 'application/json'
    }
    let body=''
    req.on('data', (chunk)=>{
        body += chunk
    })
    
    if(req.url === '/todos' && req.method === 'GET'){
        res.writeHead(200, headers)
        res.write(JSON.stringify({
            "success":"true",
            "data":todos
        }))
        res.end()
    }else if(req.url === '/todos' && req.method === 'POST'){
        req.on('end', ()=>{
            try{
                const title = JSON.parse(body).title
                if( title !== undefined ){
                    const todo = {
                        "title":title,
                        "id":uuidv4()
                    }
                    todos.push(todo)
                    res.writeHead(200, headers)
                    res.write(JSON.stringify({
                        "success":"true",
                        "data":todos
                    }))
                    res.end()
                }else{
                    errorHandle(res, 400, '缺少 title 欄位')
                }
            }catch{
                errorHandle(res, 400, '請確認格式')
            }
        })
    }else if(req.url === '/todos' && req.method === 'DELETE'){
        todos.length = 0;
        res.writeHead(200, headers)
        res.write(JSON.stringify({
            "success":"true",
            "data":todos
        }))
        res.end()
    }else if(req.url.startsWith('/todos/') && req.method === 'DELETE'){
        const id = req.url.split('/').pop()
        const index = todos.findIndex(el=> el.id == id)
        if(index!==-1){
            todos.splice(index, 1)
            res.writeHead(200, headers)
            res.write(JSON.stringify({
                "success":"true",
                "data":todos
            }))
            res.end()
        }else{
            errorHandle(res, 400, '請確認todo id')
        }
    }else if(req.url.startsWith('/todos/') && req.method === 'PATCH'){
        req.on('end', ()=>{
            try{
                const id = req.url.split('/').pop()
                const index = todos.findIndex(el=>el.id == id)
                const title = JSON.parse(body).title
                if(index!==-1&&title!==undefined){
                    todos[index].title = title
                    res.writeHead(200, headers)
                    res.write(JSON.stringify({
                        "success":"true",
                        "data":todos
                    }))
                    res.end()
                }else{
                    errorHandle(res, 400, '請確認todo id')
                }
            }catch{
                errorHandle(res, 400, '請確認格式')
            }
        })
    }else{
        errorHandle(res, 404, 'not found 404')
    }
}
const server = http.createServer(requestListener)
server.listen(process.env.PORT || 3005)