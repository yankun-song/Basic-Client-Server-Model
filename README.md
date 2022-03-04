# Creating a basic client-server model using Node.js
## 1. Client Part
### Template
```js
    const xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function (req, res) {
      if (xmlHttp.readyState === 4) {
        console.log(xmlHttp.responseText); // print the text of the response given by server
      }
    };
    
    hiButton.onclick = function () {
      xmlHttp.open("POST", "/sayHi", true);
      xmlHttp.setRequestHeader("Content-type", "text");
      xmlHttp.send("hi"); 
```


## 2. Server Part
### Template
```js
const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((request, response)=>{
    if (request.method == 'GET' && request.url === '/'){
        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.write(fs.readFileSync(__dirname + '/index.txt'));
        response.end();
    }
    else if (request.method == 'POST' && request.url === 'greeting'){
        let body = '';
        request.on('data', chunk => {
            console.log(`Received data chunk: ${chunk}`);
            body += chunk;
        });
        request.on('end', () => {
            fs.appendFileSync('./hi_log.txt', `${body}\n`);
            respond.end('good morning');
        })
    }
    else{
        response.writeHead(404);
        return response.end('Error: not found');
    }
}).listen(3000, () => console.log('listening on 3000'));
```

### Logic
1. We create a server by invoking the _http.createServer(cb)_ method;
2. The callback function we pass is usually an anonymous function, which has 2 parameters, _request_ and _response_.
3. Inside the callback function, we will check the _request.method_ and _request.url_ and use them as conditions for the _if_ statement.
4. In each case, we can do 
- _response.writeHead(200, {'Content-Type': 'text/plain/html/css'})_
- _response.write()_
- _response.end()_
Contents of response can be put in _.write()_ and _.end()_, while _.end()_ marks the end of the response, you can't add more after that.
5. For a POST request, we usually do something like this:
```js
      let body = [];
      request.on("data", (chunk) => {
        body.push(chunk);
      });
      request.on("end", () => {
        body = Buffer.concat(body).toString();
        fs.appendFileSync("hi_log.txt", body + "\n");
        response.end()
```



### Some tricks
show current node directry
```js
console.log(process.cwd());
```
