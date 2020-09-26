import User from '../model/User'
import Picture from '../model/Picture'

export default class UserFactory implements FactoryInterface {
    create(data: any): User {
        let pictures: Picture[] = [];
        data.edge_owner_to_timeline_media.edges.forEach((picture: any): void => {
            if (picture.node.location !== null) {
                pictures.push(
                    new Picture(
                        picture.node.id,
                        picture.node.location.id
                    )
                )
            }
        })

        return new User(
            data.id,
            data.biography,
            pictures
        )
    }
}
