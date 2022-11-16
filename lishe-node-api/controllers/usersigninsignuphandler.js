const db = require("../config");
const knex = require("../config/knex");
const pick = require("lodash/pick");
const { isEmpty } = require("lodash");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { signInValidation } = require("../validation/signinvalidation");

module.exports = {
  signInHandler: async (req, res) => {
    //  const results = await knex.select({userid:1})
    //   .from('lishe.user')
    //         res.status(200).json(results);
    //         console.log({results})

    const { error } = signInValidation(req.body);
      if (error) return res.status(400).send({ errored: true, error: error.details[0].message });

    const { emailaddress, userpassword } = req.body;

    const results = await db.search("lishe.user", { emailaddress });

    if (isEmpty(results)) return res.status(401).json({ errored: true, error: "Account does not exist" });

      const validuserpassword = await bcrypt.compare(userpassword, results.userpassword);

    if (!validuserpassword)
      return res.status(400).json({ errored: true, error: "Invalid Password" });
 
    const response = pick(results, ["emailaddress","userpassword"]);    

      jwt.sign({ response }, process.env.SECRET_KEY, (err, token) => {
        if (err) return res.status(500).json({ err, message: "Internal Server Error" });
        return res.status(200).json({ ...response, authorization_token: token });
      });
  },
  signUpHandler: async (req, res) => {
    
    
    const { fullname, username, emailaddress, userpassword, phonenumber } =
      req.body;
    const response = await db.create("lishe.user", {
      fullname: fullname,
      username: username,
      emailaddress: emailaddress,
      userpassword: userpassword,
      phonenumber: phonenumber,
    });
    return res.status(201).json(response);
  },
};
