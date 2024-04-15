import { QueryClient, useMutation } from "@tanstack/react-query";
import { insertDirs } from "../../../infrastructure";

const useAddDirs = (queryClient: QueryClient) => {
    return useMutation({
        mutationKey: ['insertDirs'],
        mutationFn: (dirs: string[]) => insertDirs(dirs),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['directories'] })
        },
        onError: () => {
            console.error('Error in mutation')
        }
    }
    );
};

export default useAddDirs;
