import {PersistentStore} from "./main";
import {INSTAGRAM_NAME} from "./store-names";
import {getUserApi, getLocation} from "../logic/api/instagram.api";
import LocationModel from "../model/LocationModel";
import LocationsModel from "../model/LocationsModel";

interface InstagramMapper {
    loading: boolean,
    user: Array<Object>
    locations: LocationsModel
}

class InstagramStore extends PersistentStore<InstagramMapper> {
    protected data(): InstagramMapper {
        return {
            loading: false,
            user: [],
            locations: new LocationsModel()
        };
    }

    public getUserAction(idUser: string) {
        this.state.loading = true

        getUserApi(idUser).then(async response => {
            let user = response.data.graphql.user;
            let pictures = user.edge_owner_to_timeline_media.edges;

            this.state.user = response.data.graphql.user

            let locations = new LocationsModel();

            for (let i = 0; i < pictures.length; i++) {
                if (pictures[i].node.location !== null) {
                    if(!locations.has(pictures[i].node.location.id)) {
                        await getLocation(pictures[i].node.location.id).then(response => {
                            locations.addLocation(
                                new LocationModel(
                                    pictures[i].node.location.id,
                                    response.data.graphql.location.lat,
                                    response.data.graphql.location.lng
                                )
                            );
                        });

                        this.state.locations = locations;
                    }
                }
            }

            this.state.loading = false
        });
    }

    resetUserAction() {
        this.state.user = [];
    }
}

export const instagramStore = new InstagramStore(INSTAGRAM_NAME);
