class PageFile {
    id: number
    pid: number
    title = ""
    url = ""

    constructor(id: number, pid: number, title: string, url: string) {
        this.id = id
        this.pid = pid
        this.title = title
        this.url = url
    }
}
export default PageFile