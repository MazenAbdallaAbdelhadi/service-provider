import { useBookMark } from "@/context/bookmark-context";
import { addToWishlist, removeFromWishlist } from "@/lib/api/wishlist-api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useBookMarkApi = () => {
  const queryClient = useQueryClient();

  const { wishlist } = useBookMark();
  //   add service to bookmark
  const { mutate: addMutate, isPending: isPendingAdd } = useMutation({
    mutationKey: ["wishlist"],
    mutationFn: addToWishlist,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["wishlist"],
      });
    },
  });

  //   remove service from bookmark
  const { mutate: removeMutate, isPending: isPendingRemove } = useMutation({
    mutationKey: ["wishlist"],
    mutationFn: removeFromWishlist,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["wishlist"],
      });
    },
  });

  //   check if service is in bookmark
  const isServiceInBookmark = (serviceId: string) => {
    const service = wishlist.find((s) => s._id === serviceId);

    return !!service;
  };

  return {
    addMutate,
    isPendingAdd,
    removeMutate,
    isPendingRemove,
    isServiceInBookmark,
  };
};
