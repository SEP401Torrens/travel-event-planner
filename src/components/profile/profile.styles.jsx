import styled from "styled-components";

export const LoadingContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; 
`;

export const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

export const ProfilePicture = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 20px; 

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const DetailsContainer = styled.div`
  flex: 1; 
`;

export const UserName = styled.h1`
  font-size: 24px;
  font-weight: bold;
  color: #1e0e62;
  margin-bottom: 5px;
`;

export const UserEmail = styled.p`
  font-size: 16px;
  color: #666666;
  margin-bottom: 10px;
`;

export const ProfileDetails = styled.div`
  margin-top: 10px;
`;

export const DetailRow = styled.div`
  display: flex;
  margin-bottom: 5px;
`;

export const DetailLabel = styled.span`
  font-weight: bold;
  color: #333333;
  margin-right: 5px;
`;

export const DetailValue = styled.span`
  color: #666666;
`;