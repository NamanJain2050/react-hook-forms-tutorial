"use client";

import React, { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { TSignUpSchema, signUpSchema } from "@/lib/types";

const FormWithReactHookFormAndZod = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TSignUpSchema>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: TSignUpSchema) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    reset();
  };

  type Attribute = TSignUpSchema["attributes"][number];

  const [attributeList, setAttributeList] = useState<Attribute[]>([
    {
      _id: "1",
      attributeName: "ABCD",
    },
    {
      _id: "2",
      attributeName: "EFGH",
    },
  ]);

  const { fields, append, remove } = useFieldArray({
    name: "attributes",
    control,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-2">
      <input
        {...register("email")}
        type="email"
        placeholder="Email"
        className="px-4 py-2 rounded"
      />
      {errors.email && (
        <p className="text-red-500">{`${errors.email.message}`}</p>
      )}
      <input
        {...register("password")}
        type="password"
        placeholder="Password"
        className="px-4 py-2 rounded"
      />
      {errors.password && (
        <p className="text-red-500">{`${errors.password.message}`}</p>
      )}
      <input
        {...register("confirmPassword")}
        type="password"
        placeholder="Confirm password"
        className="px-4 py-2 rounded"
      />
      {errors.confirmPassword && (
        <p className="text-red-500">{`${errors.confirmPassword.message}`}</p>
      )}
      {fields.map((field, index) => {
        const errorForField = errors?.attributes?.[index]?.attributeName;
        return (
          <div key={field._id}>
            <input
              {...register(`attributes.${index}.attributeName` as const)}
              placeholder="Attribute Name"
              className="px-4 py-2 rounded"
            />
            <p>{errorForField?.message ?? <>&nbsp;</>}</p>
            <button
              type="button"
              className="bg-blue-300 hover:bg-blue-400 rounded-lg p-2"
              onClick={() => remove(index)}
            >
              Delete
            </button>
          </div>
        );
      })}

      <button
        type="button"
        className="block rounded-lg mx-auto bg-blue-300 hover:bg-blue-400 p-4"
        onClick={() => {
          console.log("hii");
          append({
            _id: "new",
            attributeName: "",
          });
        }}
      >
        Append
      </button>

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-blue-500 disabled:bg-gray-500 py-2 rounded"
      >
        Submit
      </button>
    </form>
  );
};

export default FormWithReactHookFormAndZod;
