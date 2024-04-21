import { insertIgnoreDirs } from "../../../infrastructure";
import { QueryClient, useMutation } from "@tanstack/react-query";

const useAddIgnoreDirs = (queryClient: QueryClient) => {
    return useMutation({
        mutationKey: ['insertIgnoreDirs'],
        mutationFn: (dirs: string[]) => insertIgnoreDirs(dirs),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['directories'] })
        },
        onError: () => {
            console.error('Error in mutation')
        }
    }
    );
};
export default useAddIgnoreDirs;