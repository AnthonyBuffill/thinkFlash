import {gql} from '@apollo/client';

export const QUERY_CREATECARDS = gql`
query Query($title: String!, $back: String!, $cardCount: Int!, $front: String!) {
  createCards(title: $title, back: $back, cardCount: $cardCount, front: $front)
}
`;