import LocationModel from "./LocationModel";

export default class LocationsModel {
    public _locations: Array<LocationModel> = []

    addLocation(location: LocationModel) : void {
        this._locations.push(location);
        console.log(this._locations);
    }

    public get locations(): Array<LocationModel> {
        return this._locations;
    }

    public has(id: number ) : boolean {
        return this._locations.find(location => location.id == id) !== undefined
    }
}
