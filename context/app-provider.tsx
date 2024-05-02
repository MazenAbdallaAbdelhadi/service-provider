import queryClient from "@/query-client";
import { QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./auth-context";
import { PropsWithChildren } from "react";
import { BookMarkProvider } from "./bookmark-context";
import { CategoryProvider } from "./categories-context";

type Props = PropsWithChildren;

const AppProvider = ({ children }: Props) => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CategoryProvider>
          <BookMarkProvider>{children}</BookMarkProvider>
        </CategoryProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default AppProvider;
