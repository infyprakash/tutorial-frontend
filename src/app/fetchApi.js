export async function fetchData(url) {
    const res = await fetch(`${process.env.HOST}${url}`, {
        method: 'GET',
        headers: {
            'accept': 'application/json',
            'token': process.env.API_TOKEN
        },
    });
    if (!res.ok) {
        console.error(`Fetch failed: ${res.status} ${res.statusText}`);
        return null;
        // throw new Error("Error fetching data from server");
    }
    return res.json();
}