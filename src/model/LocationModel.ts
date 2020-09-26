export default class LocationModel {
    private readonly _id: number;
    private readonly _latitude: number;
    private readonly _longitude: number;

    constructor(id: number, latitude: number, longitude: number) {
        this._id = id;
        this._latitude = latitude;
        this._longitude = longitude;
    }

    public get id() : number {
        return this._id;
    }

    public get latitude() : number {
        return this._latitude;
    }

    public get longitude() : number {
        return this._longitude;
    }
}
