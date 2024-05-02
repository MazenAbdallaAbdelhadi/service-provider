import { getMyWishlist } from "@/lib/api/wishlist-api";
import { Service } from "@/lib/interfaces/service";
import { useQuery } from "@tanstack/react-query";
import {
  useContext,
  createContext,
  useState,
  useEffect,
  PropsWithChildren,
} from "react";

interface IBookMarkContext {
  wishlist: Service[];
  wishistLength: number | undefined;
  isLoading: boolean;
}

const bookMarkContext = createContext<IBookMarkContext | null>(null);

type Props = PropsWithChildren;

const BookMarkProvider = ({ children }: Props) => {
  const [wishlist, setWishList] = useState<Service[]>([]);

  //   get bookmarked services
  const { data, isLoading } = useQuery({
    queryKey: ["wishlist"],
    queryFn: getMyWishlist,
  });

  useEffect(() => {
    if (data?.data.wishlist) {
      setWishList(data.data.wishlist);
    }
  }, [data]);

  return (
    <bookMarkContext.Provider
      value={{
        wishlist,
        wishistLength: data?.data.results,
        isLoading,
      }}
    >
      {children}
    </bookMarkContext.Provider>
  );
};

const useBookMark = () => {
  const BookMark = useContext(bookMarkContext);

  if (BookMark === null)
    throw new Error("useBookMark must be used inside BookMarkProvider");

  return BookMark;
};

export { useBookMark, BookMarkProvider };
