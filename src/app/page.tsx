"use client";
import AuthContext from "@/contexts/AuthWrapper";
import { Character } from "@/types/Character";
import { gql, useQuery } from "@apollo/client";
import {
  Pagination,
  ButtonGroup,
  IconButton,
  Link,
  Image,
  CloseButton,
  Dialog,
  Portal,
  Badge,
  List,
  Flex,
  Center,
  Text,
} from "@chakra-ui/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

export default function InformationPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [pageNumber, setPageNumber] = useState(
    Number(searchParams.get("page")) || 1
  ); // default to 1 if not present, accounts for on first load scenario
  const [isCharacterInfoOpen, setIsCharacterInfoOpen] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(
    null
  );

  const { username, jobTitle } = useContext(AuthContext);

  const authenticated = username && jobTitle;

  // Always sync state with URL param (once mounted)
  useEffect(() => {
    router.push(`?page=${pageNumber}`);
  }, [router]);

  /*
   * Decided on the character endpoint to satisfy core requirements:
   * 1. Guarantees image availability for the data; whereas location and episodes do not
   * 2. Large and rich dataset -- characters are perfect for demonstrating an information page!
   * TODO: move this query to a separate folder e.g. graphql/queries.ts
   */

  const GET_CHARACTERS_QUERY = gql`
    query {
      characters(page: ${pageNumber}) {
        info {
          count
        }
        results {
          id,
          name,
          status,
          species,
          gender,
          image,
          location {
            name
          }
        }
      }
    }
  `;

  const { loading, error, data } = useQuery(GET_CHARACTERS_QUERY, {
    skip: !authenticated, // Only run query if user is authenticated
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // Don't show anything if user is not authenticated
  if (!authenticated) {
    return;
  }

  const handleNavigation = (page: number) => {
    setPageNumber(page);
    router.push(`?page=${page}`);
  };

  const handleCharacterClick = (character: Character) => {
    setIsCharacterInfoOpen(true);
    setSelectedCharacter(character);
  };

  return (
    <Flex className="info-page" minHeight="100vh" direction="column">
      <main>
        {/* Character List */}
        <Center marginBottom="20px">
          <List.Root width="75%">
            {data.characters.results.map(
              (character: Character, index: number) => (
                <List.Item key={`character-${index}`}>
                  <Link
                    href="#"
                    onClick={() => handleCharacterClick(character)}
                    color="#9094a6"
                  >
                    <Text textStyle="3xl">{character.name}</Text>
                  </Link>
                </List.Item>
              )
            )}
          </List.Root>
        </Center>
        {/* Pagination controls */}
        <Center>
          <Pagination.Root
            count={data?.characters.info.count}
            pageSize={20}
            page={pageNumber}
            defaultPage={1}
          >
            <ButtonGroup variant="ghost" size="sm">
              <Pagination.PrevTrigger asChild>
                <IconButton>
                  <LuChevronLeft />
                </IconButton>
              </Pagination.PrevTrigger>

              <Pagination.Items
                render={(page) => (
                  <IconButton
                    variant={{ base: "ghost", _selected: "solid" }}
                    onClick={() => handleNavigation(page.value)}
                  >
                    {page.value}
                  </IconButton>
                )}
              />

              <Pagination.NextTrigger asChild>
                <IconButton>
                  <LuChevronRight />
                </IconButton>
              </Pagination.NextTrigger>
            </ButtonGroup>
          </Pagination.Root>
        </Center>
        {/* Dialog showing selected character details */}
        {selectedCharacter && isCharacterInfoOpen && (
          <Dialog.Root open={true}>
            <Portal>
              <Dialog.Backdrop />
              <Dialog.Positioner>
                <Dialog.Content>
                  <Dialog.Header>
                    <Dialog.Title>{selectedCharacter.name}</Dialog.Title>
                    <Badge>{selectedCharacter.status}</Badge>
                  </Dialog.Header>
                  <Dialog.Body>
                    <Flex>
                      <Image
                        h="240px"
                        src={selectedCharacter.image}
                        alt={`Image of ${selectedCharacter.name}`}
                      />
                      <List.Root as="ul">
                        <List.Item>
                          Species: {selectedCharacter.species}
                        </List.Item>
                        <List.Item>
                          Gender: {selectedCharacter.gender}
                        </List.Item>
                        <List.Item>
                          Location: {selectedCharacter.location.name}
                        </List.Item>
                      </List.Root>
                    </Flex>
                  </Dialog.Body>
                  <Dialog.Footer></Dialog.Footer>
                  <Dialog.CloseTrigger
                    asChild
                    onClick={() => setIsCharacterInfoOpen(false)}
                  >
                    <CloseButton size="sm" />
                  </Dialog.CloseTrigger>
                </Dialog.Content>
              </Dialog.Positioner>
            </Portal>
          </Dialog.Root>
        )}
      </main>
      {/* Footer - fixed to bottom */}
      <Center
        as="footer"
        w="100%"
        backgroundColor="#9a3eaa"
        padding="20px"
        position="fixed"
        bottom={0}
      >
        <Text textStyle="lg" color="#FFF">
          Leonardo Challenge v3.5
        </Text>
      </Center>
    </Flex>
  );
}
