import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { CharacterGrid } from "./CharacterGrid";
import Paginator from "./Pagination";

export const CharacterList = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [pageNumber, setPageNumber] = useState(
    Number(searchParams.get("page") || 1)
  );

  useEffect(() => {
    if (!searchParams.get("page")) router.push("?page=1");
  }, [pageNumber, searchParams, router]);
  return (
    <>
      <CharacterGrid page={pageNumber} />
      <Paginator page={pageNumber} onNavigate={(e) => setPageNumber(e)} />
    </>
  );
};

export default CharacterList;
