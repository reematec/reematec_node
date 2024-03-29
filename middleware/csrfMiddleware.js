const Tokens = require('csrf')

const verifyCSRF = (req, res, next) => {
    if (req.method === 'POST') {
        const tokens = new Tokens();
        // // const secret = tokens.secretSync();
        // // const token = tokens.create(secret);
        const tokenVerification = tokens.verify(process.env.CSRF_TOKEN, req.body._csrfToken)
        console.log('verifyCSRF: ' + tokenVerification);
            
        if (!tokenVerification) {
            res.status(403);
            return res.render('403', {layout: 'layouts/main.ejs', title: "Reema - 403 error occoured", description: "validation error occoured"})
        }
    }
    return next()
}

const getCSRF = () => {
    const tokens = new Tokens();
    // const secret = tokens.secretSync();
    const token = tokens.create(process.env.CSRF_TOKEN);
    console.log('getCSRF: '+ token);    
    return token;
}
// function getCSRF() {
//     const tokens = new Tokens();
//     // const secret = tokens.secretSync();
//     const token = tokens.create(process.env.CSRF_TOKEN);
//     console.log('original token: '+ token);    
//     return token;
// }

module.exports = {getCSRF, verifyCSRF}