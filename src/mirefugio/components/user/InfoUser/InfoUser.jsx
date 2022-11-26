import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faEnvelope, faUser} from '@fortawesome/free-regular-svg-icons';
import {faCakeCandles, faCircleInfo, faLocationDot, faPlaceOfWorship} from '@fortawesome/free-solid-svg-icons';

import "./InfoUser.scss";
import { obtenerDia, obtenerMesLiteral } from "../../../../utils";

export const InfoUser = ({user}) => {
  
  return (
    <div className="info-user">
      <h2 className="name">
        <FontAwesomeIcon icon={faUser} /> {user?.nombre} {user?.apellidos}
      </h2>
      <p className="email"><FontAwesomeIcon icon={faEnvelope} /> {user?.email}</p>
      {user?.iglesia && <div className="description"><FontAwesomeIcon icon={faPlaceOfWorship}/> {user.iglesia}</div>}
      {user?.biografia && <div className="description"><FontAwesomeIcon icon={faCircleInfo}/> {user.biografia}</div>}
      

      <div className="more-info">
        {user?.ubicacion && (
          <p>
            <FontAwesomeIcon icon={faLocationDot}/> <span>{user.ubicacion}</span> 
          </p>
        )}
        {user?.fechaNacimiento && (
          <p>
            <FontAwesomeIcon icon={faCakeCandles}/> <span>{obtenerDia(user.fechaNacimiento)} {'de'} {obtenerMesLiteral(user.fechaNacimiento)}</span> 
          </p>
        )}
      </div>
    </div>
  );
}
