export async function fetchServer(url) {
    try {
        const response = await fetch(url)

        if (!response.ok) {
            console.error(`fetching error. status: ${response.status}`)
            return null
        }

        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
            console.warn("Warning: response is not JSON.")
            return null
        }

        return await response.json()
    } catch (error) {
        throw new Error(error)
    }
}