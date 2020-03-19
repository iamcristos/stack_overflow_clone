class CrudQuery {
  constructor(model) {
    this.model = model;
  }

  getOne(item) {
    return this.model.findOne(item);
  }

  getMany(item) {
    return this.model.find(item);
  }

  get getAll() {
    return this.model.find();
  }

  updateById(id, update) {
    return this.model.findByIdAndUpdate(id, update);
  }

  getById(id) {
    return this.model.findById(id);
  }

  addDoc(item) {
    return this.model.create(item);
  }
}

export default CrudQuery;
