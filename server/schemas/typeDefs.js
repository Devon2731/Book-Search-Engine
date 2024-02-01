const { gql } = require("apollo-server-express");

// Define the GraphQL schema using GraphQL Schema Definition Language (SDL)
const typeDefs = gql`
  input BookInput {
    authors: [String]              # List of authors for a book
    description: String           # Description of the book
    title: String!                # Title of the book (required)
    bookId: String!               # Unique identifier for the book (required)
    image: String                 # URL for the book cover image
    link: String                  # URL for more information about the book
  }

  type User {
    _id: ID!                       # Unique identifier for the user
    username: String!              # Username of the user
    email: String!                 # Email address of the user
    bookCount: Int                 # Number of books saved by the user
    savedBooks: [Book]             # List of books saved by the user
  }

  type Book {
    bookId: ID!                    # Unique identifier for the book
    authors: [String]              # List of authors for the book
    description: String            # Description of the book
    title: String!                 # Title of the book (required)
    image: String                  # URL for the book cover image
    link: String                   # URL for more information about the book
  }

  type Auth {
    token: ID!                     # JWT token for user authentication
    user: User                     # User information
  }

  type Query {
    me: User                      # Query to fetch the current user
  }

  type Mutation {
    login(email: String!, password: String!): Auth             # Mutation for user login
    addUser(username: String!, email: String!, password: String!): Auth  # Mutation for adding a new user
    saveBook(input: BookInput!): User                          # Mutation for saving a book
    removeBook(bookId: String!): User                          # Mutation for removing a book
  }
`;

module.exports = typeDefs;
