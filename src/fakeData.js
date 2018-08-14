const faker = require("faker");

module.exports = () => {
  const companies = [];
  const employees = [];
  const users = [];

  for (let i = 0; i < 100; i += 1) {
    const now = Date.now();
    users.push({
      created: now,
      emailAddress: faker.internet.email(),
      id: faker.random.uuid(),
      isArchived: faker.random.boolean(),
      name: `${faker.name.firstName()} ${faker.name.lastName()}`,
      phone: faker.phone.phoneNumber(),
      updated: now
    });
  }

  for (let i = 0; i < 100; i += 1) {
    const now = Date.now();
    companies.push({
      address: `${faker.address.streetAddress()} ${faker.address.city()}, ${faker.address.stateAbbr()} ${faker.address.zipCode()}`,
      created: now,
      id: faker.random.uuid(),
      isArchived: faker.random.boolean(),
      name: faker.company.companyName(),
      numEmployees: 0,
      phone: faker.phone.phoneNumber(),
      updated: now
    });
  }

  for (let i = 0; i < 1000; i += 1) {
    const userId = faker.random.arrayElement(users.map(u => u.id));
    const companyId = faker.random.arrayElement(companies.map(c => c.id));
    if (
      !employees.some(e => e.userId === userId && e.companyId === companyId)
    ) {
      const now = Date.now();
      const isArchived = faker.random.boolean();
      employees.push({
        companyId,
        created: now,
        emailAddress: faker.internet.email(),
        id: faker.random.uuid(),
        isAdmin: faker.random.boolean(),
        isArchived,
        jobTitle: faker.name.jobTitle(),
        phone: faker.phone.phoneNumber(),
        updated: now,
        userId
      });
      if (!isArchived) {
        const company = companies.find(({ id }) => id === companyId);
        if (company) {
          company.numEmployees += 1;
        }
      }
    }
  }
  return {
    companies,
    employees,
    users
  };
};
