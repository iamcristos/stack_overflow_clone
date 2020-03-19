import CrudQuery from './query.helper';

class UserQuery extends CrudQuery {
  constructor(model) {
    super(model);
    this.model = model;
  }

  createUser(body) {
    return this.addDoc(body);
  }

  findUserByEmailUsername(email, username) {
    return this.model.find({ $or: [{ email, username }] });
  }
}

export default UserQuery;
