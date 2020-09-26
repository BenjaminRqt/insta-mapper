export default class Picture extends Object {
    private readonly _id: number
    private readonly _idLocation: number

    constructor(id: number, idLocation: number) {
        super();
        this._id = id
        this._idLocation = idLocation
    }

    get idLocation(): number {
        return this._idLocation;
    }
}
