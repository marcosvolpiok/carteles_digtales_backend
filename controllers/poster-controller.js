const PosterModel = require('../models/PosterModel');


const add = async (data, res) => {
  data['user'] = res.userData.userId;

  const map = new PosterModel(data);
  await map.save();

  return map;
}

const getPoster = async (res) => {
  const map = await PosterModel.find({user: res.userData.userId});

  return map;
}

const getPosterById = async (id) => {
  const map = await PosterModel.findOne({_id: id});

  return map;
}



const update = async (id, data) => {
  const poster = await PosterModel.update({_id: id}, data);

  return poster;
}

const remove = async (id) => {
  const poster = await PosterModel.remove({_id: id});

  return poster;
}



module.exports = {
  add,
  getPoster,
  getPosterById,
  update,
  remove
}