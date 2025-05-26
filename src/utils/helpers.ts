export const formatDate = (date: Date, locale: string = 'en-US'): string => {
    return new Intl.DateTimeFormat(locale).format(date);
};

export const calculateSum = (numbers: number[]): number => {
    return numbers.reduce((acc, curr) => acc + curr, 0);
};

export const generateRandomId = (length: number = 8): string => {
    return Math.random().toString(36).substr(2, length);
};