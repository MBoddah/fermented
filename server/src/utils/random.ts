export function getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export function tossCoin(): boolean {
    return Math.random() > 0.5 ? true : false;
}
