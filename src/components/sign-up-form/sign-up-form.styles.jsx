import styled from "styled-components";
import photoSignUp from "../../assets/photo-sign-up.jpg";

export const SignUpContainer = styled.div`
  display: flex;
  height: 100vh;
  background-color: #f5f5f5;
`;

export const ImageSection = styled.div`
  flex: 1;
  background: url(${photoSignUp}) no-repeat center center;
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

export const NameFields = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
  width: 100%;
`;

export const NameInput = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column; 
`;

export const SignUpButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: ${({ disabled }) => (disabled ? "#ccc" : "#20c997")};
  color: #ffffff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  margin-top: 10px;

  &:hover {
    background-color: ${({ disabled }) => (disabled ? "#ccc" : "#17a589")};
  }
`;

export const SignInLink = styled.div`
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
