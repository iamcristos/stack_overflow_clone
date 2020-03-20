import query from '../util/query';

class QuestionMiddleware {
  static async checkIfQuestionsExists(req, id) {
    try {
      const question = await query().question.getById(id);
      if (question) {
        req.question = question;
        return true;
      }
      return false;
    } catch (error) {
      return error;
    }
  }

  static async validateQuestion(req, res, next) {
    if (await QuestionMiddleware.checkIfQuestionsExists(req, req.params.id)) {
      return next();
    }
    return res.status(404).send('question dont exists');
  }

  static async updateVote(req, res, next) {
    const { question } = req;
    const { userId } = req.body;
    const checkIfUserUpVote = question.upVote.indexOf(userId);
    const checkIfUserdownVote = question.downVote.indexOf(userId);
    if (checkIfUserUpVote !== -1) {
      return res.status(400).send('user already upvoted');
    }
    if (checkIfUserdownVote !== -1) {
      const downVote = question.downVote.filter((item) => `${item}` !== userId);
      question.downVote = downVote;
      req.question = question;
    }
    return next();
  }

  static async updateDownVote(req, res, next) {
    const { question } = req;
    const { userId } = req.body;
    const checkIfUserUpVote = question.upVote.indexOf(userId);
    const checkIfUserdownVote = question.downVote.indexOf(userId);
    if (checkIfUserdownVote !== -1) {
      return res.status(400).send('user already downvoted');
    }
    if (checkIfUserUpVote !== -1) {
      const upVote = question.upVote.filter((item) => `${item}` !== userId);
      question.upVote = upVote;
      req.question = question;
    }
    return next();
  }
}

export default QuestionMiddleware;
