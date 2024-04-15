import { useQuery } from "@tanstack/react-query";
import { getDirs } from "../../../infrastructure";

export default function useGetDirs() {
    const {
        data: dirs,
        isError,
        isLoading,
        isSuccess,
        error,
        status,
    } = useQuery({
        queryKey: ["directories"],
        queryFn: () => getDirs(),
        staleTime: Infinity
    });


    return {
        paths: dirs,
        isError,
        isLoading,
        isSuccess,
        error,
        status,
    };
}
