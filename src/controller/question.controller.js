/* eslint-disable class-methods-use-this */
import Query from '../util/query';

class QuestionControler {
  constructor(model) {
    this.model = model;
    this.askQuestion = this.askQuestion.bind(this);
    this.viewQuestion = this.viewQuestion.bind(this);
  }

  async askQuestion(req, res) {
    try {
      const { id } = req.params;
      const question = await this.model.addDoc({ ...req.body, askedBy: id });
      return res.status(201).send(question);
    } catch (error) {
      return res.status(500).send('network error');
    }
  }

  async viewQuestion(req, res) {
    try {
      const { id } = req.params;
      const question = await this.model.populateUser(id, 'askedBy');
      if (!question) return res.status(404).send('question dont exists');
      return res.status(200).send(question);
    } catch (error) {
      return res.status(500).send('network error');
    }
  }

  async upVote(req, res) {
    let { question } = req;
    const { userId } = req.body;
    question.upVote.push(userId);
    question = await question.save();
    return res.status(200).send(question);
  }

  async downVote(req, res) {
    let { question } = req;
    const { userId } = req.body;
    question.downVote.push(userId);
    question = await question.save();
    return res.status(200).send(question);
  }

  async subscribe(req, res) {
    try {
      const { question, body } = req;
      question.subscribedUsers.push(body.userId);
      await question.save();
      return res.status(200).send(question);
    } catch (error) {
      return res.status(500).send('network error');
    }
  }
}

const question = new QuestionControler(Query().question);

export default question;
