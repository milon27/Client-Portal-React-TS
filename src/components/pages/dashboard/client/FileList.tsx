import React from 'react';
import { Row } from 'react-bootstrap';
import FileCard from './FileCard';


interface iFileList {
    files: {
        id: number,
        title: string,
        description: string,
        url: string
    }[]
}

function FileList({ files }: iFileList) {
    return (
        <Row>
            <div className="d-flex flex-wrap justify-content-center">
                {
                    files?.map(item => {
                        return <React.Fragment key={item.id}>
                            <FileCard item={item!} />
                        </React.Fragment>
                    })
                }
            </div>
        </Row>
    )
}

export default FileList
