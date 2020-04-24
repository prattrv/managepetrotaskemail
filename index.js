const express = require("express");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const nodemailer = require("nodemailer");
require("dotenv").config();
const app = express();

app.use(bodyParser());
app.use(fileUpload());

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.post("/email", (req, res) => {
  //   console.log("About to send email");
  //   console.log("Data", req.files);
  console.log("Email", process.env.EMAIL);
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    // requireTLS: true,
    service: process.env.SERVICE,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PWD,
    },
  });

  let mailOptions = {
    from: process.env.EMAIL,
    to: ["prath257@gmail.com"],
    subject: "Database Backup",
    text: "Please find the attached CSV file",
    attachments: [
      {
        filename: req.files.customers.name,
        content: req.files.customers.data,
      },
    ],
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return res.status(400).json({
        error: "Can't send email",
      });
    }

    res.status(200).json({
      message: "Mail sent!",
    });
  });
});

const server = app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
