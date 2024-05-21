module.exports = (options) => {
    console.log(options, 'opt');
    const {body} = options;
    const data = JSON.parse(body);
    const {name} = data;
    if(name === 'cwl') {
        return {
            "code": 0,
            "msg": "success",
            "data": {
                "review": "handsom"
            }
        }
    }else {
        return {
            "code": 0,
            "msg": "success",
            "data": {
                "review": "ugly"
            }
        }
    }
}