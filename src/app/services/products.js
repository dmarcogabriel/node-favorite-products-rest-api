const api = require('../../config/api');

exports.find = async () => {
  const {
    data: {
      products,
      meta: { pageNumber },
    },
  } = await api.get('/product/', { params: { page: 1 } });
  return {
    page: pageNumber,
    products,
  };
};

exports.findById = async id => {
  const { data } = await api.get(`/product/${id}/`);
  return data;
};
