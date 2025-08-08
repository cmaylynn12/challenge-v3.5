import { Center, ButtonGroup, IconButton, Pagination } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

type PageNavigatorProps = {
  page: number;
  onNavigate: (pageNumber: number) => void;
};

export const Paginator = ({ page, onNavigate }: PageNavigatorProps) => {
  const router = useRouter();

  const handleOnNavigate = (pageNumber: number) => {
    onNavigate(pageNumber);
    router.push(`?page=${pageNumber}`);
  };

  return (
    <Center>
      <Pagination.Root
        count={826}
        pageSize={20}
        page={page}
        defaultPage={1}
        onPageChange={(e) => handleOnNavigate(e.page)}
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
                key={`page-${page.value}`}
                variant={{ base: "ghost", _selected: "solid" }}
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
  );
};

export default Paginator;
