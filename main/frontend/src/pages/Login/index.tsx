import { useAuth } from "@hooks";
import { Icon } from "@iconify/react";
import { Field, Form, Formik } from "formik";
import { useNavigate } from "react-router";
import * as Yup from "yup";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={Yup.object().shape({
        email: Yup.string().email().required(),
        password: Yup.string().required(),
      })}
      onSubmit={async ({ email, password }) => {
        const user = await login(email, password);

        if (user) {
          switch (user.role) {
            case "STUDENT":
              navigate("/student");
              break;
            case "TEACHER":
              navigate("/teacher");
              break;
            case "ANALYST":
              navigate("/analyst");
              break;
            case "ADMIN":
              navigate("/admin");
              break;
            default:
              navigate("/");
          }
        }
      }}
    >
      <Form className="flex flex-col gap-4">
        <label className="w-full form-control">
          <div className="label">
            <span className="label-text">Email</span>
          </div>
          <label className="flex items-center gap-2 input input-bordered">
            <Icon icon="carbon:email" />
            <Field name="email" placeholder="user@gmail.com" type="text" />
          </label>
        </label>
        <label className="w-full form-control">
          <div className="label">
            <span className="label-text">Password</span>
          </div>
          <label className="flex items-center gap-2 input input-bordered">
            <Icon icon="carbon:password" />
            <Field name="password" placeholder="Password" type="password" />
          </label>
        </label>
        <button className="w-full btn btn-primary" type="submit">
          Login
        </button>
      </Form>
    </Formik>
  );
}
