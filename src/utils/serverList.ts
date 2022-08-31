export interface ServerListElement {
  name: string,
  description: string,
  tag: string,
  isJoinable: boolean,
  playerCount: number
}

export async function fetchServerList() {
  const res = await fetch("http://localhost:3000/api/v1/server-list", {
    method: "get"
  })
  const data = await res.json() as ServerListElement[]

  return data;
}