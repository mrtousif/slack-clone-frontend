import { gql } from "@apollo/client";

export const GET_WORKSPACE = gql`
    query getWorkspace($workspaceId: ID!) {
        getWorkspace(workspaceId: $workspaceId) {
            id
            name
            members {
                id
                name
            }
        }
    }
`;

export const GET_WORKSPACES = gql`
    query {
        getWorkspacesAsOwner {
            id
            name
            owner
            channels {
                id
                name
            }
        }
        getWorkspacesAsMember {
            id
            name
            owner
            channels {
                id
                name
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
            messages {
                id
                text
                # owner
            }
        }
    }
`;

export const GET_MESSAGES = gql`
    query getMessages($channelId: ID!) {
        getMessages(channelId: $channelId) {
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
    mutation createMessage($channelId: ID!, $message: String!) {
        createMessage(channelId: $channelId, text: $message) {
            id
            text
            user {
                id
                name
            }
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

export const DELETE_COMMENT = gql`
    mutation deleteComment($commentId: ID!) {
        deleteComment(commentId: $commentId)
    }
`;

export const CREATE_POST = gql`
    mutation createPost($postId: ID!, $pageUrl: String!, $title: String) {
        createPost(postId: $postId, pageUrl: $pageUrl, title: $title)
    }
`;

export const UPDATE_POST = gql`
    mutation updatePost($postId: ID!) {
        updatePost(postId: $postId) {
            body
        }
    }
`;

export const CREATE_REPLY = gql`
    mutation createReply($commentId: ID!, $body: String!) {
        createReply(commentId: $commentId, body: $body) {
            id
            body
            likes
            user {
                id
                name
                photo
            }
            createdAt
        }
    }
`;

export const LIKE_REPLY = gql`
    mutation likeReply($replyId: ID!) {
        likeReply(replyId: $replyId) {
            id
            likes
        }
    }
`;

export const DELETE_REPLY = gql`
    mutation deletePost($postId: ID!) {
        deletePost(postId: $postId)
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
