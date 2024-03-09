import { gql } from '@apollo/client';

export const QUERY_CREATECARDS= gql`
query Query($title: String!, $back: String!, $cardcount: Int!, $frontText: String!){
  createCards(title: $title, bckText: $backText, cardCount: $cardCount, frontText: $frontText)
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
    }
  }
`;

