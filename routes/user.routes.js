const { Router } = require("express")
const { check } = require("express-validator")

const { validarFields, validateJWT, validateRoleAdmin, hasRole } = require("../middlewares")

const { isRoleValid, isEmail, isUserId } = require("../helpers/db_validators")
const { getUser, putUser, postUser, deleteUser } = require("../controllers/user.controller")

const router = Router()

router.get("/", getUser)

router.post("/", [
    check("name", "El nombre es obligatorio!").not().isEmpty(),
    check("password", "El password debe tener más de 6 letras!").isLength({min:6}),
    check("email", "El correo no es válido!").isEmail(),
    check("email").custom( isEmail ),

    // check("role", "No es un rol permitido!").isIn(["ADMIN", "USER"]),
    check("role").custom( isRoleValid ),
    validarFields
], postUser)

router.put("/:id", [
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom( isUserId ),
    check("role").custom( isRoleValid ),
    validarFields
], putUser)

router.delete("/:id", [
    validateJWT,
    // validateRoleAdmin,
    hasRole("ADMIN", "SALES"),
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom( isUserId ),
    validarFields
], deleteUser)

module.exports = router