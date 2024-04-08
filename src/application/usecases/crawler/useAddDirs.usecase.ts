import { useMutation, QueryClient } from "@tanstack/react-query";
import { insertDirs } from "../../../infrastructure";

const useAddDirs = () => {
    const queryClient = new QueryClient();
    return useMutation({
        mutationFn: insertDirs,
        // onSuccess: () => {
        //     queryClient.invalidateQueries(["directories"]);
        // },
    });
};

export default useAddDirs;
