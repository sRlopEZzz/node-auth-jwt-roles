export function authorizeRoles(...allowedRoles) {
    return(req, res, next)=> {

        //verefica se o user existe
        if(!req.user || !req.user.tipo_usuario){
            return req.status(401).json({error: "utilizador nao autenticado"})
        }
        //verefica se o role esta permitido para entrar na rota
        if(!allowedRoles.includes(req.user.tipo_usuario)){
            return res.status(403).json({error: "acesso negado"})

    }
next();
    };
}