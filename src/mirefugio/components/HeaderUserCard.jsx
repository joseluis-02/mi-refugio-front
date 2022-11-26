import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlaceOfWorship } from '@fortawesome/free-solid-svg-icons';
import { Col, Image, Row } from "react-bootstrap"
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { obtenerUsuario } from "../../store/mirefugio/slices/user/thunks";
import AvatarNoFound from "../../assets/png/user-default.png";
import { useEffect, useState } from "react";
import { getUserApi } from "../../api/user";
import { API_HOST_PRODUCCION } from "../../utils";

export const HeaderUserCard = ({id}) => {
    const [user, setUser] = useState(null);
    const avatarUrl = user?.foto
    ? `${API_HOST_PRODUCCION}/obtenerfotoperfil?id=${user.id}`
    : AvatarNoFound;
    useEffect(() => {
        getUserApi(id)
          .then((response) => {
            if (!response) toast.error("El usuario que has visitado no existe");
            setUser(response);
          })
          .catch(() => {
            toast.error("El usuario que has visitado no existe");
            return;
          });
      }, [id]);

      
    let foto =null;
  return (
    <>
        <Col className="col-auto">
            <NavLink
                to={`/usuario${id}`}
            >
                <Image
                alt=""
                src={avatarUrl}
                width="50"
                height="50"
                className="d-inline-block align-center m-1"
                roundedCircle={true}
                />
            </NavLink>
        </Col>
        <Col className="col text-truncate">
            <blockquote className="blockquote pt-2">
                <p><small>{user?.nombre} {user?.apellidos}</small></p>
                <figcaption className="blockquote-footer">
                    {user?.iglesia}
                </figcaption>
            </blockquote>
        </Col>
    </>
  )
}
