const url = require('url');
const mockLocalData = require('./mockLocalData');

const proxyToLocal = (request, response) => {
    const parsedUrl = url.parse(request.url, true);
    request.query = parsedUrl.query;
    const data = [];
    request.on('data', trunk => {
        data.push(trunk && trunk.toString());
    });
    request.on('end', trunk => {
        if (trunk) {
            data.push(trunk.toString());
        }
        request.body = data.join('');
        mockLocalData(request, response);
    });
}


const mockServiceMiddleware = () => {
    return (request,response,next) => {
        const parsedUrl = url.parse(request.url, true);
        const pathname = parsedUrl.pathname;
        if (/^\/mock/.test(pathname)) {
            return proxyToLocal(request, response);
        }
        next();
    }
}

module.exports = mockServiceMiddleware;