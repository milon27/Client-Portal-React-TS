import React, { FC } from 'react'

import DOC_IMG from '../../../../assets/img/doc.jpg'
import PDF_IMG from '../../../../assets/img/pdf.jpg'
import IMG_IMG from '../../../../assets/img/img.jpg'
import AxiosHelper from './../../../../utils/AxiosHelper';


function getExt(file: string) {
    var regexp = /\.([0-9a-z]+)(?:[?#]|$)/i;
    var extension = file.match(regexp);
    return extension && extension[1];
}

interface iRenderFile {
    id: number,
    title: string,
    url: string
}

interface iSingle {
    item: iRenderFile,
    img: string,
    extention: string
}


const SingleImg: FC<iSingle> = ({ item, img, extention }) => {
    return <span className="fileItem" style={
        {
            padding: 0,
            background: "#EDEDED"
        }
    }>

        <div className="d-flex justify-content-around align-items-center">
            <a className="a_url" target={"_blank"} href={item.url}>{item.title.trim() + "." + extention}</a>
            <a className="a_url" onClick={(e) => {
                e.preventDefault()
                AxiosHelper.downloadFile(item.url, item.title.trim() + "." + extention)
            }}><i className="fas fa-download"></i></a>
        </div>
        {/* <a className="a_url" href={item.url} download>
            <img src={item.url} style={{ width: "130px", height: "190px" }} />
        </a> */}

        <img src={img} style={{ width: "130px", height: "190px" }} />
    </span >
}


const RenderFile: FC<iRenderFile> = (item) => {

    if (getExt(item.url) === "png" || getExt(item.url) === "jpg" || getExt(item.url) === "jpeg") {
        return <SingleImg img={IMG_IMG} extention={getExt(item.url) + ""} item={item} />
    } else if (getExt(item.url) === "docx" || getExt(item.url) === "doc") {
        return <SingleImg img={DOC_IMG} extention={getExt(item.url) + ""} item={item} />
    } else if (getExt(item.url) === "pdf") {
        return <SingleImg img={PDF_IMG} extention={getExt(item.url) + ""} item={item} />
    } else {
        return <SingleImg img={PDF_IMG} extention={getExt(item.url) + ""} item={item} />
    }
}



export default RenderFile