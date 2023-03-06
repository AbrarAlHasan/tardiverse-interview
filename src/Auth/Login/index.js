import React from "react";
import "./style.css";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z, string, boolean } from "zod";
import { useNavigate } from "react-router-dom";

function Index() {
  const navigate = useNavigate();
  const schema = z
    .object({
      email: string().email(),
      password: string().min(8, { message: "Min 8 Characters Required" }),
      checkbox: boolean(),
    })
    .superRefine(({ checkbox }, ctx) => {
      !checkbox &&
        ctx.addIssue({
          code: "custom",
          path: ["checkbox"],
          message: "Please Make sure you have checked",
        });
    });

  const { register, control, handleSubmit, formState } = useForm({
    defaultValues: { email: "", password: "", checkbox: false },
    resolver: zodResolver(schema),
  });
  const { errors } = formState;

  const onSubmit = (formValues) => {
    console.log(formValues);
    navigate("/dashboard");
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Login!</h1>
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
          <div className="input-field-box">
            <input
              {...register("email")}
              placeholder="Email"
              className="login-input"
            />
            <p className="login-input-error">{errors?.email?.message}</p>
          </div>
          <div className="input-field-box">
            <input
              {...register("password")}
              placeholder="Password"
              className="login-input"
            />
            <p className="login-input-error">{errors?.password?.message}</p>
          </div>
          <div className="input-field-box">
            <div className="login-checkbox">
              <input {...register("checkbox")} type="checkbox" />
              <p>I agree to the terms & condition</p>
            </div>

            <p className="login-input-error">{errors?.checkbox?.message}</p>
          </div>
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Index;
