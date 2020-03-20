import UserQuery from './user.query';
import QuestionQuery from './question.query';
import model from '../../model';

const Query = () => ({
  user: new UserQuery(model.User),
  question: new QuestionQuery(model.Question),
});

export default Query;
