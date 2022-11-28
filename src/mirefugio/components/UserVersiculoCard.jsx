import { useEffect, useState } from "react";
import { Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { getUserApi } from "../../api/user";
import { UserPerfil } from "./UserPerfil";
import UserDefalt from '../../assets/png/user-default.png';

export const UserVersiculoCard = ({id}) => {
    //console.log(id);
    const [user, setUser] = useState(null);
    
    useEffect(() => {
       
        getUserApi(id)
          .then((response) => {
            if (!response) toast.error("El usuario que has visitado no existe");
            setUser(response);
          })
          .catch(() => {
            toast.error("El usuario que has visitado no existe");
          });
          console.log(user);
          
      }, [id]);
      
  return (
    (user)
    ?  (<UserPerfil
        id={user?.id}
        nombres={user?.nombre + ' ' + user?.apellidos}
        foto={user?.foto}
        iglesia={user?.iglesia}
        />)
    : <Link className="nav-link mb-2" aria-hidden="true">
        <Image
            alt=""
            src={UserDefalt}
            width="50"
            height="50"
            className="d-inline-block align-center d-flex float-start"
            roundedCircle={true}
        />
        <p className="card-text placeholder-glow">
            <span className="placeholder col-8"></span>
            <span className="placeholder col-7"></span>
        </p>
     </Link>
    
  )
}
