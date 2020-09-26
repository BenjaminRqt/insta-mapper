import {PersistentStore} from './main';
import {INSTAGRAM_NAME} from './store-names';
import {getUserApi, getLocation} from '../logic/api/instagram.api';
import LocationModel from '../model/LocationModel';
import LocationsModel from '../model/LocationsModel';
import UserFactory from '../factory/userFactory';
import User from '../model/User';

interface InstagramMapper {
    loading: boolean,
    user?: User
    locations?: LocationsModel
}

class InstagramStore extends PersistentStore<InstagramMapper> {
    protected data(): InstagramMapper {
        return {
            loading: false,
            user: undefined,
            locations: undefined
        };
    }

    public getUserAction(idUser: string) {
        this.state.loading = true

        getUserApi(idUser).then(async response => {
            let user = response.data.graphql.user;
            let pictures = user.edge_owner_to_timeline_media.edges;

            this.state.user = new UserFactory().create(response.data.graphql.user);

            let locations = new LocationsModel();

            for (let i = 0; i < this.state.user.pictures.length; i++) {
                if(!locations.has(this.state.user.pictures[i].idLocation)) {
                    await getLocation(this.state.user.pictures[i].idLocation).then(response => {
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

            this.state.loading = false
        });
    }

    resetUserAction() {
        this.state.user = undefined;
    }
}

export const instagramStore = new InstagramStore(INSTAGRAM_NAME);
