const api = require('../../config/api');

exports.find = async (page = 1) => {
  const {
    data: {
      products,
      meta: { pageNumber },
    },
  } = await api.get('/product/', { params: { page } });
  return {
    page: pageNumber,
    products,
  };
};

exports.findBySku = async sku => {
  const { data } = await api.get(`/product/${sku}/`);
  return data;
};
