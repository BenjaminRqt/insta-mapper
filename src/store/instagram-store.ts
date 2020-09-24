import {PersistentStore} from "./main";
import {INSTAGRAM_NAME} from "./store-names";
import {getUserApi} from "../logic/api/instagram.api";

interface InstagramMapper {
    user: Array<Object>
}

class InstagramStore extends PersistentStore<InstagramMapper> {
    protected data(): InstagramMapper {
        return {
            user: [],
        };
    }

    getUserAction(idUser: string) {
        getUserApi(idUser).then(response => {
            this.state.user = response.data.graphql.user
        });
    }

    resetUserAction() {
        this.state.user = [];
    }
}

export const instagramStore = new InstagramStore(INSTAGRAM_NAME);
