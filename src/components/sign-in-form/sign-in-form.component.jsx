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
import { useDispatch } from "react-redux";
import { signIn } from "../../store/auth/auth.reducer";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await authenticateUser(email, password);

    console.log("response", response);
    if (response.validation) {
      dispatch(signIn(response.token));
      notification("Successfully logged", "success");
      navigate("/main");
    } else {
      resetFormFields();
      notification("Invalid credentials, please try again.", "error");
    }
  };

  //todo: to replace
  const authenticateUser = async (email, password) => {
    return {
      validation: email === "example@gmail.com" && password === "password123",
      token: "1234567890",
    };
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
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              placeholder="example@gmail.com"
              required
            />
            <Label>PASSWORD</Label>
            <Input
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
