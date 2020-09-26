import Picture from './Picture'

export default class User extends Object {
    private readonly _id: number
    private readonly _biography: string
    private readonly _pictures: Array<Picture> = [];

    constructor(id: number, biography: string, pictures: Array<Picture>) {
        super();
        this._id = id
        this._biography = biography
        this._pictures = pictures
    }

    get id(): number {
        return this._id;
    }

    get biography(): string {
        return this._biography;
    }

    get pictures(): Array<Picture> {
        return this._pictures;
    }
}
