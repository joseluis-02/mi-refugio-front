import React, { useState, useEffect } from "react";
import { Button, Spinner } from "react-bootstrap";
import ConfigModal from "../../Modal/EditarInfo";
import AvatarNoFound from "../../../../assets/png/user-default.png";
import PortadaNoFound from "../../../../assets/jpg/banner-defalut.jpg";
import { API_HOST_PRODUCCION } from "../../../../utils";
import { EditUserForm } from "../EditUserForm";
import {
  checkFollowApi,
  followUserApi,
  unfollowUserApi,
} from "../../../../api/follow";
import "./BannerAvatar.scss";

export const BannerAvatar = ({ user, loggedUser }) => {
  const [showModal, setShowModal] = useState(false);
  const [following, setFollowing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userLoading, setUserLoading] = useState(true);

  console.log('following'+following);
  const bannerUrl = user?.banner
    ? `${API_HOST_PRODUCCION}/obtenerfotoportada?id=${user.id}`
    : PortadaNoFound;
  const avatarUrl = user?.avatar
    ? `${API_HOST_PRODUCCION}/obtenerfotoperfil?id=${user.id}`
    : AvatarNoFound;

  useEffect(() => {
    if (user) {
      setUserLoading(false);
    } else {
      setUserLoading(true);
    }
  }, [user]);

  useEffect(() => {
    // Verifica la relación de seguimiento cada vez que cambia el usuario
    if (user && loggedUser && user.id !== loggedUser._id) {
      setLoading(true);
      checkFollowApi(user.id)
        .then((response) => {
          console.log("response "+response);
          setFollowing(response);
        })
        .catch((error) => {
          console.error("Error al verificar seguimiento:", error);
          setFollowing(false);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setFollowing(null); // Es el perfil del propio usuario
    }
  }, [user, loggedUser]);

  const onFollow = async () => {
    setLoading(true);
    try {
      await followUserApi(user.id);
      setFollowing(true);
    } catch (error) {
      console.error("Error al seguir al usuario:", error);
    } finally {
      setLoading(false);
    }
  };

  const onUnfollow = async () => {
    setLoading(true);
    try {
      await unfollowUserApi(user.id);
      setFollowing(false);
    } catch (error) {
      console.error("Error al dejar de seguir al usuario:", error);
    } finally {
      setLoading(false);
    }
  };

  if (userLoading) {
    return (
      <div className="loading-container">
        <Spinner animation="border" role="status">
          <span className="sr-only">Cargando...</span>
        </Spinner>
      </div>
    );
  }

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

          {loggedUser._id !== user.id && following !== null && (
            <div className="follow-section">
              {following ? (
                <>
                  <Button
                    onClick={onUnfollow}
                    className="unfollow"
                    style={{ backgroundColor: "red", borderColor: "red" }}
                    disabled={loading}
                  >
                    {loading ? (
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                      />
                    ) : (
                      "Dejar de seguir"
                    )}
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    onClick={onFollow}
                    style={{ backgroundColor: "blue", borderColor: "blue" }}
                    disabled={loading}
                  >
                    {loading ? (
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                      />
                    ) : (
                      "Seguir"
                    )}
                  </Button>
                </>
              )}
            </div>
          )}
        </div>
      )}

      <ConfigModal
        show={showModal}
        setShow={setShowModal}
        title="Editar perfil"
        user={user}
      >
        <EditUserForm user={user} setShowModal={setShowModal} />
      </ConfigModal>
    </div>
  );
};
