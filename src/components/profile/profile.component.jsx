import { useDispatch, useSelector } from "react-redux";
import {
  selectAuthError,
  selectAuthStatus,
  selectUser,
} from "../../store/auth/auth.selector";
import {
  DetailsContainer,
  ProfileContainer,
  ProfilePicture,
  UserEmail,
  UserName,
} from "./profile.styles";
import { fetchUserData } from "../../store/auth/auth.reducer";
import { useEffect } from "react";

const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const status = useSelector(selectAuthStatus);
  const error = useSelector(selectAuthError);

  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);

  if (status === "loading") {
    return <div>Loading...</div>;
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
        {/*
        <ProfileDetails>
          <DetailRow>
            <DetailLabel>ID:</DetailLabel>
            <DetailValue>{user.id}</DetailValue>
          </DetailRow>
        </ProfileDetails> */}
      </DetailsContainer>
    </ProfileContainer>
  );
};

export default Profile;
