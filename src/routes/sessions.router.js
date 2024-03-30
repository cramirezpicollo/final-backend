import { Router, application } from "express";
import { UserModel } from "../models/user.model.js";

const sessionsRouter = Router()

sessionsRouter.post("/", async (req, res) => {
    const { first_name, last_name, email, password, age } = req.body;

    try {
        const usuarioExistente = await UserModel.findOne({ email: email });
        if (usuarioExistente) {
            return res.status(400).send(" correo electronico registrado");
        }

        const nuevoUsuario = await UserModel.create({ first_name, last_name, email, password, age });

        req.session.login = true;
        req.session.user = { ...nuevoUsuario._doc }

        res.redirect("/profile");

    } catch (error) {
        res.status(500).send("Error interno del servidor")
    }
})

sessionsRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const usuario = await UserModel.findOne({ email: email });
        if (usuario) {
            if (usuario.password === password && usuario.email !== "adminCoder@coder.com") {
                req.session.login = true;
                req.session.user = {
                    email: usuario.email,
                    age: usuario.age,
                    first_name: usuario.first_name,
                    last_name: usuario.last_name
                }
                res.redirect("/products");

                if (usuario.email === "adminCoder@coder.com" && usuario.password === "adminCod3r123") {
                    req.session.login = true;
                    req.session.admin = true;
                    res.send("sos admin")

                    function auth(req, res, next) {
                        if (req.session.admin === true) {
                            return next();
                        }
                        return res.status(403).send("error de autorización")
                    }

                    sessionsRouter.get("/privado", auth, (req, res) => {
                        res.send("si llegaste hasta acá es porque sos el admin")
                    })
                }

            } else {
                res.status(401).send("contraseña inválida");
            }

        } else {
            res.status(404).send("usuario no encontrado");
        }

    } catch (error) {
        res.status(500).send("error interno del servidor")

    }
})

sessionsRouter.get("/logout", (req, res) => {
    if (req.session.login) {
        req.session.destroy();

    }

    res.redirect("/login");

})


export { sessionsRouter }