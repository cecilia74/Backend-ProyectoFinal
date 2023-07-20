import { express } from 'express';

export const sessionsRouter = express.Router();

sessionsRouter.get('/session', (req, res) => {
    if (req.session.cont) {
        req.session.cont++;
        res.send('nos visitaste ' + req.session.cont);
    } else {
        req.session.cont = 1;
        req.session.name = "guille";
        req.session.lastsearch = "medidor";
        res.send('nos visitaste ' + 1);
    }
});

sessionsRouter.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.json({ status: 'Logout ERROR', body: err })
        }
        res.send('Logout ok!')
    })
})

sessionsRouter.get('/login', (req, res) => {
    const { username, password } = req.query;
    if (username !== 'pepe' || password !== 'pepepass') {
        return res.send('login failed');
    }
    req.session.user = username;
    req.session.admin = false;
    res.send('login success!');
})
