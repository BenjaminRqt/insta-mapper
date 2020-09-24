import Api from "./api";

export const getUserApi = (idUser: string) => {
    return Api.get(`/${idUser}/?__a=1`);
};

export const getLocation = (idLocation: string) => {
    return Api.get(`/explore/locations/${idLocation}/?__a=1`);
};
