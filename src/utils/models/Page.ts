class Page {
    id: number
    uid: number
    title = ""
    data_one = ""
    data_two = ""
    data_three = ""

    constructor(id: number, uid: number, title: string, data_one: string, data_two: string, data_three: string) {
        this.id = id
        this.uid = uid
        this.title = title
        this.data_one = data_one
        this.data_two = data_two
        this.data_three = data_three
    }
}
export default Page