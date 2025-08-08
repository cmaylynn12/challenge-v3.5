import AuthContext from "@/contexts/AuthWrapper";
import { Character } from "@/types/Character";
import { Flex, Center, SimpleGrid } from "@chakra-ui/react";
import { useContext } from "react";
import CharacterCard from "./CharacterCard";
import { GET_CHARACTERS_QUERY } from "@/queries/getCharacters";
import { useQuery } from "@apollo/client";

type CharacterGridProps = {
  page: number;
};

export const CharacterGrid = ({ page }: CharacterGridProps) => {
  const { username, jobTitle } = useContext(AuthContext);
  const authenticated = username && jobTitle;

  const { error, data } = useQuery(GET_CHARACTERS_QUERY, {
    variables: { page },
    fetchPolicy: "cache-and-network",
    skip: !authenticated, // Only run query if user is authenticated
  });

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // Don't show anything if user is not authenticated
  if (!authenticated) {
    return;
  }

  return (
    <Flex className="info-page" direction="column" minH="400px">
      <main>
        {/* Character List */}
        <Center marginBottom="20px" transition="backgrounds 0.2s ease-in-out">
          <SimpleGrid columns={5} gap="25px">
            {data?.characters.results.map(
              (character: Character, index: number) => (
                <CharacterCard
                  tabIndex={index + 1}
                  character={character}
                  key={`character-${index}`}
                />
              )
            )}
          </SimpleGrid>
        </Center>
      </main>
    </Flex>
  );
};
