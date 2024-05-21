const url = require('url');
const path = require('path');
const Mock = require('mockjs')
const responsePath = path.resolve(process.cwd(), 'mock/response');

function getMockData(tplPath, options) {
    const tpl = require(tplPath);
    if (typeof tpl === 'function') {
        return Mock.mock(tpl(options));
    }
    else if (typeof tpl === 'object') {
        return Mock.mock(tpl);
    }
    return {
        code: 1,
        message: 'mock文件需要是object或者function'
    };
}


const findMockFilePath = (pathname) => {
    if (pathname.indexOf('/mock') === 0) {
        pathname = pathname.slice(5);
    }
    const paths = pathname.split('/');
    const resDataPath = responsePath + '/' + paths[1] + '.js';
    return resDataPath;
}

const mockLocalData = (request, response) => {
    const parsedUrl = url.parse(request.url, true);
    const pathname = parsedUrl.pathname;
    const body = request.body;
    const query = parsedUrl.query;
    const options = {
        pathname, body, query
    };
    const mockfile = findMockFilePath(pathname);
    const data = getMockData(mockfile, options);
    response.json(data);
}

module.exports = mockLocalData;