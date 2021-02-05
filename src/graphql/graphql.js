import { gql } from "@apollo/client";

export const GET_WORKSPACE = gql`
    query {
        getWorkspace(id: "96b529fb-8dce-4c95-8c50-d00fd9f7f9e1") {
            id
            name
            channels {
                id
                name
                workspaceId
            }
        }
    }
`;

export const GET_COMMENTS = gql`
    query getComments($postId: ID!) {
        getComments(postId: $postId) {
            _id
            body
            likes
            replies
            user {
                _id
                name
                photo
            }
            createdAt
            userLiked
        }
    }
`;

export const CREATE_CHANNEL = gql`
    mutation createChannel($workspaceId: ID!, $name: String!, $description: String) {
        createChannel(workspaceId: $workspaceId, name: $name, description: $description) {
            id
            name
            owner {
                id
                name
                photo
            }
        }
    }
`;

export const CREATE_WORKSPACE = gql`
    mutation createWorkspace($name: String!) {
        createWorkspace(name: $name) {
            id
            name
            owner {
                id
                name
                photo
            }
        }
    }
`;

export const LIKE_COMMENT = gql`
    mutation likeComment($commentId: ID!, $postId: ID!) {
        likeComment(commentId: $commentId, postId: $postId) {
            _id
            likes
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

export const GET_REPLIES = gql`
    query getReplies($commentId: ID!) {
        getReplies(commentId: $commentId) {
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
