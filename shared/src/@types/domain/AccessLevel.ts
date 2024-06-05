const ACCESS_LEVEL = {
    READ_ONLY: 'ReadOnly',
    READ_WRITE: 'ReadWrite',
} as const

type AccessLevel = typeof ACCESS_LEVEL[keyof typeof ACCESS_LEVEL];
export default AccessLevel;