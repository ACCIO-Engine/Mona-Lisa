import { useMutation } from "@tanstack/react-query";
import { insertIgnoreDirs } from "../../../infrastructure";

const useAddIgnoreDirs = () => {
    return useMutation({ mutationFn: insertIgnoreDirs });
};

export default useAddIgnoreDirs;
