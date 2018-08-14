const faker = require("faker");

const formatEmailAddress = value =>
  value
    .toLowerCase()
    .replace(/[^\w\@\.]/g, "-")
    .replace(/\-+/g, "-");

module.exports = () => {
  const companies = [];
  const employees = [];
  const users = [];

  for (let i = 0; i < 100; i += 1) {
    const now = Date.now();
    const name = `${faker.name.firstName()} ${faker.name.lastName()}`;
    users.push({
      created: now,
      emailAddress: formatEmailAddress(`${name}@example.com`),
      id: faker.random.uuid(),
      isArchived: faker.random.boolean(),
      name,
      phone: faker.phone.phoneNumber(),
      updated: now
    });
  }

  for (let i = 0; i < 100; i += 1) {
    const now = Date.now();
    companies.push({
      address: `${faker.address.streetAddress()}\n${faker.address.city()}, ${faker.address.stateAbbr()} ${faker.address.zipCode()}`,
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
    const { id: userId, name: userName } = faker.random.arrayElement(users);
    const { id: companyId, name: companyName } = faker.random.arrayElement(
      companies
    );
    if (
      !employees.some(e => e.userId === userId && e.companyId === companyId)
    ) {
      const now = Date.now();
      const isArchived = faker.random.boolean();
      employees.push({
        companyId,
        created: now,
        emailAddress: formatEmailAddress(`${userName}@${companyName}.com`),
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
