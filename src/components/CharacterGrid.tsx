import AuthContext from "@/contexts/AuthWrapper";
import { Character } from "@/types/Character";
import { Flex, Center, SimpleGrid } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import CharacterCard from "./CharacterCard";
import { GET_CHARACTERS_QUERY } from "@/queries/getCharacters";
import { useQuery } from "@apollo/client";
import { keyframes } from "@emotion/react";

type CharacterGridProps = {
  page: number;
};

export const CharacterGrid = ({ page }: CharacterGridProps) => {
  const [animateKey, setAnimateKey] = useState(page);
  const { username, jobTitle } = useContext(AuthContext);
  const authenticated = username && jobTitle;

  const { loading, error, data } = useQuery(GET_CHARACTERS_QUERY, {
    variables: { page },
    fetchPolicy: "cache-and-network",
    skip: !authenticated, // Only run query if user is authenticated
  });

  useEffect(() => {
    setAnimateKey(page);
  }, [page]);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // Don't show anything if user is not authenticated
  if (!authenticated) {
    return;
  }

  const fadeIn = keyframes`
  from {opacity: 0;}
  to {opacity: 1}`;

  return (
    <Flex
      overflow="hidden"
      className="info-page"
      direction="column"
      minH="695px"
      key={animateKey}
      animation={`${fadeIn} 0.7s ease`}
    >
      <main>
        {/* Character Grid */}
        {!loading ? (
          <Center marginBottom="20px">
            <SimpleGrid columns={5} gap="25px">
              {data?.characters.results.map(
                (character: Character, index: number) => (
                  <CharacterCard
                    character={character}
                    key={`character-${index}`}
                  />
                )
              )}
            </SimpleGrid>
          </Center>
        ) : (
          <Center height="100%" width="100%"></Center>
        )}
      </main>
    </Flex>
  );
};
