var express = require("express");
var Sequelize = require("sequelize");
var app = express();

app.use(express.json());

function Customer() {
  const sequelize = new Sequelize("database", "usename", "password", {
    host: "localhost",
    dialect: "sqlite",
    storage: "./Database/SQLCustomer.sqlite",
  });

  const Customer = sequelize.define("Customer", {
    Customer_Id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    Name: {
      type: Sequelize.STRING,
      allowNull: false, // have to
    },
    Phone: {
      type: Sequelize.STRING,
      allowNull: false, // have to
    },
    Email: {
      type: Sequelize.STRING,
      allowNull: false, // have to
    },
    Address: {
      type: Sequelize.STRING,
      allowNull: false, // have to
    },
  });

  sequelize.sync();

  app.get("/Customers", (req, res) => {
    Customer.findAll()
      .then((CM) => {
        res.json(CM);

        console.log(" Get CMS FindALl");
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  });

  app.get("/Customer/:id", (req, res) => {
    Customer.findByPk(req.params.id)
      .then((CM) => {
        if (!CM) {
          res.status(404).send("Book not found");
        } else {
          res.json(CM);
          console.log(CM.title); //

          console.log(" Get CM findBiPk"); //
        }
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  });

  app.post("/Customer_Post", (req, res) => {
    Customer.create(req.body)
      .then((CM) => {
        res.send(CM);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  });

  app.put("/Customer_Update/:id", (req, res) => {
    Customer.findByPk(req.params.id)
      .then((CM) => {
        if (!CM) {
          res.status.send("Book not found");
        } else {
          CM.update(req.body)
            .then(() => {
              res.send(CM);
              console.log(CM + " put Book "); //
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

  app.delete("/Customer_Delete/:id", (req, res) => {
    Customer.findByPk(req.params.id)
      .then((CM) => {
        if (!CM) {
          res.status.send("Book not found");
        } else {
          console.log("do this MTFK");
          CM.destroy()
            .then(() => {
              console.log(CM + " Now Destroy "); //
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
}

Customer();

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
