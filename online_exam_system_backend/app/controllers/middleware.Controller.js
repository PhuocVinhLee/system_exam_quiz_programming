const ApiError = require("../api-error");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const MongoDB = require("../utils/mongodb.util")

exports.verifyToken = async (req, res, next) => {
    const accessToken = await req.cookies['jwt'];
    console.log(accessToken)
    if (accessToken) {
        // const accessToken = token
        jwt.verify(accessToken, "secret", (err, user) => {// token het han hoac token khong hop le
            if (err) {
                return next(
                    new ApiError(403, "Token is not valid")// token k hop le
                );
            }
            else {
                req.user = user;
                next();
            }
        });
    }
    else {
        return next(
            new ApiError(401, "You are not authentication")
        );
    }

};

exports.verifyTokenAndUserAuth = async (req, res, next) => {
    this.verifyToken(req, res, () => {
        try {
            // if (req.user._id == req.body.id || req.user.manager) {
            //     console.log("aslknlnc")
            //     next();
            // }
            if(req.user._id || req.user.manager){
                next();
            }
            else {
                return next(
                    new ApiError(401, "Bạn không có quyền truy cập vào tài ngyên này !")
                );
            }
        } catch (error) {
            return next(
                new ApiError(403, "Token da get han")
            );
        }
    })
};
exports.findUser = async (req, res, next) => {
    try {

        const userService = new UserService(MongoDB.client);

        const email = req.body.email;


        const password = req.body.password;
        console.log(password);
        if (!email || !password) {
            return next(new ApiError(404, "Email và Password không được rỗng"));
        }
        const documents = await userService.findByEmail(email);
        const validPassword = await bcrypt.compare(password, documents.password);
        if (!documents) {
            return res.json({ message: "User khong ton tai" });
        } else if (!validPassword) {
            return res.json({ message: "Mat khau khong chinh xac" });
        } else {
            const token = jwt.sign({ _id: documents._id }, "secret", { expiresIn: "2d" });
            res.cookie('jwt', token, { httpOnly: true, maxAge: 100 * 60 * 60 * 1000 })

            const { password, ...others } = documents;// loai bo truong password

            return res.json({ token, ...others });
        }
    } catch (error) {
        return next(new ApiError(500, "An erro occurred while retrieving user"));
    }
};

exports.cookie = async (req, res, next) => {
    try {
        const userService = new UserService(MongoDB.client);
        const cookie = await req.cookies['jwt'];
        const clains = jwt.verify(cookie, 'secret');
        if (!clains) {
            return next(new ApiError(400, "An erro occurred while retrieving clains"));
        }
        console.log(clains._id);
        const user = await userService.findById(clains._id);
        console.log(clains._id);
        return res.send(user);

    } catch (error) {
        return next(new ApiError(500, "An erro occurred while retrieving cookie"));
    }

};

exports.logout = async (req, res, next) => {
    try {
        const logout = await res.cookie('jwt', { maxAge: 0 });

        return res.send("susecfully");

    } catch (error) {
        return next(new ApiError(500, "An erro occurred while logout user"));
    }

};

exports.findEmail = async (req, res, next) => {
    let documents = [];
    try {
        const userService = new UserService(MongoDB.client);

        const email = req.body.email;
        console.log(email);
        documents = await userService.findByEmail(email);
        console.log(documents);
        if (!documents) {
            return next(new ApiError(400, "user not found"));
        }
    } catch (error) {
        return next(new ApiError(500, "An erro occurred while retrieving user"));
    }

    return res.send(documents);
};
