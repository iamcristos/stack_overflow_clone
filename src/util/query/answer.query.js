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
}

export default AnswerQuery;
