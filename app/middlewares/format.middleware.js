export default function (req, res, next) {
    //Middleware en charge du format et de l'existence de informations dans le corps de la requête
    const { id, password } = req.body;

    if(!(id || password)) {
        return next("Error");
    }
    if(isNaN(id)) {
        return next("Error");
    }
    if(password.length < 12) {
        return next("Error");
    }
    return next();
}