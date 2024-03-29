const express = require("express");
const Sequelize = require("sequelize");
const app = express();

app.use(express.json());

const sequelize = new Sequelize("database", "usename", "password", {
    host: "localhost",
    dialect: "sqlite",
    storage: "./Database/SQLitem.sqlite",
});

const Item = sequelize.define("item", {
    Product_Id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    Customer_Id: {
        type: Sequelize.STRING,
        allowNull: false, // have to
    },
    Name: {
        type: Sequelize.CHAR(20),
        allowNull: false, // have to
    },
    Value: {
        type: Sequelize.INTEGER,
        allowNull: false, // have to
    },
});

sequelize.sync();

app.get("/Items", (req, res) => {
    Item.findAll()
        .then((items) => {
            res.json(items);
        })
        .catch((err) => {
            res.status(500).send(err);
        });
});

app.get("/Item/:id", (req, res) => {
    Item.findByPk(req.params.id)
        .then((item) => {
            if (!item) {
                res.status(404).send("Item not found");
            } else {
                res.json(item);
            }
        })
        .catch((err) => {
            res.status(500).send(err);
        });
});

app.post("/Item_Post", (req, res) => {
    Item.create(req.body)
        .then((item) => {
            res.send(item);
        })
        .catch((err) => {
            res.status(500).send(err);
        });
});

app.put("/Item_Update/:id", (req, res) => {
    Item.findByPk(req.params.id)
        .then((item) => {
            if (!item) {
                res.status.send("Item not found");
            } else {
                item
                    .update(req.body)
                    .then(() => {
                        res.send(item);
                    })
                    .catch((err) => {
                        res.status(500).send(err);
                    });
            }
        })
        .catch((err) => {
            res.status(500).send(err);
        });
});

app.delete("/Item_Delete/:id", (req, res) => {
    Item.findByPk(req.params.id)
        .then((item) => {
            if (!item) {
                res.status.send("Item not found");
            } else {
                item
                    .destroy()
                    .then(() => {
                        res.send({});
                    })
                    .catch((err) => {
                        res.status(500).send(err);
                    });
            }
        })
        .catch((err) => {
            res.status(500).send(err);
        });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));