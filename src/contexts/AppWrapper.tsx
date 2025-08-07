"use client";
import BlockerDialog from "@/components/BlockerDialog";
import { Provider } from "@/components/ui/provider";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { ReactNode } from "react";
import { AuthProvider } from "./AuthWrapper";

type AppWrapperProps = {
  children: ReactNode;
};

const client = new ApolloClient({
  uri: "https://rickandmortyapi.com/graphql",
  cache: new InMemoryCache(),
});

export const AppWrapper = ({ children }: AppWrapperProps) => {
  return (
    <AuthProvider>
      <ApolloProvider client={client}>
        <Provider>
          <BlockerDialog />
          {children}
        </Provider>
      </ApolloProvider>
    </AuthProvider>
  );
};
