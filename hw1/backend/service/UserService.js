import bcrypt from "bcrypt";
import {findUser, saveUser} from "../state.mjs";
import {User} from "../models/User.mjs";

const SALT_ROUNDS = 10;

export class UserService {

    createUser(login, password) {
        return new Promise((resolve, reject) => {
            if (findUser(login)) {
                return reject('Login is already in use')
            }

            bcrypt.hash(password, SALT_ROUNDS, (err, hash) => {
                if (err) {
                    return reject(err);
                }
                const user = new User(login, hash)
                saveUser(user)
                resolve(user.show());
            })
        })
    }

    checkPassword(login, candidatePassword) {
        return new Promise((resolve, reject) => {
            const user = findUser(login);
            if (!user) {
                return reject('No such user')
            }

            bcrypt.compare(candidatePassword, user.password, (err, isMatch) => {
                if (err) {
                    return reject(err);
                }
                if (!isMatch) {
                    return reject('Invalid password')
                }
                resolve(user.show());
            });
        })
    }
}