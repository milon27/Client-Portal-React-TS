import React from 'react'
import { Tab, Tabs } from 'react-bootstrap'
import Define from '../../../../utils/Define'
import DataBoxList from './DataBoxList'
import FileList from './FileList'
import { PageFile } from './PageDetails'
import { useState, useEffect, useContext } from 'react';
import { StateContext } from '../../../../utils/context/MainContext'

interface iPageTab {
    content: PageFile
}

function PageTab({ content }: iPageTab) {


    //none
    if (content?.data_one === Define.NOT_SET_STR && content?.data_two === Define.NOT_SET_STR && content?.data_three === Define.NOT_SET_STR && content?.files.length === 0) {
        return <h3>Please contact your Account Manager at rb@lighter.ai to upgrade.</h3>
    }

    //only databox
    if (content?.files.length === 0) {
        return <Tabs activeKey="databox" defaultActiveKey="databox" id="databox-tab-example" className="mb-3">
            <Tab eventKey="databox" title="Dashboard">
                <DataBoxList one={content?.data_one + ""} two={content?.data_two + ""} three={content?.data_three + ""} />
            </Tab>
        </Tabs>
    }

    //only files
    if (content?.data_one === Define.NOT_SET_STR && content?.data_two === Define.NOT_SET_STR && content?.data_three === Define.NOT_SET_STR) {
        return <Tabs activeKey="files" defaultActiveKey="files" id="files-tab-example" className="mb-3">
            <Tab eventKey="files" title="Files">
                <FileList files={content?.files} />
            </Tab>
        </Tabs>
    }



    //both
    return (
        <Tabs defaultActiveKey="databox" id="both-tab-example" className="mb-3">
            <Tab eventKey="databox" title="Dashboard">
                <DataBoxList one={content?.data_one + ""} two={content?.data_two + ""} three={content?.data_three + ""} />
            </Tab>
            <Tab eventKey="files" title="Files">
                <FileList files={content?.files} />
            </Tab>
        </Tabs>
    )

}

export default PageTab
