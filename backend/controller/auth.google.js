const session = require('express-session');
const config = require('../config');
const jwt = require('jsonwebtoken');

const { googleAuthenticate } = require('../middleware/auth.middleware');
const { authenticate } = require('passport');

const routsInit = async (app, passport) => {



    app.get('/auth/google',
        passport.authenticate('google', { scope: ['profile', 'email'] }));

    app.get('/auth/google/callback', passport.authenticate('google', {
        failureRedirect: '/login'
    }),
        function (req, res) {

            const user = req.user;

            const token = jwt.sign({ userId: user._id }, config.secretKey);
            const role = user.role

            console.log(token, role)



            res.send(`<script>
                     window.opener.postMessage({ token: '${token}', role: '${role}' }, 'http://localhost:3000');
                     window.close();
                    </script>`);


            console.log("User Authanticated")
        });

    app.get('/api/is-authenticated', googleAuthenticate, (req, res) => {

        const user = req.user;
        const token = jwt.sign({ userId: user._id }, config.secretKey);
        const role = user.role;

        res.json({ token, role });
    });

}
module.exports = {
    routsInit
};
