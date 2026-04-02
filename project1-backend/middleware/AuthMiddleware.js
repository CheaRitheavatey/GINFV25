const jwt = require('jsonwebtoken')
const protect = (req, res, next) => {
    // get token from authorization header
    const token = req.header('Authorization')?.replace('Bearer','')

    if (!token) {
        return res.status(404).json({
            sucess: false,
            message: 'no token found, or auth denied'
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded // add user id to the request
        next()

    }catch (e) {
        console.error(e)
        res.status(401).json({
            success: false,
            message: 'token not valid'
        })
    }
}

module.exports = protect