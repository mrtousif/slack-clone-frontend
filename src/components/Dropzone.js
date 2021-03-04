import React from "react";
import { useDropzone } from "react-dropzone";

export default function Dropzone(props) {
    const { onChange, disableClick, setFilesToUpload, style } = props;
    const onDrop = React.useCallback(
        (acceptedFiles) => {
            // Do something with the files
            console.log(acceptedFiles);
            setFilesToUpload(acceptedFiles);
        },
        [setFilesToUpload]
    );

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        noClick: disableClick ? true : false,
    });

    return (
        <div {...getRootProps({ style })}>
            <input {...getInputProps({ onChange })} />
            {props.children}
        </div>
    );
}
