import jwt from 'jsonwebtoken';

function generateToken(user) {
  // eslint-disable-next-line no-underscore-dangle
  const token = jwt.sign({ data: user._id }, 'secret', { expiresIn: '1d' });
  return token;
}

async function validateToken(token, res) {
  if (!token) return res.status(400).send('token is required');
  try {
    const { data } = await jwt.verify(token, 'secret');
    return data;
  } catch (error) {
    return res.status(401).send(error);
  }
}

const jwtHelper = { generateToken, validateToken };
export default jwtHelper;
