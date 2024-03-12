import { gql } from '@apollo/client';

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_DECK = gql`
  mutation addDeck($title: String!, $description: String!, $cardData: String) {
    addDeck(title: $title, description: $description, cardData: $cardData) {
      _id
    }
  }
`;

export const DELETE_DECK = gql`
  mutation deleteDeck($deckId: ID!) {
    removeDeck(deckId: $deckId) {
      _id
      title
      description
    }
  }
`;

export const DELETE_CARD = gql`
  mutation deleteCard($deckId: ID!, $cardId: ID!) {
    removeCard(deckId: $deckId, cardId: $cardId) {
      _id
      title
      cards {
        _id
        frontText
        backText
        createdAt
      }
    }
  }
`;

export const ADD_CARD = gql`
  mutation addCard($deckId: ID!, $frontText: String!, $backText: String!) {
    addCard(deckId: $deckId, frontText: $frontText, backText: $backText) {
      _id
      frontText
      backText
      createdAt
    }
  }
`;

export const UPDATE_CARD = gql`
  mutation updateCard($cardId: ID!, $frontText: String, $backText: String) {
    updateCard(cardId: $cardId, frontText: $frontText, backText: $backText) {
      _id
      frontText
      backText
      createdAt
    }
  }
`;


