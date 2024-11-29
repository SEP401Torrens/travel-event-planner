import { useDispatch, useSelector } from "react-redux";
import {
  selectAuthError,
  selectAuthStatus,
  selectUser,
} from "../../store/auth/auth.selector";
import {
  DetailsContainer,
  LoadingContainer,
  ProfileContainer,
  ProfilePicture,
  UserEmail,
  UserName,
} from "./profile.styles";
import { fetchUserData } from "../../store/auth/auth.reducer";
import React, { useEffect } from "react";
import { OrbitProgress } from "react-loading-indicators";

const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const status = useSelector(selectAuthStatus);
  const error = useSelector(selectAuthError);

  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);

  if (status === "loading") {
    return (
      <LoadingContainer>
        <OrbitProgress color="#1e0e62" size="small" />
      </LoadingContainer>
    );
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }
  if (!user) {
    return <div>No user data available</div>;
  }

  const avatarUrl = `https://api.multiavatar.com/${encodeURIComponent(
    user.name
  )} ${encodeURIComponent(user.lastName)}.svg`;

  return (
    <ProfileContainer>
      <ProfilePicture>
        <img src={avatarUrl} alt="Profile" />
      </ProfilePicture>
      <DetailsContainer>
        <UserName>{`${user.name} ${user.lastName}`}</UserName>
        <UserEmail>{user.email}</UserEmail>
      </DetailsContainer>
    </ProfileContainer>
  );
};

export default Profile;
