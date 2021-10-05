import { Card } from 'react-bootstrap'
import AxiosHelper from '../../../../utils/AxiosHelper';

interface iFileCard {
    item: {
        id: number,
        title: string,
        description: string,
        url: string
    }
}

function getExt(file: string) {
    var regexp = /\.([0-9a-z]+)(?:[?#]|$)/i;
    var extension = file.match(regexp);
    return extension && extension[1];
}


function IconRender({ ext }: { ext: string }) {
    if (ext === "png" || ext === "jpg" || ext === "jpeg") {
        return <i className="fa fa-file-image-o" style={{ fontSize: 35, color: "#FFF" }}></i>
    } else if (ext === "docx" || ext === "doc") {
        return <i className="fa fa-file-word-o" style={{ fontSize: 35, color: "#FFF" }}></i>
    } else if (ext === "pdf") {
        return <i className="fa fa-file-pdf-o" style={{ fontSize: 35, color: "#FFF" }}></i>
    } else {
        return <i className="fa fa-file-image-o" style={{ fontSize: 35, color: "#FFF" }}></i>
    }
}

function FileCard({ item }: iFileCard) {
    return (
        <>
            <Card className="m-1 d-flex justify-content-center align-items-center shadow" style={{ width: '200px' }}>
                <div className="mt-4 bg-dark d-flex justify-content-center align-items-center"
                    style={{ height: 60, width: 60, borderRadius: 100 }}
                >
                    <IconRender ext={getExt(item.url + "")!} />
                    {/* <i className="fa fa-file-image-o" style={{ fontSize: 35, color: "#FFF" }}></i> */}
                </div>
                <Card.Body>
                    <p className="text-center"><b>{item.title}</b>
                        <Card.Text>
                            {item.description}
                        </Card.Text>
                    </p>
                    <hr style={{ borderTop: "2px solid #5A5C69" }} />
                    <div className="d-flex justify-content-around align-items-center pt-0">
                        <a style={{ color: "#0f243c" }} className="a_url" target={"_blank"} href={item.url}>{item.title.trim() + "." + getExt(item.url + "")}</a>
                        <a style={{ color: "#0f243c" }} className="a_url" onClick={(e) => {
                            e.preventDefault()
                            AxiosHelper.downloadFile(item.url, item.title.trim() + "." + getExt(item.url + ""))
                        }}><i className="fas fa-download"></i></a>
                    </div>
                </Card.Body>
            </Card>
        </>
    )
}

export default FileCard
