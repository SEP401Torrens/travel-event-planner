import styled from "styled-components";

export const SidebarContainer = styled.div`
  width: 250px;
  background-color: #1e0e62;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px 15px;
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
`;

export const SidebarHeader = styled.h2`
  font-size: 18px;
  text-align: center;
  margin-bottom: 20px;
  margin-top: 10%;
`;

export const SidebarLine = styled.div`
  height: 2px;
  background-color: white;
  margin: 20px 20px; /* Space above and below the line */
`;

export const SidebarMenu = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0px 20px 0px 20px;
  display: flex;
  flex-direction: column;
`;

export const SidebarMenuItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  cursor: pointer;

  svg {
    width: 20px;
    height: 20px;
    margin-right: 10px;
    color: white;
  }

  &:hover {
    color: #20c997;

    svg {
      color: #20c997;
    }
  }
`;

export const LogoutButtonContainer = styled.div`
  margin-top: auto;
`;

export const LogoutButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  width: 100%;
  margin: 0px 20px 0px 20px;

  svg {
    width: 20px;
    height: 20px;
    margin-right: 10px;
    color: white;
  }

  &:hover {
    color: #20c997;

    svg {
      color: #20c997;
    }
  }
`;
