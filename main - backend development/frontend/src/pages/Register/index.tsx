import { useAuth } from "@hooks";
import { Icon } from "@iconify/react";
import { Field, Form, Formik } from "formik";
import { useNavigate } from "react-router";
import * as Yup from "yup";

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();

  return (
    <Formik
      initialValues={{ name: "", email: "", password: "" }}
      validationSchema={Yup.object().shape({
        name: Yup.string().required(),
        email: Yup.string().email().required(),
        password: Yup.string().required(),
      })}
      onSubmit={async ({ name, email, password }) => {
        await register(name, email, password);
        navigate("/student");
      }}
    >
      <Form className="flex flex-col gap-4">
        <label className="w-full form-control">
          <div className="label">
            <span className="label-text">Name</span>
          </div>
          <label className="flex items-center gap-2 input input-bordered">
            <Icon icon="carbon:person" />
            <Field name="name" placeholder="John Doe" type="text" />
          </label>
        </label>
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
          Register
        </button>
      </Form>
    </Formik>
  );
}
