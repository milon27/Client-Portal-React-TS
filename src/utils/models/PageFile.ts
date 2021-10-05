class PageFile {
    id: number
    pid: number
    title = ""
    description = ""
    url = ""

    constructor(id: number, pid: number, title: string, description: string, url: string) {
        this.id = id
        this.pid = pid
        this.title = title
        this.description = description
        this.url = url
    }
}
export default PageFile