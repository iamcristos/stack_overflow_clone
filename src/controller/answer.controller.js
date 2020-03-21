import Query from '../util/query';

class AnswerController {
  constructor(model) {
    this.model = model;
    this.answerQuestion = this.answerQuestion.bind(this);
    this.viewAnswers = this.viewAnswers.bind(this);
  }

  async answerQuestion(req, res) {
    try {
      const { id, question } = req.params;
      const answer = await this.model.addDoc({ ...req.body, question, answeredBy: id });
      return res.status(200).send(answer);
    } catch (error) {
      return res.status(500).send('network error');
    }
  }

  async viewAnswers(req, res) {
    try {
      const { question } = req.params;
      const answers = await this.model.getMany({ question }).exec();
      if (!answers.lenght) return res.status(404).send('no answers yet');
      return res.status(200).send(answers);
    } catch (error) {
      return res.status(500).send('network error');
    }
  }
}

export default new AnswerController(Query().answer);
