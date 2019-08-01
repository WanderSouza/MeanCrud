const auth = require('basic-auth')

const admin = { 'mean': { password: '1234' } }; //base64 = bWVhbjoxMjM0

//All the server routes are using this basic HTTP Authentication
export default function (request, response, next) {
    var user = auth(request)
    if (!user || !admin[user.name] || admin[user.name].password !== user.pass) {
        response.set('WWW-Authenticate', 'Basic realm="mean"')
        return response.status(401).send()
    }
    return next();
}