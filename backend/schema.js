const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    password: String!
    created_at: String!
    updated_at: String!
  }

  type Employee {
    id: ID!
    first_name: String!
    last_name: String!
    email: String!
    gender: String!
    designation: String!
    salary: Float!
    date_of_joining: String!
    department: String!
    created_at: String!
    updated_at: String!
  }

  type Query {
    users: [User]
    user(id: ID!): User
    employees: [Employee]
    employee(id: ID!): Employee
  }

  type Mutation {
    createUser(username: String!, 
        email: String!, 
        password: String!): User

    updateUser(id: ID!, 
        username: String, 
        email: String, 
        password: String): User

    login(email: String!, 
        password: String!): User

    createEmployee(first_name: String!, 
        last_name: String!, email: String!, 
        gender: String!, designation: String!, 
        salary: Float!, date_of_joining: String!, 
        department: String!): Employee

    updateEmployee(id: ID!, 
        first_name: 
        String, 
        last_name: String, 
        email: String, 
        gender: String, 
        designation: String, 
        salary: Float, 
        date_of_joining: String, 
        department: String): Employee

    deleteEmployee(id: ID!): Employee
  }
`;

module.exports = typeDefs;
