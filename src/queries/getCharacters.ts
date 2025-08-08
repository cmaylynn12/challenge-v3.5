import { gql } from "@apollo/client";

/*
 * Decided on the character endpoint to satisfy core requirements:
 * 1. Guarantees image availability for the data; whereas location and episodes do not
 * 2. Large and rich dataset -- characters are perfect for demonstrating an information page!
 */

export const GET_CHARACTERS_QUERY = gql`
  query GetCharacters($page: Int!) {
    characters(page: $page) {
      info {
        count
        pages
      }
      results {
        id
        name
        status
        species
        gender
        image
        origin {
          name
        }
        location {
          name
        }
      }
    }
  }
`;
