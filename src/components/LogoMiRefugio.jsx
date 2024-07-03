import './scss/LogoMiRefugio.scss';
import tuLogo from '../assets/png/logo.png';
export const LogoMiRefugio = () => {
  return (
    <>
        {/*<img
              alt=""
              src="https://image.jimcdn.com/app/cms/image/transf/none/path/scf4fcb377503c035/image/i6fbc6549edc192d0/version/1410718461/image.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
  />*/}
        <img
          alt=""
          src={tuLogo}
          width="30"
          height="30"
          className="d-inline-block align-top"
        />
        <span className="logo-mi">mi</span><span className="logo-refugio">Refugio</span>
    </>
  )
}
