"use client";
import BlockerDialog from "@/components/BlockerDialog";
import { Provider } from "@/components/ui/provider";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { ReactNode, useState } from "react";
import { AuthProvider } from "./AuthWrapper";
import Header from "@/components/Header";

type AppWrapperProps = {
  children: ReactNode;
};

const client = new ApolloClient({
  uri: "https://rickandmortyapi.com/graphql",
  cache: new InMemoryCache(),
});

export const AppWrapper = ({ children }: AppWrapperProps) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <AuthProvider>
      <ApolloProvider client={client}>
        <Provider>
          <BlockerDialog isOpen={isOpen} setIsOpen={(e) => setIsOpen(e)} />
          <Header onOpen={() => setIsOpen(true)} />
          {children}
        </Provider>
      </ApolloProvider>
    </AuthProvider>
  );
};
