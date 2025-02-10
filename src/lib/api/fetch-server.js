export async function fetchServer(url) {
    try {
        const response = await fetch(url)
        return await response.json()
    } catch (error) {
        throw new Error(error)
    }
}