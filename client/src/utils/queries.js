import { gql } from '@apollo/client';

export const QUERY_CREATECARDS= gql`
  query createCards($title: String!, $frontText: String!, $backText: String!, $cardCount: Int!) {
    createCards(title: $title, frontText: $frontText, backText: $backText, cardCount: $cardCount)
  }
`;

export const QUERY_ALL_USERS = gql`
  query allUsers {
    users {
      _id
      username
      decks{
        _id
        title
        description
      }
    }
  }
`;

export const QUERY_SINGLE_USER = gql`
  query singleUser($userId: ID!) {
      user(userId: $userId) {
        _id
        username
        decks{
          _id
          title
          description
            cards {
              frontText
              backText
          }
      }
    }
  }
`;

export const QUERY_ME = gql`
  query me {
      user {
        _id
        username
        decks{
          _id
          title
          description
            cards {
              frontText
              backText
          }
      }
    }
  }
`;

