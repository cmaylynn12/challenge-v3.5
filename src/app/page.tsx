"use client";
import { CharacterGrid } from "@/components/CharacterGrid";
import { Paginator } from "@/components/Pagination";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

export default function InformationPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [pageNumber, setPageNumber] = useState(
    Number(searchParams.get("page") || 1)
  );

  useEffect(() => {
    if (!searchParams.get("page")) router.push("?page=1");
  }, [pageNumber]);

  return (
    <Suspense>
      <CharacterGrid page={pageNumber} />
      <Paginator page={pageNumber} onNavigate={(e) => setPageNumber(e)} />
    </Suspense>
  );
}
