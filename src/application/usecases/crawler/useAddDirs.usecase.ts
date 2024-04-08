import { useMutation } from "@tanstack/react-query"
import { insertDirs } from "../../../infrastructure"

export default function useAddDirs() {
    const mutation = useMutation({
        mutationFn: (dirs: string[]) => {
            console.log(dirs)
            return insertDirs(dirs)
        },
    })

    return mutation
}
