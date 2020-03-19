import UserQuery from './user.query';
import model from '../../model';

const Query = () => ({
  user: new UserQuery(model.User),
});

export default Query;
