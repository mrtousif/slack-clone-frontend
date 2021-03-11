import React from "react";
import { useQuery } from "@apollo/client";
import Loading from "../components/Loading";
import { GET_USER_WORKSPACES } from "../graphql/graphql";
import { useHistory } from "react-router-dom";

export default function Home() {
    const history = useHistory();
    // const workspaceId = props.params.workspaceId;
    const { loading, data, error } = useQuery(GET_USER_WORKSPACES, {
        fetchPolicy: "network-only",
    });

    React.useEffect(() => {
        if (data?.getUserWorkspaces) {
            const { getUserWorkspaces } = data;
            const workspaces = [...getUserWorkspaces];

            if (workspaces.length < 1) {
                history.push(`/create-workspace`);
            }

            history.push({
                pathname: `/${workspaces[0].id}/${workspaces[0].channels[0].id}`,
                state: { workspaces },
            });
        }
    }, [data, history]);

    if (error) console.error(error);

    return loading && <Loading />;
}
