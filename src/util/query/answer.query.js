import CrudQuery from './query.helper';

class AnswerQuery extends CrudQuery {
  constructor(model) {
    super(model);
    this.model = model;
  }
}

export default AnswerQuery;
