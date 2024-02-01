import { gql } from "@apollo/client";
// query for me
export const GET_ME = gql`
  query Me {
    me {
      _id
      bookCount
      email
      savedBooks {
        authors
        bookId
        description
        image
        link
        title
      }
      username
    }
  }
`;
