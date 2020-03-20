import { merge } from 'lodash';
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
    let { question } = req;
    const { userId } = req.body;
    const checkIfUserUpVote = question.upVote.indexOf(userId);
    console.log(checkIfUserUpVote);
    const checkIfUserdownVote = question.downVote.indexOf(userId);
    if (checkIfUserUpVote !== -1) {
      return res.status().send('user already upvoted');
    }
    if (checkIfUserdownVote !== -1) {
      const upVote = question.upVote.filter((item) => item !== userId);
      console.log(upVote,'upvote')
      question = merge(question, upVote);
      console.log(question, 'after merge');
      req.question = question;
    }
    return next();
  }

  static async updateDownVote(req, res, next) {
    let { question } = req;
    const { userId } = req.body;
    const checkIfUserUpVote = question.upVote.indexOf(userId);
    console.log(checkIfUserUpVote);
    const checkIfUserdownVote = question.downVote.indexOf(userId);
    if (checkIfUserdownVote !== -1) {
      return res.status().send('user already upvoted');
    }
    if (checkIfUserUpVote !== -1) {
      const upVote = question.upVote.filter((item) => item !== userId);
      console.log(upVote,'upvote')
      question = merge(question, upVote);
      console.log(question, 'after merge');
      req.question = question;
    }
    return next();
  }
}

export default QuestionMiddleware;
