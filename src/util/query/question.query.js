import CrudQuery from './query.helper';

class QuestionQuery extends CrudQuery {
  constructor(model) {
    super(model);
    this.model = model;
  }

  populateUser(id, field) {
    return this.getById(id).populate(field, '-password').exec();
  }

  searchQuestion(title, page = 1, pagination = 10) {
    return this.model.find({ title: new RegExp(title, 'gi') })
      .skip((page - 1) * pagination).limit(pagination).lean();
  }
}

export default QuestionQuery;
