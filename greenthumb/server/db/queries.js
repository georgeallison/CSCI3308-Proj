const connection = require('./connection');

// 'connection('plant') specifies the plant table
module.exports = {
  getAll() {
    return connection('plant');
  },
  getPlants(id) {
    return connection('plant').where('id', id).first();
  },
  create(plant) {
    return connection('user').insert(plant, 'id').then(ids => {
      return ids[0];
    });
  },
  update(id, plant) {
    return connection('user').where('id', id).update(plant);
  },
  delete(id) {
    return connection('user').where('id', id).del();
  }
};
