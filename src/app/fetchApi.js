export async function fetchData(url) {
    const res = await fetch(`${process.env.HOST}tutorial/${url}`, {
        method: 'GET',
        headers: {
            'accept': 'application/json',
            'token': process.env.API_TOKEN
        },
        // next: { revalidate: 60 }
    });
    return res;

    // if (!res.ok) {
    //     throw new Error(`Failed to fetch: ${res.status}`);
    // }
    // return res.json();
}


export async function fetchNecData(url) {
    const res = await fetch(`${process.env.HOST}nec/${url}`, {
        method: 'GET',
        headers: {
            'accept': 'application/json',
            'token': process.env.API_TOKEN
        },
        // next: { revalidate: 60 }
    });
    return res;

    // if (!res.ok) {
    //     throw new Error(`Failed to fetch: ${res.status}`);
    // }
    // return res.json();
}