const jwt = require('jsonwebtoken');

class AuthService {
    async generateToken(data) {
        return jwt.sign({ data: data }, process.env.SECRET_KEY);
    }

    async decodeToken(token) {
        return jwt.verify(token, process.env.SECRET_KEY);
    }

    authorize(req, res, next) {
        let token = req.headers['authentication'];

        if (token.startsWith('Bearer ')) {
            token = token.slice(7, token.length);
        }

        if (!token) {
            res.status(401).json({
                message: 'Não autoruzado',
            });
        } else {
            jwt.verify(token, process.env.SECRET_KEY, function(error) {
                if (error) {
                    res.status(401).json({
                        message: 'Token Inválido',
                    });
                } else {
                    next();
                }
            });
        }
    }
}

module.exports = new AuthService();
