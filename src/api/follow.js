import { API_HOST_PRODUCCION } from "../utils";
import { getTokenUser } from "./auth";

export function checkFollowApi(idUser) {
  const url = `${API_HOST_PRODUCCION}/consultarelacionamistad?id=${idUser}`;

  const params = {
    headers: {
      Authorization: `Bearer ${getTokenUser()}`,
    },
  };

  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
}

export function followUserApi(idUser) {
  const url = `${API_HOST_PRODUCCION}/estableceramistad?id=${idUser}`;

  const params = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getTokenUser()}`,
    },
  };

  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
}

export function unfollowUserApi(idUser) {
  const url = `${API_HOST_PRODUCCION}/bajarelacionamistad?id=${idUser}`;

  const params = {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getTokenUser()}`,
    },
  };

  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
}

export function getFollowsApi(paramsUrl) {
  const url = `${API_HOST_PRODUCCION}/listausuarios?${paramsUrl}`;

  const params = {
    headers: {
      Authorization: `Bearer ${getTokenUser()}`,
    },
  };

  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
}
