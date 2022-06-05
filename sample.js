const { faker } = require("@faker-js/faker");
const fs = require("fs");

const generateEmployeeData = (total) => {
  const employees = [];
  for (let i = 0; i < total; i++) {
    employees.push({
      id: i + 1,
      username: faker.internet.userName(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      birthDate: faker.date.past(),
      basicSalary: faker.helpers.arrayElement([
        1_000_000, 5_000_000, 10_000_000, 20_000_000,
      ]),
      status: faker.helpers.arrayElement(["active", "inactive", "suspended"]),
      group: faker.helpers.arrayElement([
        "admin",
        "user",
        "guest",
        "superadmin",
        "group1",
        "group2",
        "group3",
        "group4",
        "group5",
      ]),
      description: faker.lorem.sentence(5),
    });
  }
  return employees;
};

fs.writeFileSync(
  "./db.json",
  JSON.stringify({ employees: generateEmployeeData(100) }, null, 2)
);
