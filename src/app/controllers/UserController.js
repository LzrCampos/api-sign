const md5 = require('md5');

const userRepository = require('../repositories/UserRepository');
const authService = require('../services/authService');
const utils = require('../../utils');

class UserController {
    async store(req, res) {
        try {
            if (await userRepository.findByEmail(req.body.email)) {
                return res.status(409).json({ message: 'E-mail já existente' });
            }

            const user = await userRepository.create({
                name: req.body.nome,
                email: req.body.email,
                password: md5(req.body.senha + process.env.SECRET_KEY),
                phone: req.body.telefones,
                lastLogin: Date.now(),
            });

            const token = await authService.generateToken(user._id);

            await userRepository.saveToken(user._id, token);

            return res.status(201).json(user);
        } catch (error) {
            return res.status(500).json({ message: error });
        }
    }

    async get(req, res) {
        try {
            const hash = md5(req.body.senha + process.env.SECRET_KEY);
            const user = await userRepository.findByEmail(req.body.email);

            if (!user) {
                return res
                    .status(403)
                    .json({ message: 'Usuário e/ou senha inválidos' });
            }

            if (user.password !== hash) {
                return res
                    .status(401)
                    .json({ message: 'Usuário e/ou senha inválidos' });
            }

            await userRepository.updatedLastLogin(user._id);

            return res.status(200).json(user);
        } catch (error) {
            return res.status(500).json({ message: error });
        }
    }

    async find(req, res) {
        try {
            let token = req.headers['authentication'];
            token = token.slice(7, token.length);

            const { data: id } = await authService.decodeToken(token);

            const user = await userRepository.findById(id);

            if (!utils.sessionTimeout(user.lastLogin))
                return res.status(401).json({ message: 'Sessão inválida' });

            return res.status(200).json(user);
        } catch (error) {
            return res.status(500).json({ message: error });
        }
    }
}
module.exports = new UserController();
