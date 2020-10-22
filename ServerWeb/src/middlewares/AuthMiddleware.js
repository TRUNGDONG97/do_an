import AdminModel from '../models/AdminModel'

const requireAuth = async(req, res, next) => {
    console.log(req.signedCookies.username)
    console.log(req.signedCookies.token)
    var token = req.signedCookies.token
    var user_name = req.signedCookies.username
    
    if (!token) {
        res.redirect('/admin/login');
        return;
    }
    try {
        let tokens = await AdminModel.findAll({
            where: {
                token,
                username:user_name
            }
        })
        if (tokens.length < 0) {
            res.redirect('/admin/login');
            return;
        }
    } catch (error) {
        // console.log(error)
        res.redirect('/admin/login');
        return
    }
    next();
}

export default {
    requireAuth: requireAuth
}