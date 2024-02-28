const express = require('express')
const Sequelize = require('sequelize')
const app = express()

app.use(express.json())

const sequelize = new Sequelize('database', 'username', 'password', {
    host: "localhost",
    dialect: "sqlite",
    storage: "./Database/SQLPawn_Ticket.sqlite"
})

const Pawn_ticket = sequelize.define("pawn_ticket", {
    pawn_ticket_Id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    customer_Id: {
        type: Sequelize.STRING,
        allowNull: false, // have to
    },
    employee_Id: {
        type: Sequelize.STRING,
        allowNull: false, // have to        
    },
    principle: {
        type: Sequelize.INTEGER,
        allowNull: false, // have to
    },
    Rate: {
        type: Sequelize.INTEGER,
        allowNull: false, // have to        
    },
    Total: {
        type: Sequelize.INTEGER,
        allowNull: false, // have to        
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


app.get('/Ticket/:id', (req, res) => {
    Pawn_ticket.findByPk(req.params.id).then(pawn_ticket => {
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


app.put('/Ticket_Update/:id', (req, res) => {
    Pawn_ticket.findByPk(req.params.id).then(pawn_ticket => {
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


app.delete('/Ticket_Delete/:id', (req, res) => {
    Pawn_ticket.findByPk(req.params.id).then(pawn_ticket => {
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


const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}`))