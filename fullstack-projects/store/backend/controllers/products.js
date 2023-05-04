const Product = require('../models/product');

const getAllProductsStatic = async (req, res) => {
  const products = await Product.find({})
    .select('name price')
    .limit(10)
    .skip(5);

  res.status(200).json({ nbHits: products.length, data: products });
};

const getAllProducts = async (req, res) => {
  const { featured, company, name, sort, fields, numericFilters } = req.query;

  const queryOptions = {};

  if (featured) {
    queryOptions.featured = featured === 'true' ? 'true' : 'false';
  }
  if (company) {
    queryOptions.company = company;
  }
  if (name) {
    queryOptions.name = { $regex: name, $options: 'i' };
  }
  if (numericFilters) {
    const operatorMap = {
      '>': '$gt',
      '>=': '$gte',
      '=': '$eq',
      '<': '$lt',
      '<=': '$lte'
    };
    const regEx = /\b(<|>|>=|=|<|<=)\b/g;
    let filters = numericFilters.replace(
      regEx,
      (match) => `-${operatorMap[match]}-`
    );
    const options = ['price', 'rating'];
    filters = filters.split(',').forEach((item) => {
      const [field, operator, value] = item.split('-');
      if (options.includes(field)) {
        queryOptions[field] = { [operator]: Number(value) };
      }
    });
  }

  let result = Product.find(queryOptions);

  if (sort) {
    const sortList = sort.split(',').join(' ');
    result = result.sort(sortList);
  } else {
    result = result.sort('createdAt');
  }

  if (fields) {
    const fieldstList = fields.split(',').join(' ');
    result = result.select(fieldstList);
  }

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  async function numberOfPages(limit) {
    const count = await Product.countDocuments();
    return Math.ceil(count / limit);
  }

  result = result.skip(skip).limit(limit);
  const products = await result;

  const numOfPages = await numberOfPages(limit);
  res.status(200).json({ numOfPages: numOfPages, data: products });
};

module.exports = {
  getAllProducts,
  getAllProductsStatic
};
