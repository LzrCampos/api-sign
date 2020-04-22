const UserSchema = require('../schemas/UserSchema');

class UserRepository {
    create(data) {
        const user = new UserSchema(data);
        return user.save();
    }

    findById(id) {
        return UserSchema.findById(id);
    }

    findByEmail(email) {
        return UserSchema.findOne({
            email: { $eq: email },
        });
    }

    saveToken(id, token) {
        return UserSchema.findByIdAndUpdate({ _id: id }, { token: token });
    }

    updatedLastLogin(id) {
        return UserSchema.findOneAndUpdate(
            { _id: id },
            { lastLogin: Date.now() }
        );
    }
}

module.exports = new UserRepository();
