import UserQuery from './user.query';
import QuestionQuery from './question.query';
import AnswerQuery from './answer.query';
import model from '../../model';

const Query = () => ({
  user: new UserQuery(model.User),
  question: new QuestionQuery(model.Question),
  answer: new AnswerQuery(model.Answer),
});

export default Query;
