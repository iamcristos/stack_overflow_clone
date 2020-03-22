import Query from '../util/query';

class AnswerController {
  constructor(model) {
    this.model = model;
    this.answerQuestion = this.answerQuestion.bind(this);
    this.viewAnswers = this.viewAnswers.bind(this);
    this.search = this.search.bind(this);
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
      if (answers.lenght === 0) return res.status(404).send('no answers yet');
      return res.status(200).send(answers);
    } catch (error) {
      return res.status(500).send('network error');
    }
  }

  async search(req, res) {
    try {
      const { answer } = req.body;
      const { page, pagination } = req.query || { page: 1, pagination: 10 };
      const answers = await this.model.searchAnswer(answer, page, pagination);
      if (answers.length === 0) return res.status(404).send('no such answer');
      return res.status(200).send(answers);
    } catch (error) {
      return res.status(500).send('network error');
    }
  }
}

export default new AnswerController(Query().answer);
