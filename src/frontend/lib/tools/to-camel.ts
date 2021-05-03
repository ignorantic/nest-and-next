const toCamel = (str: string): string => str.replace(/[-_]([a-z])/g, (m) => m[1].toUpperCase());

export default toCamel;
