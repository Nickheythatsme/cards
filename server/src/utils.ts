
export const logError = (message: string, location?: string): void => {
    if (location) {
        console.error(`ERROR (${location}): ${message}`);
    } else {
        console.error(`ERROR: ${message}`);
    }
}