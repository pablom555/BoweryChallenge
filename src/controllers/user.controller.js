const UserService = require('./../services/user.service');
const { JoiSignIn, JoiSignUp  } = require('./../helpers/validation/user');

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

async function signUp(req, res) {
  try {

    const signUpPayload = req.body;

    const { error }  = JoiSignUp.validate(signUpPayload);
    if (error) return res.status(400).send(`Bad request, ${error.message}`);

    const userCreated = await UserService.signUp(signUpPayload);
    if (!userCreated) throw new Error('Error creating user')

    return res.status(201).send(userCreated);
    
  } catch (error) {    
    return res.status(500).send(`Error: ${error.message}`);
  }
}

module.exports = {
  signIn,
  signUp
};