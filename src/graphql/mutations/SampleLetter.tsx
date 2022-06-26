import { gql } from '@apollo/client'


export const CREATE_SAMPLE_LETTER = gql`
mutation CreateSampleLetter($userId: ID!, $hooks: [HookInput!]!, $sampleLetter: SampleLetterInput!) {
    createSampleLetter(userID: $userId, hooks: $hooks, sampleLetter: $sampleLetter) {
        id
        title
        text
    user {
            id
        }
    hooks {
            value
        }
    }
}`