"use client";
import CharacterList from "@/components/CharacterList";
import AuthContext from "@/contexts/AuthWrapper";
import { Suspense, useContext } from "react";

export default function InformationPage() {
  const { username, jobTitle } = useContext(AuthContext);

  return <Suspense>{username && jobTitle && <CharacterList />}</Suspense>;
}
