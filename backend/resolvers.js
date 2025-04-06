const User = require('./models/User');
const Employee = require('./models/Employee');
const bcrypt = require('bcrypt');

const resolvers = {
  Query: {
    users: async () => {
      return await User.find();
    },
    user: async (_, { id }) => {
      return await User.findById(id);
    },
    employees: async () => {
      return await Employee.find();
    },
    employee: async (_, { id }) => {
      return await Employee.findById(id);
    },
  },

  Mutation: {
    createUser: async (_, { username, email, password }) => {
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
        username,
        email,
        password: hashedPassword,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });

      await newUser.save();
      return newUser;
    },

    updateUser: async (_, { id, username, email, password }) => {
      const updatedUser = await User.findByIdAndUpdate(
        id,
        {
          username,
          email,
          password: password ? await bcrypt.hash(password, 10) : undefined,
          updated_at: new Date().toISOString(),
        },
        { new: true }
      );
      return updatedUser;
    },

    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new Error('Invalid credentials');
      }

      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        throw new Error('Invalid credentials');
      }

      return user;
    },

    createEmployee: async (_, { first_name, last_name, email, gender, designation, salary, date_of_joining, department }) => {
      try {
        const newEmployee = new Employee({
          first_name,
          last_name,
          email,
          gender,
          designation,
          salary,
          date_of_joining,
          department,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        });
    
        await newEmployee.save();
        return newEmployee;
      } catch (error) {
        console.error("Error creating employee:", error);
        throw new Error("Failed to create employee");
      }
    },

    updateEmployee: async (_, { id, first_name, last_name, email, gender, designation, salary, date_of_joining, department }) => {
      const updatedEmployee = await Employee.findByIdAndUpdate(
        id,
        {
          first_name,
          last_name,
          email,
          gender,
          designation,
          salary,
          date_of_joining,
          department,
          updated_at: new Date().toISOString(),
        },
        { new: true }
      );
      return updatedEmployee;
    },
  },
};

module.exports = resolvers;
