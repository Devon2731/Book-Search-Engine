import { gpl } from '@apollo/client';

export const LOGIN_USER = gpl`
mutation login ($email: String!, $password: String!) {
    login(email: $email, password: $password) {
        token
        user {
            _id
            username
            email
            bookCount
            savedBooks {
                bookId
                authors
                description
                image
                link
                title
            }
        }
    }
}`;

export const ADD_USER = gpl `
mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
        token
        user {
            _id
            username
            email
            bookCount
            savedBooks {
                bookId
                authors
                description
                image
                link
                title
            }
        }
    }
}`;

export const SAVE_BOOK = gpl `
mutation saveBook($bookData: BookInput!) {
    saveBook(input: $input) {
        _id
        username
        email
        bookCount
        savedBooks {
            bookId
            authors
            description
            image
            link
            title
        }
    }
}`;

export const REMOVE_BOOK = gpl `
mutation removeBook($bookId: String!) {
    removeBook(bookId: $bookId) {
        _id
        username
        email
        bookCount
        savedBooks {
            bookId
            authors
            description
            image
            link
            title
        }
    }
}`;