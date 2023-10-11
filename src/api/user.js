import { API_HOST_PRODUCCION } from "../utils";
import { getTokenUser } from "./auth";
export function getUserApi(id) {
  const url = `${API_HOST_PRODUCCION}/verperfil?id=${id}`;

  const params = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getTokenUser()}`
    }
  };

  return fetch(url, params)
    .then(response => {
      // eslint-disable-next-line no-throw-literal
      if (response.status >= 400) throw null;
      return response.json();
    })
    .then(result => {
      return result;
    })
    .catch(err => {
      return err;
    });
}

export function uploadBannerApi(file) {
  const url = `${API_HOST_PRODUCCION}/subirfotoportada`;

  const formData = new FormData();
  formData.append("fotoPortada", file);

  const params = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getTokenUser()}`
    },
    body: formData
  };

  return fetch(url, params)
    .then(response => {
      return response.json();
    })
    .then(result => {
      return result;
    })
    .catch(err => {
      return err;
    });
}

export function uploadAvatarApi(file) {
  const url = `${API_HOST_PRODUCCION}/subirfotoperfil`;

  const formData = new FormData();
  formData.append("fotoPerfil", file);

  const params = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getTokenUser()}`
    },
    body: formData
  };

  return fetch(url, params)
    .then(response => {
      return response.json();
    })
    .then(result => {
      return result;
    })
    .catch(err => {
      return err;
    });
}

export function updateInfoApi(data) {
  const url = `${API_HOST_PRODUCCION}/modificarperfil`;
  //console.log(data);
  const params = {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${getTokenUser()}`
    },
    body: JSON.stringify(data)
  };

  return fetch(url, params)
    .then(response => {
      console.log(response);
      return response;
    })
    .catch(err => {
      return err;
    });
}
