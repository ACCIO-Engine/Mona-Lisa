import { useMutation } from "@tanstack/react-query";
import { removeIgnoreDirs } from "../../../infrastructure";

const useRemoveIgnoreDirs = () => {
    return useMutation({ mutationFn: removeIgnoreDirs });
};

export default useRemoveIgnoreDirs;
