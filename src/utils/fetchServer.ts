export interface ServerMeta {
    server: string,
    name: string,
    status: "online" | "offline"
}

export async function fetchServer(tag: string) {
    const res = await fetch(`http://localhost:3000/api/v1/server/${tag}`, {
        method: "get"
    })
    const data = await res.json() as ServerMeta

    return data;
}