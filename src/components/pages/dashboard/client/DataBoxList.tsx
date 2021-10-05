import Define from '../../../../utils/Define'
import { Col, Row } from 'react-bootstrap';

interface iDataBoxList {
    one: string
    two: string
    three: string
}
function DataBoxList({ one, two, three }: iDataBoxList) {
    return (
        <Row>
            <Col>
                {one !== Define.NOT_SET_STR ? <>
                    <iframe title="one" frameBorder="1" allowFullScreen src={one} width={"100%"} height={"400px"}></iframe>
                </> : <></>}


                {two !== Define.NOT_SET_STR ? <>
                    <iframe title="two" frameBorder="1" allowFullScreen src={two} width={"100%"} height={"400px"}></iframe>
                </> : <></>}

                {three !== Define.NOT_SET_STR ? <>
                    <iframe title="three" frameBorder="1" allowFullScreen src={three} width={"100%"} height={"400px"}></iframe>
                </> : <></>}
            </Col>

        </Row >

    )
}

export default DataBoxList
