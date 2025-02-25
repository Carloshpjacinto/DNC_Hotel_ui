const jsonServer = require('json-server');
const jwt = require('jsonwebtoken');

const app = jsonServer.create();
const router = jsonServer.router('db.json');

const MOCKED_SECRET = "your-secret-key";

app.db = router.db;

app.use(jsonServer.bodyParser);

app.post('/auth/login', (req, res) => {
    const body = req.body;
    
    const user = app.db
        .get('users')
        .find({ email: body.email, password: body.password })
        .value();

    if (user) {
        const access_token = jwt.sign(
            { email: user.email, sub: user.id },
            MOCKED_SECRET,
            { expiresIn: '1h'}
        )

        res.status(201).jsonp({ access_token })
    } else {
        res.status(401).jsonp({ message: 'Not authorized' })
    }
})

app.post('/auth/register', (req, res) => {
    const body = req.body;
    const users = app.get('users').value();
    const id = users.length ? Math.max(...users.map(user => user.id)) : 1

    const newUser = {
        ...body,
        id: id + 1,
        avatar: null,
        createdAt: new Date().toISOString()
    };
    app.get('users').push(newUser).write()

    return res.status(201).jsonp(newUser)
})

app.post('/auth/forgot-password', (req, res) => {
    res.status(201).send('A verification code has been sent to fabio@teste.com')
})

app.patch('/auth/reset-password', (req, res) => {
    console.log('cheguei \n\n\n\n\n')
    res.status(201).send({
        access_token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsIm5hbWUiOiJGZWxpY2lhIFRlc3RlIiwiaWF0IjoxNzIyMDE3NTA3LCJleHAiOjE3MjIxMDM5MDcsImF1ZCI6InVzZXJzIiwiaXNzIjoiZG5jX2hvdGVsIn0.WQw1JuFsnBLrgX6q1Dg-vxCux_gVSB5-gdv3SBpg2v0",
      })
})

app.post('/users/avatar', (req, res) => {
    res.status(201).jsonp({
        "id": 1,
        "email": "fabio@teste.com",
        "name": "Fabio Tetsuo",
        "role": "ADMIN",
        "avatar": "3fa9959b-5883-4eeb-ac8f-89ff7d9b2b84tester.jpg",
        "createdAt": "2024-07-28T16:25:58.655Z"
    })
})

app.use(router);
app.listen(3000);
