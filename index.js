const express = require("express");
const { Sequelize, DataTypes } = require("sequelize");

// Setting up a new Sequelize instance for SQLite database
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite",
});

const Customer = sequelize.define(
  "customer",
  {
    // Primary key, autoincremented
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    // Customer name, not null
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { timestamps: false } // No timestamps
);

const app = express();
const port = process.env.PORT || 3000;

app.get("/api/customers", async (req, res) => {
  const customers = await Customer.findAll();
  res.send(customers);
});

app.listen(port, async () => {
  console.log(`AKU ANKKA ${port}`);

  await sequelize.authenticate();
  console.log("connection success");
  await Customer.sync({ force: true });
  await Customer.create({ name: "jack" });
  await Customer.create({ name: "hannah" });
  await Customer.create({ name: "tina" });
});
