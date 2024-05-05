import { FilterQuery, Model } from 'mongoose';

/**
 * Check if a record has already existed in the table
 * @param {Model} model Model name, exported from src/model
 * @param {Object} condition object that is put in sequelize "where" options
 * @returns {boolean}
 */
const checkExisted = async <T>(model: Model<T>, condition: FilterQuery<T>) => {
  try {
    const findResult = await model?.findOne(condition);
    if (findResult) {
      return true;
    }
    return false;
  } catch (error) {
    throw new Error(error);
  }
};

export default checkExisted;
