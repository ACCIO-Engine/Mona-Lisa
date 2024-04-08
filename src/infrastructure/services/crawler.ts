import { BASE_URL } from "../api/api";

export const getDirs = async () => {
    return fetch(
        `${BASE_URL}/get_dirs`
    ).then((res) => {
        if (!res.ok) {
            throw new Error("Network response was not ok");
        }
        return res.json();
    });
};

export const addDirs = async (dirs: string[]) => {
    return fetch(`${BASE_URL}/add_to_dirs`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ dirs }),
    }).then((res) => {
        if (!res.ok) {
            throw new Error("Network response was not ok");
        }
        return res.json();
    });
}

export const addIgnoreDirs = async (dirs: string[]) => {
    return fetch(`${BASE_URL}/add_to_ignore`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ dirs }),
    }).then((res) => {
        if (!res.ok) {
            throw new Error("Network response was not ok");
        }
        return res.json();
    });
}

export const removeDirs = async (dirs: string[]) => {
    return fetch(`${BASE_URL}/remove_from_dirs`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ dirs }),
    }).then((res) => {
        if (!res.ok) {
            throw new Error("Network response was not ok");
        }
        return res.json();
    });
}

export const removeIgnoreDirs = async (dirs: string[]) => {
    return fetch(`${BASE_URL}/remove_from_ignore`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ dirs }),
    }).then((res) => {
        if (!res.ok) {
            throw new Error("Network response was not ok");
        }
        return res.json();
    });
}