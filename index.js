const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');

const users = [
    { id: 1, name: 'Jahan', email: 'jahan@gamil.com' },
    { id: 2, name: 'Niloy', email: 'niloy@gamil.com' },
    { id: 3, name: 'Ifty', email: 'ifty@gamil.com' },
    { id: 4, name: 'Rony', email: 'rony@gamil.com' },
    { id: 5, name: 'Bijoy', email: 'bijoy@gamil.com' },
    { id: 6, name: 'Durjoy', email: 'durjoy@gamil.com' },
];

// Middlewares
app.use(cors());
app.use(express.json());

// MongoDB user: dbUser1
// MongoDB pass: ndIA75iROEdRxPLa

const uri =
    'mongodb+srv://dbUser1:ndIA75iROEdRxPLa@cluster0.onfc57d.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
});

async function run() {
    try {
        const userCollecton = client.db('simpleNode').collection('users');

        app.get('/users', async (req, res) => {
            const cursor = userCollecton.find({});
            const users = await cursor.toArray();

            res.send(users);
        });

        app.post('/users', async (req, res) => {
            const user = req.body;
            const result = await userCollecton.insertOne(user);
            console.log(result);
            user._id = result.insertedId;

            res.send(user);
        });
    } finally {
    }
}

run().catch((err) => console.log(err));

// GET at '/'
app.get('/', (req, res) => {
    res.send({
        error: false,
        data: {
            message: 'This is simple node server.',
        },
    });
});

// GET at '/users'
// app.get('/users', (req, res) => {
//     res.send(users);
// });

// GET at '/users/id'
// app.get('/users/:id', (req, res) => {
//     const userId = parseInt(req.params.id);
//     const selectedUser = users.find((user) => user.id === userId);

//     if (selectedUser) {
//         res.send({
//             error: false,
//             data: selectedUser,
//         });
//     } else {
//         // res.sendStatus(404);
//         res.send({
//             error: true,
//             data: 'No data found.',
//         });
//     }
// });

// POST at '/users'
// app.post('/users', (req, res) => {
//     console.log('POST API Called.');
//     const user = req.body;
//     user.id = users.length + 1;
//     users.push(user);

//     res.send(user);
// });

// LISTEN as port:5000
app.listen(port, () => {
    console.log('Listening on port:', port);
});
