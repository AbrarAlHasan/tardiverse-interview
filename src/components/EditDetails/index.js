import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { string, z } from "zod";
import "./style.css";
function Index({ selectedStudent, handleSave }) {
  const schema = z.object({
    name: string().min(3, { message: "Min 3 Characters Required" }),
    education: string().min(3, { message: "Min 3 Characters Required" }),
    address: string().min(3, { message: "Min 3 Characters Required" }),
  });

  const { register, formState, handleSubmit } = useForm({
    defaultValues: selectedStudent,
    resolver: zodResolver(schema),
  });

  const { errors } = formState;

  useEffect(() => {}, [selectedStudent]);
  const onSubmit = (formValues) => {
    console.log("form Values", formValues);
    handleSave({ id: selectedStudent.id, ...formValues });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <input {...register("name")} placeholder="Name" />
        <p>{errors?.name?.message}</p>
      </div>
      <div>
        <input {...register("education")} placeholder="Education" />
        <p>{errors?.education?.message}</p>
      </div>
      <div>
        <input {...register("address")} placeholder="Address" />
        <p>{errors?.address?.message}</p>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default Index;
