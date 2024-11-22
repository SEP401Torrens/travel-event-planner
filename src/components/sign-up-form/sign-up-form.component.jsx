import { useEffect, useState } from "react";
import {
  Form,
  FormSection,
  FormWrapper,
  ImageSection,
  Input,
  Label,
  NameFields,
  NameInput,
  SignInLink,
  SignUpButton,
  SignUpContainer,
  Title,
} from "./sign-up-form.styles";
import { notification } from "../../utils/notification.utils";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signIn, signUp } from "../../store/auth/auth.reducer";

const defaultFormFields = {
  email: "",
  firstName: "",
  lastName: "",
  password: "",
  reEnterPassword: "",
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, firstName, lastName, password, reEnterPassword } = formFields;
  const [error, setError] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (password === reEnterPassword || reEnterPassword === "") {
      setError("");
      setIsButtonDisabled(false);
    } else {
      setError("Passwords don't match");
      setIsButtonDisabled(true);
    }
  }, [password, reEnterPassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();
     dispatch(
       signUp({
         email: formFields.email,
         lastName: formFields.lastName,
         name: formFields.firstName,
         password: formFields.password,
       })
     ).then((action) => {
       if (action.type === signUp.fulfilled.type) {
         notification("Successfully created", "success");
         navigate("/");
       }else{
         notification("We couldn't create your user, please try later.", "error");
       }
     });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <SignUpContainer>
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

            <NameFields>
              <NameInput>
                <Label>FIRST NAME</Label>
                <Input
                  type="text"
                  name="firstName"
                  value={firstName}
                  onChange={handleChange}
                  placeholder="Thais"
                  required
                />
              </NameInput>
              <NameInput>
                <Label>LAST NAME</Label>
                <Input
                  type="text"
                  name="lastName"
                  value={lastName}
                  onChange={handleChange}
                  placeholder="Contreras"
                  required
                />
              </NameInput>
            </NameFields>

            <Label>CHOOSE A PASSWORD</Label>
            <Input
              type="password"
              name="password"
              onChange={handleChange}
              value={password}
              placeholder="************"
              required
            />

            <Label>RE-ENTER PASSWORD</Label>
            <Input
              type="password"
              name="reEnterPassword"
              onChange={handleChange}
              value={reEnterPassword}
              placeholder="************"
              required
            />

            {error && <p style={{ color: "red", fontSize: "14px" }}>{error}</p>}

            <SignUpButton type="submit" disabled={isButtonDisabled}>
              SIGN UP
            </SignUpButton>
            <SignInLink>
              Already have an account? <a href="/">Login here</a>
            </SignInLink>
          </Form>
        </FormWrapper>
      </FormSection>
    </SignUpContainer>
  );
};

export default SignUpForm;
