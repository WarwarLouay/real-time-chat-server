const user = require("../Models/user.model");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const createToken = (_id) => {
  const jwtKey = process.env.JWT_SECRET_KEY;
  return jwt.sign({ _id }, jwtKey, { expiresIn: "3d" });
};

let verificationCode = "";

exports.create = async (req, res) => {
  try {
    const data = req.body;
    const newData = new user();

    newData.email = data.email;

    let count = await user.findOne({ email: newData.email }).exec();
    if (count) {
      const token = createToken(count._id);

      let mailTransporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "tt5612659@gmail.com",
          pass: "ypiskgvroikhzaiz",
        },
        tls: { rejectUnauthorized: false },
      });

      verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

      let details = {
        from: "tt5612659@gmail.com",
        to: count.email,
        subject: "Verification Code",
        text: "Your verification code is: " + verificationCode,
      };

      mailTransporter.sendMail(details, (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("Mail sent.");
        }
      });

      return res.status(200).json(count);
    } else {
      const u = await newData.save();

      let mailTransporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "tt5612659@gmail.com",
          pass: "ypiskgvroikhzaiz",
        },
        tls: { rejectUnauthorized: false },
      });

      verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

      let details = {
        from: "tt5612659@gmail.com",
        to: u.email,
        subject: "Verification Code",
        text: "Your verification code is: " + verificationCode,
      };

      mailTransporter.sendMail(details, (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("Mail sent.");
        }
      });

      const token = createToken(u._id);
      return res.status(201).json(newData);
    }
  } catch (error) {
    return res.status(400).json({ message: "something wrong" });
  }
};

exports.verifyCode = async (req, res) => {
  const data = req.body;
  const code = data.code;

  if (code === verificationCode) {
    return res.status(201).json({ verificationCode, message: "true" });
  } else {
    return res.status(200).json({ message: "false" });
  }
};

exports.resendCode = async (req, res) => {
  const data = req.body;
  const email = data.email;

  let mailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "tt5612659@gmail.com",
      pass: "ypiskgvroikhzaiz",
    },
    tls: { rejectUnauthorized: false },
  });

  let newVerificationCode = Math.floor(100000 + Math.random() * 900000).toString();
  verificationCode = newVerificationCode

  let details = {
    from: "tt5612659@gmail.com",
    to: email,
    subject: "Verification Code",
    text: "Your verification code is: " + verificationCode,
  };

  mailTransporter.sendMail(details, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Mail sent.");
    }
  });
  return res.status(201).json({ verificationCode, message: "sent" });
};

exports.findAll = async (req, res) => {
  try {
    const users = await user.find().exec();
    return res.status(201).json(users);
  } catch (error) {
    return res.status(400).json({ message: "something wrong" });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const data = req.body;

  const updateUser = await user
    .findByIdAndUpdate(
      data.uid,
      {
        $set: {
          image: data.image,
          status: data.status,
          fullName: data.fullName,
        },
      },
      { upsert: true }
    )
    .exec();
  return res.status(201).json(updateUser);
  } catch (error) {
    return res.status(400).json({ message: "something wrong" });
  }
};
