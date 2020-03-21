import query from '../util/query';
import QuestionMiddleware from './question.middleware';

class Answermiddleware {
  static async validateQuestion(req, res, next) {
    if (await QuestionMiddleware.checkIfQuestionsExists(req, req.params.question)) {
      return next();
    }
    return res.status(404).send('question dont exists');
  }
}

export default Answermiddleware;
