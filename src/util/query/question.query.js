import CrudQuery from './query.helper';

class QuestionQuery extends CrudQuery {
  constructor(model) {
    super(model);
    this.model = model;
  }

  populateUser(id, field) {
    return this.getById(id).populate(field, '-password').exec();
  }
}

export default QuestionQuery;
