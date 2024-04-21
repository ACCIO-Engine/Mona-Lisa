import { QueryClient, useMutation } from "@tanstack/react-query";
import { removeDirs } from "../../../infrastructure";

const useRemoveDirs = (queryClient: QueryClient) => {
    return useMutation({
        mutationKey: ['removeDirs'],
        mutationFn: (dirs: string[]) => removeDirs(dirs),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['directories'] })
        },
        onError: () => {
            console.error('Error in mutation')
        }
    }
    );
};

export default useRemoveDirs;
