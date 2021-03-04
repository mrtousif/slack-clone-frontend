import { gql } from "@apollo/client";

export const GET_USER_WORKSPACES = gql`
    query getUserWorkspaces {
        getUserWorkspaces {
            id
            name
            admin
            owner
            channels {
                id
                name
            }
            directMessageMembers {
                id
                name
                photo
            }
        }
    }
`;

export const GET_WORKSPACE = gql`
    query getWorkspace($workspaceId: ID!) {
        getWorkspace(workspaceId: $workspaceId) {
            id
            name
            owner
            channels {
                id
                name
            }
            directMessageMembers {
                id
                name
                photo
            }
        }
    }
`;

export const GET_CHANNEL = gql`
    query getChannel($channelId: ID!) {
        getChannel(channelId: $channelId) {
            id
            name
            owner
            # messages {
            #     id
            #     text
            #     owner
            # }
        }
    }
`;

export const GET_MESSAGES = gql`
    query getMessages($channelId: ID!) {
        getMessages(channelId: $channelId) {
            id
            text
            url
            fileType
            user {
                id
                name
                photo
            }
            createdAt
        }
    }
`;

export const MESSAGE_SUBSCRIPTION = gql`
    subscription newMessage($channelId: ID!) {
        newMessage(channelId: $channelId) {
            id
            text
            url
            fileType
            user {
                id
                name
                photo
            }
            createdAt
        }
    }
`;

export const GET_DIRECT_MESSAGES = gql`
    query getDirectMessages($receiverId: ID!, $workspaceId: ID!) {
        getUser(userId: $receiverId) {
            name
        }
        getDirectMessages(receiverId: $receiverId, workspaceId: $workspaceId) {
            id
            text
            user {
                id
                name
                photo
            }
            createdAt
        }
    }
`;

export const GET_WORKSPACE_MEMBERS = gql`
    query getWorkspaceMembers($workspaceId: ID!) {
        getWorkspaceMembers(workspaceId: $workspaceId) {
            id
            name
            photo
        }
    }
`;

export const CREATE_WORKSPACE = gql`
    mutation createWorkspace($name: String!) {
        createWorkspace(name: $name) {
            id
            name
            channels {
                id
                name
            }
        }
    }
`;

export const CREATE_MESSAGE = gql`
    mutation createMessage($channelId: ID!, $message: String!, $file: Upload) {
        createMessage(channelId: $channelId, text: $message, file: $file) {
            id
            text
            createdAt
        }
    }
`;

export const CREATE_DIRECT_MESSAGE = gql`
    mutation createDirectMessage($receiverId: ID!, $message: String!, $workspaceId: ID!) {
        createDirectMessage(
            receiverId: $receiverId
            text: $message
            workspaceId: $workspaceId
        ) {
            id
            text
            createdAt
        }
    }
`;

export const CREATE_CHANNEL = gql`
    mutation createChannel(
        $workspaceId: ID!
        $name: String!
        $description: String
        $private: Boolean
    ) {
        createChannel(
            workspaceId: $workspaceId
            name: $name
            description: $description
            private: $private
        ) {
            id
            name
            private
        }
    }
`;

export const DIRECT_MESSAGE_SUBSCRIPTION = gql`
    subscription newDirectMessage($receiverId: ID!, $workspaceId: ID!) {
        newDirectMessage(receiverId: $receiverId, workspaceId: $workspaceId) {
            id
            text
            user {
                id
                name
                photo
            }
            createdAt
        }
    }
`;

export const ADD_WORKSPACE_MEMBERS = gql`
    mutation addWorkspaceMembers($workspaceId: ID!, $emails: [String!]!) {
        addWorkspaceMembers(workspaceId: $workspaceId, emails: $emails) {
            ok
        }
    }
`;

export const ADD_CHANNEL_MEMBERS = gql`
    mutation addWorkspaceMembers($channelId: ID!, $emails: [String!]!) {
        addWorkspaceMembers(channelId: $channelId, emails: $emails) {
            ok
        }
    }
`;

export const SIGNUP_INPUT = gql`
    mutation signup(
        $name: String!
        $email: String!
        $password: String!
        $confirmPassword: String!
    ) {
        signup(
            name: $name
            email: $email
            password: $password
            confirmPassword: $confirmPassword
        ) {
            id
            email
            photo
            token
        }
    }
`;

export const LOGIN_INPUT = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            id
            name
            email
            photo
            token
        }
    }
`;
