var express = require("express")
var Sequelize = require("sequelize")
var app = express()

app.use(express.json())



function Item() {
    const sequelize = new Sequelize("database", "usename", "password", {
        host: "localhost",
        dialect: "sqlite",
        storage: "./Database/SQLitem.sqlite",
    })

    const Item = sequelize.define("item", {
        Product_Id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        Customer_Id: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        Name: {
            type: Sequelize.CHAR(20),
            allowNull: false,
        },
        Value: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
    })

    sequelize.sync()

    app.get("/Items", (req, res) => {
        Item.findAll().then((items) => {
            res.json(items)
        }).catch((err) => {
            res.status(500).send(err)
        })
    })

    app.get("/Item/:Product_Id", (req, res) => {
        Item.findByPk(req.params.Product_Id).then((item) => {
            if (!item) {
                res.status(404).send("Item not found")
            } else {
                res.json(item)
            }
        }).catch((err) => {
            res.status(500).send(err)
        })
    })

    app.post("/Item_Post", (req, res) => {
        Item.create(req.body).then((item) => {
            res.send(item)
        }).catch((err) => {
            res.status(500).send(err)
        })
    })

    app.put("/Item_Update/:Product_Id", (req, res) => {
        Item.findByPk(req.params.Product_Id).then((item) => {
            if (!item) {
                res.status.send("Item not found")
            } else {
                item.update(req.body).then(() => {
                    res.send(item)
                }).catch((err) => {
                    res.status(500).send(err)
                })
            }
        }).catch((err) => {
            res.status(500).send(err)
        })
    })

    app.delete("/Item_Delete/:Product_Id", (req, res) => {
        Item.findByPk(req.params.Product_Id).then((item) => {
            if (!item) {
                res.status.send("Item not found")
            } else {
                item.destroy().then(() => {
                    res.send({})
                }).catch((err) => {
                    res.status(500).send(err)
                })
            }
        }).catch((err) => {
            res.status(500).send(err)
        })
    })

}

// ---------------

function Employee() {
    const sequelize = new Sequelize("database", "username", "password", {
        host: "localhost",
        dialect: "sqlite",
        storage: "./Database/SQLEmployee.sqlite",
    })

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
    })

    sequelize.sync()

    app.get("/Employees", (req, res) => {
        Employee.findAll().then((employees) => {
            res.json(employees)
        }).catch((err) => {
            res.status(500).send(err)
        })
    })

    app.get("/Employee/:Employee_Id", (req, res) => {
        Employee.findByPk(req.params.Employee_Id).then((employees) => {
            if (!employees) {
                res.status(404).send("employees_id not found")
            } else {
                res.json(employees)
            }
        }).catch((err) => {
            res.status(500).send(err)
        })
    })

    app.post("/Employee_Post", (req, res) => {
        Employee.create(req.body).then((employees) => {
            res.send(employees)
        }).catch((err) => {
            res.status(500).send(err)
        })
    })

    app.put("/Employee_Update/:Employee_Id", (req, res) => {
        Employee.findByPk(req.params.Employee_Id).then((employees) => {
            if (!employees) {
                res.status.send("employees not found")
            } else {
                employees.update(req.body).then(() => {
                    res.send(employees)
                }).catch((err) => {
                    res.status(500).send(err);
                })
            }
        }).catch((err) => {
            res.status(500).send(err)
        })
    })

    app.delete("/Employee_Delete/:Employee_Id", (req, res) => {
        Employee.findByPk(req.params.Employee_Id).then((employees) => {
            if (!employees) {
                res.status.send("employee not found")
            } else {
                employees.destroy().then(() => {
                    res.send({})
                }).catch((err) => {

                    res.status(500).send(err)
                })
            }
        }).catch((err) => {
            res.status(500).send(err)
        })
    })

}

// ---------------

function Ticket() {
    const sequelize = new Sequelize('database', 'username', 'password', {
        host: "localhost",
        dialect: "sqlite",
        storage: "./Database/SQLPawn_Ticket.sqlite"
    })



    const Pawn_ticket = sequelize.define("pawn_ticket", {
        Pawn_ticket_Id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        Customer_Id: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        Product_Id: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        Employee_Id: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        Principle: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        Rate: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        Total: {
            type: Sequelize.INTEGER,
            allowNull: false,
        }

    })

    sequelize.sync()

    app.get('/Tickets', (req, res) => {
        Pawn_ticket.findAll().then(pawn_tickets => {
            res.json(pawn_tickets)
        }).catch(err => {
            res.status(500).send(err)
        })
    })

    app.get('/Ticket/:Pawn_ticket_Id', (req, res) => {
        Pawn_ticket.findByPk(req.params.Pawn_ticket_Id).then(pawn_ticket => {
            if (!pawn_ticket) {
                res.status(404).send('Pawn_tickets not found')
            } else {
                res.json(pawn_ticket)
            }
        }).catch(err => {
            res.status(500).send(err)
        })
    })

    app.post('/Ticket_Post', (req, res) => {
        Pawn_ticket.create(req.body).then(pawn_ticket => {
            res.send(pawn_ticket)
        }).catch(err => {
            res.status(500).send(err)
        })
    })

    app.put('/Ticket_Update/:Pawn_ticket_Id', (req, res) => {
        Pawn_ticket.findByPk(req.params.Pawn_ticket_Id).then(pawn_ticket => {
            if (!pawn_ticket) {
                res.status.send('Pawn_tickets not found')
            } else {
                pawn_ticket.update(req.body).then(() => {
                    res.send(pawn_ticket)
                }).catch(err => {
                    res.status(500).send(err)
                })
            }
        }).catch(err => {
            res.status(500).send(err)
        })
    })

    app.delete('/Ticket_Delete/:Pawn_ticket_Id', (req, res) => {
        Pawn_ticket.findByPk(req.params.Pawn_ticket_Id).then(pawn_ticket => {
            if (!pawn_ticket) {
                res.status.send('Pawn_tickets not found')
            } else {
                pawn_ticket.destroy().then(() => {
                    res.send({})
                }).catch(err => {
                    res.status(500).send(err)
                })
            }
        }).catch(err => {
            res.status(500).send(err)
        })
    })
}

// ---------------

function Customer() {
    const sequelize = new Sequelize("database", "usename", "password", {
        host: "localhost",
        dialect: "sqlite",
        storage: "./Database/SQLCustomer.sqlite",
    })

    const Customer = sequelize.define("Customer", {
        Customer_Id: {
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
        Email: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        Address: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        Password: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    })

    sequelize.sync()

    app.get("/Customers", (req, res) => {
        Customer.findAll().then((CM) => {
                res.json(CM)
            })
            .catch((err) => {
                res.status(500).send(err);
            })
    })

    app.get("/Customer/:Customer_Id", (req, res) => {
        Customer.findByPk(req.params.Customer_Id).then((CM) => {
            if (!CM) {
                res.status(404).send("Customer not found")
            } else {
                res.json(CM)
            }
        }).catch((err) => {
            res.status(500).send(err)
        })
    })

    app.post("/Customer_Post", (req, res) => {
        Customer.create(req.body).then((CM) => {
            res.send(CM)
        }).catch((err) => {
            res.status(500).send(err)
        })
    })

    app.put("/Customer_Update/:Customer_Id", (req, res) => {
        Customer.findByPk(req.params.Customer_Id).then((CM) => {
            if (!CM) {
                res.status.send("Customer not found")
            } else {
                CM.update(req.body).then(() => {
                    res.send(CM);
                }).catch((err) => {
                    res.status(500).send(err)
                })
            }
        }).catch((err) => {
            res.status(500).send(err)
        })
    })

    app.delete("/Customer_Delete/:Customer_Id", (req, res) => {
        Customer.findByPk(req.params.Customer_Id).then((CM) => {
            if (!CM) {
                res.status.send("Book not found")
            } else {
                CM.destroy().then(() => {
                    res.send({})
                }).catch((err) => {
                    res.status(500).send(err)
                })
            }
        }).catch((err) => {
            res.status(500).send(err)
        })
    })
}


Item()
Employee()
Ticket()
Customer()
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));