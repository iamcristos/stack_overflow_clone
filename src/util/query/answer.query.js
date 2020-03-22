import CrudQuery from './query.helper';

class AnswerQuery extends CrudQuery {
  constructor(model) {
    super(model);
    this.model = model;
  }

  getAnswersNotified() {
    return this.getOne({ notified: false }).populate({
      path: 'question',
      populate: {
        path: 'subscribedUsers',
        select: 'email',
      },
    });
  }

  searchAnswer(answer, page = 1, pagination = 10) {
    return this.model.find({ answer: new RegExp(answer, 'gi') })
      .skip((page - 1) * pagination).limit(pagination)
      .populate('question')
      .populate('answeredBy')
      .exec();
  }
}

export default AnswerQuery;
