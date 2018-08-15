import * as fakeData from './fakeData';
import { companies, employees, users } from './interfaces/collections';
import { getCollection, setCollection } from 'restls';

export default () => {
  try {
    [companies, employees, users].every(getCollection);
  } catch (e) {
    const data = fakeData();

    Object.keys(data).forEach(key => {
      setCollection(key, data[key]);
    });

    console.log("Generated new seed data.");
  }
};
