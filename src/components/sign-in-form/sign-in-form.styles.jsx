import styled from "styled-components";
import photoSignIn from "../../assets/photo-sign-in.jpg"; // Adjust the path as needed

// Container for the whole sign-in page
export const SignInContainer = styled.div`
  display: flex;
  height: 100vh;
  background-color: #f5f5f5;
`;

export const ImageSection = styled.div`
  flex: 1;
  background: url(${photoSignIn}) no-repeat center center;
  background-size: cover;
`;

export const FormSection = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
`;

export const FormWrapper = styled.div`
  max-width: 400px;
  width: 100%;
  text-align: center;
`;

export const Title = styled.h2`
  font-size: 24px;
  color: #1e0e62;
  margin-bottom: 20%;
  font-weight: bold;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Label = styled.label`
  font-size: 14px;
  color: #1e0e62;
  align-self: flex-start;
  margin-bottom: 5px;
  letter-spacing: 2px;
  font-weight: bold;
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  color: #333;
`;

export const SignInButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #20c997;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background-color: #17a589;
  }
`;

export const SignUpLink = styled.div`
  margin-top: 20px;
  font-size: 14px;
  color: #6c757d;

  a {
    color: #20c997;
    text-decoration: none;
    font-weight: bold;

    &:hover {
      text-decoration: underline;
    }
  }
`;
