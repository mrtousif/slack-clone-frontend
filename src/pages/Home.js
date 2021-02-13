import React from "react";
import { useQuery } from "@apollo/client";
import Loading from "../components/Loading";
import { GET_WORKSPACES } from "../graphql/graphql";
import { Redirect } from "react-router-dom";

export default function Home(props) {
    const { loading, data = {}, error } = useQuery(GET_WORKSPACES);
    let workspaces = [];

    if (data.getWorkspacesByMember || data.getWorkspacesByOwner) {
        const { getWorkspacesByMember, getWorkspacesByOwner } = data;
        workspaces = [...getWorkspacesByMember, ...getWorkspacesByOwner];
        console.log(workspaces);

        // props.history.push(`/${workspaces[0].id}`)
        return <Redirect to={`${workspaces[0].id}`} />;
    } else if (data.getWorkspaces && data.getWorkspaces.length === 0) {
        return <Redirect to={`/create-workspace`} />;
    }

    if (error) console.log(error);

    return loading && <Loading />;
}
