import { Dispatch, SetStateAction, useContext, useEffect } from 'react';
import { StateContext } from './../../../../utils/context/MainContext';
import AxiosHelper from './../../../../utils/AxiosHelper';
import { useState } from 'react';
import { Col, Row } from "react-bootstrap";
import RenderFile from './RenderFile';
import Define from './../../../../utils/Define';
import PageTab from './PageTab';


export interface PageFile {
    id: number
    uid: number
    title: string
    title_sidebar: string
    icon: string
    data_one: string
    data_two: string
    data_three: string
    files: {
        id: number,
        title: string,
        description: string,
        url: string
    }[]
}


interface iPageDetails {
    setPageTitle: Dispatch<SetStateAction<string>>
}
const PageDetails = ({ setPageTitle }: iPageDetails) => {

    const { page } = useContext(StateContext)

    const [details, setDetails] = useState<PageFile>()

    useEffect(() => {
        const source = AxiosHelper.getSource()
        const load = async () => {
            const result = await AxiosHelper.getData<PageFile>(`page/get-files/${page}`, source)
            if (result.success === true) {
                setDetails(result.obj)
                setPageTitle(result.obj?.title + "")
            }

        }
        load()
        return () => {
            source.cancel()
        }
    }, [page])


    return (
        <div>
            <Row>
                <Col>
                    <PageTab content={details!} />
                </Col>
            </Row>
            {/* <Row>

                {details?.data_one === Define.NOT_SET_STR && details?.data_two === Define.NOT_SET_STR && details?.data_three === Define.NOT_SET_STR ? <>
                    <Col>
                        <h4>we dont have any databox data.</h4>
                        {details?.files.length! < 1 ? <h3>No Files Found</h3> : <h3>Files</h3>}
                        <div className="d-flex flex-wrap justify-content-start">
                            {details?.files.map(item => {
                                return <RenderFile key={item.id} id={item.id} title={item.title} url={item.url} />
                            })}
                        </div>
                    </Col>
                </> :
                    <>
                        <Col md={7}>
                            <h3>Data Box Date</h3>
                            <div>
                                {details?.data_one !== Define.NOT_SET_STR ? <>
                                    <iframe title="one" frameBorder="1" allowFullScreen src={details?.data_one} width={"100%"} height={"350px"}></iframe>
                                </> : <></>}
                                {details?.data_two !== Define.NOT_SET_STR ? <>
                                    <iframe title="two" frameBorder="1" allowFullScreen src={details?.data_two} width={"100%"} height={"350px"}></iframe>
                                </> : <></>}
                                {details?.data_three !== Define.NOT_SET_STR ? <>
                                    <iframe title="three" frameBorder="1" allowFullScreen src={details?.data_three} width={"100%"} height={"350px"}></iframe>
                                </> : <></>}
                            </div>
                        </Col>
                        <Col md={5} >
                            {details?.files.length! < 1 ? <h3>No Files Found</h3> : <h3>Files</h3>}
                            <div className="d-flex flex-wrap justify-content-start">
                                {details?.files.map(item => {
                                    return <RenderFile key={item.id} id={item.id} title={item.title} url={item.url} />
                                })}

                            </div>
                        </Col>
                    </>
                }
            </Row> */}
        </div>
    )
}

export default PageDetails
