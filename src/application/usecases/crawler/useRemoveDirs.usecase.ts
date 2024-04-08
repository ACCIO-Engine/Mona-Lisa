import { useMutation } from "@tanstack/react-query";
import { removeDirs } from "../../../infrastructure";

const useRemoveDirs = () => {
    return useMutation({ mutationFn: removeDirs });
};

export default useRemoveDirs;
