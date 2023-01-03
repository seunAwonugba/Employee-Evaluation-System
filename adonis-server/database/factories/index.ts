import Factory from '@ioc:Adonis/Lucid/Factory'
import ManagerModel from 'App/Models/ManagerModel'
import MemberModel from 'App/Models/MemberModel'

export const ManagerFactory = Factory.define(ManagerModel, ({ faker }) => {
  const firstName = faker.name.firstName()
  const lastName = faker.name.lastName()
  const email = faker.internet.email(firstName, lastName, 'guerrillamail.info')
  return {
    firstName: firstName,
    lastName: lastName,
    email: email,
    gender: faker.name.sex(),
    phoneNumber: faker.phone.number(),
    address: faker.address.streetAddress(),
    password: faker.internet.password(),
    branch: faker.helpers.arrayElement(['lagos', 'abuja']),
  }
})
  .relation('members', () => MembersFactory)
  .build()

export const MembersFactory = Factory.define(MemberModel, ({ faker }) => {
  const firstName = faker.name.firstName()
  const lastName = faker.name.lastName()
  const email = faker.internet.email(firstName, lastName, 'guerrillamail.info')
  return {
    firstName: firstName,
    lastName: lastName,
    email: email,
    gender: faker.name.sex(),
    phoneNumber: faker.phone.number(),
    address: faker.address.streetAddress(),
    password: faker.internet.password(),
    branch: faker.helpers.arrayElement(['lagos', 'abuja']),
  }
}).build()
