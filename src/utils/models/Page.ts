class Page {
    id: number
    uid: number
    title = ""
    title_sidebar = ""
    icon = ""
    data_one = ""
    data_two = ""
    data_three = ""

    constructor(id: number, uid: number, title: string, title_sidebar: string, icon: string, data_one: string, data_two: string, data_three: string) {
        this.id = id
        this.uid = uid
        this.title = title
        this.title_sidebar = title_sidebar
        this.icon = icon
        this.data_one = data_one
        this.data_two = data_two
        this.data_three = data_three
    }
}
export default Page