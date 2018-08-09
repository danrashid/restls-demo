import * as faker from 'faker';
import { getCollection, setCollection } from 'restls';
import { ICompany } from './interfaces/company';
import { IEmployee } from './interfaces/employee';
import { IUser } from './interfaces/user';

export default () => {
  try {
    ["companies", "employees", "users"].every(getCollection);
  } catch (e) {
    const companies: ICompany[] = [];
    const employees: IEmployee[] = [];
    const users: IUser[] = [];

    for (let i = 0; i < 100; i += 1) {
      const now = Date.now();
      users.push({
        id: faker.random.uuid(),
        emailAddress: faker.internet.email(),
        name: `${faker.name.firstName()} ${faker.name.lastName()}`,
        createdDateTime: now,
        updatedDateTime: now,
        isArchived: faker.random.arrayElement([true, false])
      });
    }

    for (let i = 0; i < 100; i += 1) {
      const now = Date.now();
      companies.push({
        id: faker.random.uuid(),
        name: faker.company.companyName(),
        address: `${faker.address.streetAddress()} ${faker.address.city()}, ${faker.address.stateAbbr()} ${faker.address.zipCode()}`,
        phone: faker.phone.phoneNumber(),
        createdDateTime: now,
        updatedDateTime: now,
        isArchived: faker.random.arrayElement([true, false])
      });
    }

    for (let i = 0; i < 1000; i += 1) {
      const userId = faker.random.arrayElement(users.map(u => u.id));
      const companyId = faker.random.arrayElement(companies.map(c => c.id));
      if (
        !employees.some(e => e.userId === userId && e.companyId === companyId)
      ) {
        const now = Date.now();
        employees.push({
          id: faker.random.uuid(),
          userId,
          companyId,
          phone: faker.phone.phoneNumber(),
          emailAddress: faker.internet.email(),
          jobTitle: faker.name.jobTitle(),
          isAdmin: faker.random.arrayElement([true, false]),
          createdDateTime: now,
          updatedDateTime: now,
          isArchived: faker.random.arrayElement([true, false])
        });
      }
    }

    setCollection("companies", companies);
    setCollection("employees", employees);
    setCollection("users", users);

    console.log("Generated new seed data.");
  }
};
