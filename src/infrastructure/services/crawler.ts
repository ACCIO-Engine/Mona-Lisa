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

export const insertDirs = async (dirs: string[]) => {
    console.log(JSON.stringify({ 'paths': dirs }))
    return fetch(`${BASE_URL}/add_to_dirs`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ 'paths': dirs }),
    }).then((res) => {
        if (!res.ok) {
            throw new Error("Network response was not ok");
        }
        return res.json();
    });
}

export const insertIgnoreDirs = async (dirs: string[]) => {
    return fetch(`${BASE_URL}/add_to_ignore`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ 'paths': dirs }),
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
        body: JSON.stringify({ 'paths': dirs }),
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
        body: JSON.stringify({ 'paths': dirs }),
    }).then((res) => {
        if (!res.ok) {
            throw new Error("Network response was not ok");
        }
        return res.json();
    });
}