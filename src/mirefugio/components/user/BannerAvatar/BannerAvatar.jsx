import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import ConfigModal from "../../Modal/EditarInfo";
import AvatarNoFound from "../../../../assets/png/user-default.png";
import PortadaNoFound from "../../../../assets/jpg/banner-defalut.jpg";
import { API_HOST_PRODUCCION } from "../../../../utils";
import { EditUserForm } from "../EditUserForm";
import {
  checkFollowApi,
  followUserApi,
  unfollowUserApi
} from "../../../../api/follow";
import "./BannerAvatar.scss";



export const BannerAvatar = ({user, loggedUser}) => {
  const [showModal, setShowModal] = useState(false);
  const [following, setFollowing] = useState(null);
  const [reloadFollow, setReloadFollow] = useState(false);
  //console.log(user);
  //console.log(loggedUser);
  const bannerUrl = user?.portada
    ? `${API_HOST_PRODUCCION}/obtenerfotoportada?id=${user.id}`
    : PortadaNoFound;
  const avatarUrl = user?.foto
    ? `${API_HOST_PRODUCCION}/obtenerfotoperfil?id=${user.id}`
    : AvatarNoFound;

  useEffect(() => {
    if (user) {
      checkFollowApi(user?.id).then(response => {
        if (response?.status) {
          setFollowing(true);
        } else {
          setFollowing(false);
        }
      });
    }
    setReloadFollow(false);
  }, [user, reloadFollow]);

  const onFollow = () => {
    followUserApi(user.id).then(() => {
      setReloadFollow(true);
    });
  };

  const onUnfollow = () => {
    unfollowUserApi(user.id).then(() => {
      setReloadFollow(true);
    });
  };

  return (
    <div
      className="banner-avatar"
      style={{ backgroundImage: `url('${bannerUrl}')` }}
    >
      <div
        className="avatar"
        style={{ backgroundImage: `url('${avatarUrl}')` }}
      />
      {user && (
        <div className="options">
          {loggedUser._id === user.id && (
            <Button onClick={() => setShowModal(true)}>Editar perfil</Button>
          )}

          {loggedUser._id !== user.id &&
            following !== null &&
            (following ? (
              <Button onClick={onUnfollow} className="unfollow">
                <span>Siguiendo</span>
              </Button>
            ) : (
              <Button onClick={onFollow}>Seguir</Button>
            ))}
        </div>
      )}

      <ConfigModal
        show={showModal}
        setShow={setShowModal}
        title="Editar perfil"
        user={user}
      >
        <EditUserForm 
          user={user}
          setShowModal={setShowModal}
        />
      </ConfigModal>
    </div>
  );
}
