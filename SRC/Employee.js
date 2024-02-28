const express = require("express");
const Sequelize = require("sequelize");
const app = express();

app.use(express.json());

const sequelize = new Sequelize("database", "username", "password", {
    host: "localhost",
    dialect: "sqlite",
    storage: "./Database/SQLEmployee.sqlite",
});

const Employee = sequelize.define("employee", {
    Employee_Id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    Name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    Phone: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    Salary: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    Post: {
        type: Sequelize.STRING,
        allowNull: false,
    },
});

sequelize.sync();

app.get("/Employees", (req, res) => {
    Employee.findAll()
        .then((employees) => {
            res.json(employees);
        })
        .catch((err) => {
            res.status(500).send(err);
        });
});

app.get("/Employee/:id", (req, res) => {
    Employee.findByPk(req.params.id)
        .then((employees) => {
            if (!employees) {
                res.status(404).send("employees_id not found");
            } else {
                res.json(employees);
            }
        })
        .catch((err) => {
            res.status(500).send(err);
        });
});

app.post("/Employee_Post", (req, res) => {
    Employee.create(req.body)
        .then((employees) => {
            res.send(employees);
        })
        .catch((err) => {
            res.status(500).send(err);
        });
});

app.put("/Employee_Update/:id", (req, res) => {
    Employee.findByPk(req.params.id).then((employees) => {
        if (!employees) {
            res.status.send("employees not found");
        } else {
            employees.update(req.body).then(() => {
                res.send(employees);

            }).catch((err) => {
                res.status(500).send(err);
            });
        }
    }).catch((err) => {
        res.status(500).send(err);
    });
});

app.delete("/Employee_Delete/:id", (req, res) => {
    Employee.findByPk(req.params.id).then((employees) => {
            if (!employees) {
                res.status.send("employee not found");
            } else {
                employees.destroy().then(() => {
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
app.listen(port, () =>
    console.log(`Now The Server is listening on port ${port}`),
);