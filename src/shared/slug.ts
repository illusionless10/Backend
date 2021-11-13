export function convertSlug(text: string): string {
    const result = text.replace(' ', '-');
    return result;
}

export function reserveSlug(text: string): string {
    const result = text.replace('-', ' ');
    return result;
}