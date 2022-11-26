import { Container, Image } from "react-bootstrap";
import { Link } from "react-router-dom";

export const UserPerfil = ({id,nombres,foto, iglesia}) => {
    const urlFotoPerfil = (`https://mi-refugio.herokuapp.com/obtenerfotoperfil?id=${id}`);
  return (
    <Link className="nav-link" to={`/usuario${id}`}>
        <Image
            alt=""
            src={(foto) ? urlFotoPerfil : 'https://startupheretoronto.com/wp-content/uploads/2019/03/default-user-image-2.png'}
            width="50"
            height="50"
            className="d-inline-block align-center m-1 d-flex float-start"
            roundedCircle={true}
        />
        <figure className="float-start">
            <blockquote className="blockquote ">
                <p><small>{nombres}</small></p>
            </blockquote>
            <figcaption className="blockquote-footer">
                {iglesia}
            </figcaption>
        </figure>
        
    </Link>
  )
}
