const http = require('http');
const fs= require('fs')


// 创建HTTP服务器
const server = http.createServer((req, res) => {
  // 检查请求路径是否为'/js'
  if (req.url.includes('.js')) {
    // 解析查询参数中的延迟时间
    const delay = parseInt(req.url.split('?')[1].split('=')[1], 10) || 0;
    const fileName = req.url.split('.js')[0]
    
    // 设置响应头
    res.writeHead(200, {
      'Content-Type': 'application/javascript',
      'Access-Control-Allow-Origin': '*',
    });

    // 延迟响应
    setTimeout(() => {
      const content = fs.readFileSync(__dirname +  fileName + '.js')
      res.end(content);
    }, delay);
  } else {
    // 如果请求的不是'/js'路径，返回404
    res.writeHead(404);
    res.end('Not Found');
  }
});

// 服务器监听3000端口
server.listen(3000, () => {
  console.log('服务器运行在 http://localhost:3000/');
});