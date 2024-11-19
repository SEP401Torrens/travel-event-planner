import { useState } from "react";
import {
  Form,
  FormSection,
  FormWrapper,
  ImageSection,
  Input,
  Label,
  SignInButton,
  SignInContainer,
  SignUpLink,
  Title,
} from "./sign-in-form.styles";
import { useNavigate } from "react-router-dom";
import { notification } from "../../utils/notification.utils";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isAuthenticated = await authenticateUser(email, password);

    if (isAuthenticated) {
      notification("Successfully logged", "success");
      navigate("/main");
    } else {
      notification("Invalid credentials, please try again.", "error");
    }
  };

  //todo: to replace
  const authenticateUser = async (email, password) => {
    return email === "example@gmail.com" && password === "password123";
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <SignInContainer>
      <ImageSection />
      <FormSection>
        <FormWrapper>
          <Title>Travel Event Planner</Title>
          <Form onSubmit={handleSubmit}>
            <Label>E-MAIL</Label>
            <Input
              //   label="Email"
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              placeholder="example@gmail.com"
              required
            />
            <Label>PASSWORD</Label>
            <Input
              //   label="Password"
              type="password"
              name="password"
              onChange={handleChange}
              value={password}
              placeholder="************"
              required
            />
            <SignInButton type="submit">SIGN IN</SignInButton>
          </Form>
          <SignUpLink>
            Don't have an account? <a href="/sign-up">Sign up Here</a>
          </SignUpLink>
        </FormWrapper>
      </FormSection>
    </SignInContainer>
  );
};

export default SignInForm;
