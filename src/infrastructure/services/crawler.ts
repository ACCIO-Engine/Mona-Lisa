import { BASE_URL } from "../api/api";

export const getDirs = async () => {
    const response = await fetch(`${BASE_URL}/get_dirs`)
    if (!response.ok) {
        throw new Error("Network response was not ok");
    }
    return response.json();
};

export const insertDirs = async (dirs: string[]) => {
    console.log(JSON.stringify({ 'paths': dirs }))
    const respose = await fetch(`${BASE_URL}/add_to_dirs`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ 'pathsR': dirs }),
    });
    if (!respose.ok) {
        throw new Error("Network response was not ok");
    }
    return respose.json();
};

export const insertIgnoreDirs = async (dirs: string[]) => {
    const respose = await fetch(`${BASE_URL}/add_to_ignore`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ 'pathsR': dirs }),
    });
    if (!respose.ok) {
        throw new Error("Network response was not ok");
    }
    return respose.json();
};

export const removeDirs = async (dirs: string[]) => {
    const response = await fetch(`${BASE_URL}/remove_from_dirs`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ 'pathsR': dirs }),
    })
    if (!response.ok) {
        throw new Error("Network response was not ok");
    }
    return response.json();
};

export const removeIgnoreDirs = async (dirs: string[]) => {
    const response = await fetch(`${BASE_URL}/remove_from_ignore`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ 'pathsR': dirs }),
    });
    if (!response.ok) {
        throw new Error("Network response was not ok");
    }
    return response.json();
};