"use client";
import AuthContext from "@/contexts/AuthWrapper";
import { gql, useQuery } from "@apollo/client";
import { Pagination, ButtonGroup, IconButton } from "@chakra-ui/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

export default function InformationPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [pageNumber, setPageNumber] = useState(
    Number(searchParams.get("page")) || 1
  ); // default to 1 if not present, accounts for on first load scenario

  const { username, jobTitle } = useContext(AuthContext);
  const authenticated = username && jobTitle;

  useEffect(() => {
    router.push(`?page=${pageNumber}`);
  }, []);
  /*
   * Decided on the character endpoint to satisfy core requirements:
   * 1. Guarantees image availability for the data; location and episodes do not
   * 2. Large and rich dataset -- characters are perfect for demonstrating an information page!
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
          image
        }
      }
    }
  `;

  const { loading, error, data } = useQuery(GET_CHARACTERS_QUERY, {
    skip: !authenticated,
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!authenticated) {
    return;
  }

  const handleNavigation = (page: any) => {
    setPageNumber(page.value);
    router.push(`?page=${page.value}`);
  };

  return (
    <div>
      <main>
        <ul>
          {data.characters.results.map((character: any) => (
            <li>{character.name}</li>
          ))}
        </ul>
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
                  variant={{ base: "ghost", _selected: "outline" }}
                  onClick={() => handleNavigation(page)}
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
      </main>
      <footer>Leonardo Challenge v3.5</footer>
    </div>
  );
}
