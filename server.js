const http = require('http')
const { v4: uuidv4 } = require('uuid')
const {errorHandle, successHandle} = require('./responsehandle.js')
const { REQUESTMETHODS } = require('./httpmothods.js')
const todos = []

const requestListener = (req, res) => {
    let body=''
    req.on('data', (chunk)=>{
        body += chunk
    })
    
    if(req.url === '/todos' && req.method === REQUESTMETHODS.get){
        successHandle(res, todos)
    }else if(req.url === '/todos' && req.method === REQUESTMETHODS.post){
        req.on('end', ()=>{
            try{
                const title = JSON.parse(body).title
                if( title !== undefined ){
                    const todo = {
                        "title":title,
                        "id":uuidv4()
                    }
                    todos.push(todo)
                    successHandle(res, todos)
                }else{
                    errorHandle(res, 400, '缺少 title 欄位')
                }
            }catch{
                errorHandle(res, 400, '請確認格式')
            }
        })
    }else if(req.url === '/todos' && req.method === REQUESTMETHODS.delete){
        todos.length = 0;
        successHandle(res, todos)
    }else if(req.url.startsWith('/todos/') && req.method === REQUESTMETHODS.delete){
        const id = req.url.split('/').pop()
        const index = todos.findIndex(el=> el.id == id)
        if(index!==-1){
            todos.splice(index, 1)
            successHandle(res, todos)
        }else{
            errorHandle(res, 400, '請確認todo id')
        }
    }else if(req.url.startsWith('/todos/') && req.method === REQUESTMETHODS.patch){
        req.on('end', ()=>{
            try{
                const id = req.url.split('/').pop()
                const index = todos.findIndex(el=>el.id == id)
                const title = JSON.parse(body).title
                if(index!==-1&&title!==undefined){
                    todos[index].title = title
                    successHandle(res, todos)
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