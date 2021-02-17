import React from "react";
import { useQuery } from "@apollo/client";
import Loading from "../components/Loading";
import { GET_WORKSPACES } from "../graphql/graphql";
import { Redirect } from "react-router-dom";

export default function Home(props) {
    const { loading, data = {}, error } = useQuery(GET_WORKSPACES);
    let workspaces = [];

    if (data.getWorkspacesAsMember || data.getWorkspacesAsOwner) {
        const { getWorkspacesAsMember, getWorkspacesAsOwner } = data;
        workspaces = [...getWorkspacesAsMember, ...getWorkspacesAsOwner];
        // console.log(workspaces);

        // props.history.push(`/${workspaces[0].id}`)
        return (
            <Redirect
                workspaces={workspaces}
                to={{
                    pathname: `/${workspaces[0].id}/${workspaces[0].channels[0].id}`,
                    state: { workspaces },
                }}
            />
        );
    } else if (data.getWorkspaces && data.getWorkspaces.length === 0) {
        return <Redirect to={`/create-workspace`} />;
    }

    if (error) console.log(error);

    return loading && <Loading />;
}
