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
    return this.model.findOne({ $or: [{ email }, { username }] });
  }

  searchUser(username, page = 1, pagination = 10) {
    return this.model.find({ username: new RegExp(username, 'gi') })
      .skip((page - 1) * pagination).limit(pagination).select('-password')
      .lean();
  }
}

export default UserQuery;
