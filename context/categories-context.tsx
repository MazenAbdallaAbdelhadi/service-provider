import { getCategories } from "@/lib/api/categories-api";
import { Category } from "@/lib/interfaces/category";
import { useQuery } from "@tanstack/react-query";
import {
  useContext,
  createContext,
  useState,
  useEffect,
  PropsWithChildren,
} from "react";

interface ICategoryContext {
  categories: Category[];
  isLoading: boolean;
}

const CategoryContext = createContext<ICategoryContext | null>(null);

type Props = PropsWithChildren;

const CategoryProvider = ({ children }: Props) => {
  const [categories, setCategories] = useState<Category[]>([]);

  //   get Categoryed services
  const { data, isLoading } = useQuery({
    queryKey: ["category"],
    queryFn: () => getCategories(),
  });

  useEffect(() => {
    if (data?.data.docs) {
      setCategories(data.data.docs);
    }
  }, [data]);

  return (
    <CategoryContext.Provider
      value={{
        categories,
        isLoading,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

const useCategory = () => {
  const Category = useContext(CategoryContext);

  if (Category === null)
    throw new Error("useCategory must be used inside CategoryProvider");

  return Category;
};

export { useCategory, CategoryProvider };
