import { useMutation, QueryClient } from "@tanstack/react-query";
import { insertDirs } from "../../../infrastructure";

const useAddDirs = () => {
    const queryClient = new QueryClient();
    return useMutation({
        mutationKey: ['insertDirs'],
        mutationFn: insertDirs,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['directories'] })
        },
    });
};

export default useAddDirs;
