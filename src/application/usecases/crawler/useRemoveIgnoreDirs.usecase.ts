import { QueryClient, useMutation } from "@tanstack/react-query";
import { removeIgnoreDirs } from "../../../infrastructure";

const useRemoveIgnoreDirs = (queryClient: QueryClient) => {
    return useMutation({
        mutationKey: ['removeIgnoreDirs'],
        mutationFn: (dirs: string[]) => removeIgnoreDirs(dirs),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['directories'] })
        },
        onError: () => {
            console.error('Error in mutation')
        }
    }
    );
};

export default useRemoveIgnoreDirs;
