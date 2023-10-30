const checkToken = (req, res, next) => {
    
    console.log('Pass middleware')

    next();
}

module.exports = { checkToken }