export type SignUpIdType = 'eventId' | 'userId' | 'signUpId'
export type SignUpStatus = 'pending' | ['accepted', string] | 'rejected'

export type SignUpData = {
    signUpId: string,
    eventId: string,
    userId: string,
    status: SignUpStatus,
    preferences: Array<string>,
    isRestricted: boolean,
    createdAt: Date
}
