import React, { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
import { API_HOST_PRODUCCION } from "../../../../utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faImages, faSave} from '@fortawesome/free-regular-svg-icons';
import {
  uploadBannerApi,
  uploadAvatarApi,
  updateInfoApi,
} from "../../../../api/user";
import { obtenerUsarioPerfilApi } from "../../../../store/mirefugio/slices/user";
import { useForm } from "../../../../hooks";
import { FloatingLabel, Form, InputGroup, Spinner } from "react-bootstrap";
import "./EditUserForm.scss";






export const EditUserForm = ({user, setShowModal}) => {
 
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {uid} = useSelector(state => state.auth);

  const {formState,onInputChange} = useForm(initialValue(user));
  const [loading, setLoading] = useState(false);
  const banner = user?.portada
    ? `${API_HOST_PRODUCCION}/obtenerfotoportada?id=${user.id}`
    : null;
  const avatar = user?.foto
    ? `${API_HOST_PRODUCCION}/obtenerfotoperfil?id=${user.id}`
    : null;

  //Estados de la foto portada
  const [bannerUrl, setBannerUrl] = useState(banner);
  const [bannerFile, setBannerFile] = useState(null);

  const onDropBanner = useCallback((acceptedFile) => {
    const file = acceptedFile[0];
    setBannerUrl(URL.createObjectURL(file));
    setBannerFile(file);
  }, [])
  const {
    getRootProps: getRootBannerProps,
    getInputProps: getInputBannerProps,
  } = useDropzone({
    accept: "image/jpeg, image/png, image/gif, image/jpg",
    noKeyboard: true,
    multiple: false,
    onDrop: onDropBanner,
  });


  //Estados de foto perfil
  const [avatarUrl, setAvatarUrl] = useState(avatar);
  const [avatarFile, setAvatarFile] = useState(null);


  const onDropAvatar = useCallback((acceptedFile) => {
    const file = acceptedFile[0];
    setAvatarUrl(URL.createObjectURL(file));
    setAvatarFile(file);
  });
  const {
    getRootProps: getRootAvatarProps,
    getInputProps: getInputAvatarProps,
  } = useDropzone({
    accept: "image/jpeg, image/png, image/gif, image/jpg",
    noKeyboard: true,
    multiple: false,
    onDrop: onDropAvatar,
  });
  

  const onSubmitForm = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (bannerFile) {
      await uploadBannerApi(bannerFile).catch(() => {
        toast.error("Error! al subir el nuevo foto portada");
        //console.log("error portada");
      });
    }
    if (avatarFile) {
      await uploadAvatarApi(avatarFile).catch(() => {
        toast.error("Error! al subir el nuevo foto perfil");
        //console.log("error perfil");
      });
    }

    const {ok} = await updateInfoApi(formState);
    if (!ok){
      toast.error("No se pudo actualizar los datos");
    }
    setLoading(false);
    setShowModal(false);
    //navigate(`?id=${ uid }`);
    //<Navigate to={`/usuario${uid}`}/>
    //dispatch( obtenerUsarioPerfilApi(uid) );
    window.location.reload(true);
    //this.reload();
  }

  return (
    <>
      <div className="edit-user-form">
        <div
          className="banner"
          style={{ backgroundImage: `url('${bannerUrl}')` }}
          {...getRootBannerProps()}
        >
          <input {...getInputBannerProps()}/>
          <FontAwesomeIcon icon={faImages} />
          {/*<Camera /> <FontAwesomeIcon icon={faCamera} />*/}
        </div>

        <div
          className="avatar"
          style={{ backgroundImage: `url('${avatarUrl}')` }}
          {...getRootAvatarProps()}
        >
          <input className="form-control bg-light" {...getInputAvatarProps()} />
          <FontAwesomeIcon  icon={faImages} />
          {/*<Camera />*/}
        </div>
      </div>
      <Form onSubmit={onSubmitForm}>
        <InputGroup className="mb-2">
          <InputGroup.Text id="basic-nombre">Nombres</InputGroup.Text>
          <Form.Control
            placeholder="nombres"
            aria-describedby="basic-nombre"
            name="nombre"
            value={formState.nombre}
            onChange={onInputChange}
          />
        </InputGroup>
        <InputGroup className="mb-2">
          <InputGroup.Text id="basic-apellidos">Apellidos</InputGroup.Text>
          <Form.Control
            placeholder="apellidos"
            aria-describedby="basic-apellidos"
            name="apellidos"
            value={formState.apellidos}
            onChange={onInputChange}
          />
        </InputGroup>
        <InputGroup className="mb-2">
          <InputGroup.Text id="basic-ubicacion">Ubicación</InputGroup.Text>
          <Form.Control
            placeholder="ubicación"
            aria-describedby="basic-ubicacion"
            name="ubicacion"
            value={formState.ubicacion}
            onChange={onInputChange}
          />
        </InputGroup>
        <FloatingLabel
          controlId="floatingTextarea"
          label="Iglesia"
          className="mb-2"
        >
          <Form.Control 
            as="textarea"
            name="iglesia"
            value={formState.iglesia}
            onChange={onInputChange}
          />
        </FloatingLabel>
        <FloatingLabel 
          label="Información"
        >
          <Form.Control
            name="biografia"
            value={formState.biografia}
            onChange={onInputChange}
            as="textarea"
            style={{ height: '80px' }}
          />
        </FloatingLabel>
        <div className="vstack gap-2 col-md-5 mx-auto my-2">
        <button disabled={loading} type="submit" className="btn btn-dark">
          {
            (loading)
            ? (<span><Spinner
              as="span"
              animation="grow"
              size="sm"
              role="status"
              aria-hidden="true"
            /> {'Guardando...'}</span>)
            : (<span><FontAwesomeIcon icon={faSave} /> {'guardar cambios'}</span>)
          }
        </button>
      </div>
      </Form>
    </>
  );
}

function initialValue(user) {
  return {
    nombre: user.nombre || "",
    apellidos: user.apellidos || "",
    biografia: user.biografia || "",
    ubicacion: user.ubicacion || "",
    iglesia: user.iglesia || "",
    fechaNacimiento: user.fechaNacimiento || ""
  };
}
