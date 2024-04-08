import { useMutation } from "@tanstack/react-query";
import { insertDirs } from "../../../infrastructure";

const useAddDirs = () => {
    return useMutation({ mutationFn: insertDirs });
};

export default useAddDirs;
