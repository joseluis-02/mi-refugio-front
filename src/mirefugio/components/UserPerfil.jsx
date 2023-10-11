import { Container, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { API_HOST_PRODUCCION } from "../../utils";
import DefualtUser from '../../assets/png/user-default.png';

export const UserPerfil = ({id,nombres,foto, iglesia}) => {
    //console.log(nombres);
    const urlFotoPerfil = (`${API_HOST_PRODUCCION}/obtenerfotoperfil?id=${id}`);
  return (
    <Link className="nav-link mb-1 mt-2 rounded" to={`/usuario${id}`}>
        <Image
            alt=""
            src={(foto) ? urlFotoPerfil : DefualtUser}
            width="55"
            height="55"
            className="d-inline-block align-center p-1 d-flex float-start"
            roundedCircle={true}
        />
        <figure className="float-start mb-0">
            {
                    <p className="d-inline-block text-truncate mb-0 p-1" style={{maxWidth:250}}>
                        <small className="text-capitalize fw-semibold">{nombres}</small><br />
                        {(iglesia)?(<small className="align-text-top fst-italic text-muted text-lowercase">{iglesia}</small>) : <small>...</small>}
                    </p>
            }
            
        </figure>
        
    </Link>
  )
}
