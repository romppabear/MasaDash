export async function startServer(tag: string) {
    await fetch(`http://localhost:3000/api/v1/server/start/${tag}`, {
        method: "post"
    });
}
export async function stopServer(tag: string) {
    await fetch(`http://localhost:3000/api/v1/server/stop/${tag}`, {
        method: "post"
    });
}