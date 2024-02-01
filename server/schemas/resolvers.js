
const { User } = require("../models");

const { signToken } = require("../utils/auth");

// Define resolvers for queries and mutations
const resolvers = {
  Query: {
    // Resolver to fetch the current user profile
    me: async (parent, args, context) => {
      
      if (context.user) {
        try {
          
          const user = await User.findOne({ _id: context.user._id });
        
          return user;
        } catch (error) {
          
          throw new Error("Could not find the user");
        }
      }
      // Throw an error if the user is not authenticated
      throw new Error("User not authenticated");
    },
  },
  Mutation: {
    // Resolver to handle user login
    login: async (parent, args) => {
      // Extract email and password from the arguments
      const { email, password } = args;
      try {
       
        const user = await User.findOne({ email });
       
        if (!user) {
          throw new Error("User not found");
        }
        
        const isCorrectPassword = await user.isCorrectPassword(password);
        
        if (!isCorrectPassword) {
          throw new Error("Incorrect password");
        }
        // Generate a token for the user
        const token = signToken(user);
    
        return { token, user };
      } catch (error) {
       
        throw new Error("Login failed");
      }
    },
    // Resolver to add a new user
    addUser: async (parent, args) => {
      try {
      
        const user = await User.create(args);
        // Generate a token for the new user
        const token = signToken(user);
       
        return { token, user };
      } catch (error) {
        // Throw an error if user creation fails
        throw new Error("Could not create user");
      }
    },
    // Resolver to save a book to a user's profile
    saveBook: async (parent, args, context) => {
      if (context.user) {
        try {
          // Update the user's savedBooks array by adding a new book
          const updatedUser = await User.findByIdAndUpdate(
            { _id: context.user._id },
            { $push: { savedBooks: args.input } },
            { new: true }
          );
          
          return updatedUser;
        } catch (error) {
          
          throw new Error("Could not save the book");
        }
      }
      // Throw an error if the user is not authenticated
      throw new Error("User not authenticated");
    },
    // Resolver to remove a book from a user's profile
    removeBook: async (parent, args, context) => {
      if (context.user) {
        try {
          // Update the user's savedBooks array by removing a book
          const updatedUser = await User.findByIdAndUpdate(
            { _id: context.user._id },
            { $pull: { savedBooks: { bookId: args.bookId } } },
            { new: true }
          );
         
          return updatedUser;
        } catch (error) {
          // Throw an error if removing the book fails
          throw new Error("Could not remove the book");
        }
      }
      // Throw an error if the user is not authenticated
      throw new Error("User not authenticated");
    },
  },
};


module.exports = resolvers;
