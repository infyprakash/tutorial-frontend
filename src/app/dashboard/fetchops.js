export async function fetchData(url) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}tutorial/${url}`, {
        method: 'GET',
        headers: {
            'accept': 'application/json',
            'token': process.env.NEXT_PUBLIC_API_TOKEN
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
    const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}nec/${url}`, {
        method: 'GET',
        headers: {
            'accept': 'application/json',
            'token': process.env.NEXT_PUBLIC_API_TOKEN
        },
        // next: { revalidate: 60 }
    });
    return res;

    // if (!res.ok) {
    //     throw new Error(`Failed to fetch: ${res.status}`);
    // }
    // return res.json();
}

export async function postData(params) {
    console.log(params)
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_HOST}${params.url}`,
            {
                method: "POST",
                headers: {
                    token: process.env.NEXT_PUBLIC_API_TOKEN,
                    "Content-type": "application/json",
                },
                body: JSON.stringify(params.formData),
            }
        );
        if (!response.ok) {
            throw new Error("Error creating new content");
        }
        return response.json();
    } catch (error) {
        throw new Error(error);
    }
}

export async function updateData(params) {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_HOST}${params.url}`,
            {
                method: "PUT",
                headers: {
                    token: process.env.NEXT_PUBLIC_API_TOKEN,
                    "Content-type": "application/json",
                },
                body: JSON.stringify(params.formData),
            }
        );
        if (!response.ok) {
            throw new Error("Error creating new content");
        }
        return response.json();
    } catch (error) {
        throw new Error(error);
    }
}