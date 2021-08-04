const UserService = require('./../services/user.service');
const { JoiSignIn  } = require('./../helpers/validation/user');

async function signIn(req, res) {
  try {

    const { email, password } = req.body;

    const { error }  = JoiSignIn.validate({ email, password });
    if (error) return res.status(401).send(`Wrong user or password, ${error.message}`);

    const userLogued = await UserService.signIn(email, password);
    if (!userLogued) return res.status(401).send('Wrong user or password');

    return res.status(200).send(userLogued);
    
  } catch (error) {
    return res.status(500).send('Contact your Develop');
  }
}

module.exports = {
  signIn
};