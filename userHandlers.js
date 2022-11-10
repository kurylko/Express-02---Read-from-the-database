const database = require("./database");

const getUsers = (req, res) => {
    database
        .query("select * from users")
        .then(([users]) => {
            res.status(200).json(users)
            console.log(users);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send("Error retrieving data from database");
        });
};

const getUserById = (req, res) => {
    const id = parseInt(req.params.id);

    database
        .query("select * from users where id = ?", [id])
        .then(([users]) => {
            if (users[0] != null) {
                res.status(200).json(users[0]);
            } else {
                res.status(404).send("Not Founjjd");
            }
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send("Error retrieving data from database");
        });
};

const postUser = (req, res) => {
    const { firstname, lastname, email, city, language } = req.body;

    database
        .query(
            "INSERT INTO users(firstname, lastname, email, city, language) VALUES (?, ?, ?, ?, ?)",
            [firstname, lastname, email, city, language]
        )
        .then(([result]) => {
            res.location(`/api/users/${result.insertId}`).sendStatus(201);
        })
        .catch((err) => {
            console.error('Err - >', err);
            res.status(500).send("Error saving the User");
        });
};

{/*const putUser = (req, res) => {
    console.log(req.params, req.body)
    const { firstname, lastname, email, city, language } = req.params.id.body;
    console.log('userupd', firstname)
    database
        .query(
            "UPDATE users SET firstname = ?, lastname = ?, email = ?, city = ?, language = ? where id = ?)",
            [firstname, lastname, email, city, language]
        )
        .then(([result]) => {
            res.location(`/api/users/${result.insertId}`).sendStatus(201);
        })
        .catch((err) => {
            console.error('Err - >', err);
            res.status(500).send("Error changing the User");
        });
}*/}


module.exports = {
    getUsers,
    getUserById,
    postUser,
    putUser,
};