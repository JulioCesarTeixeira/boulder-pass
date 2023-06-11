"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { handleRegisterFormAction } from "./RegisterAction";
import { z } from "zod";
import { useState } from "react";

export const FormDataSchema = z.object({
  name: z.string().nonempty(),
  email: z.string().email({ message: "Invalid email format" }),
  remarks: z.string().optional(),
});

export type FormDataType = z.infer<typeof FormDataSchema>;

export function RegisterForm() {
  const [userList, setUserList] = useState<FormDataType[]>([]);
  const { control, handleSubmit } = useForm<FormDataType>({
    resolver: zodResolver(FormDataSchema),
  });

  const onSubmit = handleSubmit(async (data, e) => {
    e?.preventDefault();

    // console.log(data);
    const { data: user, message } = await handleRegisterFormAction(data);

    if (user) {
      setUserList([...userList, user]);
    } else {
      alert(message);
    }
  });

  return (
    <>
      <div className="flex flex-col items-center justify-center p-6">
        <div className="flex items-center justify-center p-6">
          <form onSubmit={onSubmit}>
            <div className="space-y-6">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Registration
              </h2>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Name*
                  </label>
                  <div className="mt-2">
                    <Controller
                      control={control}
                      name="name"
                      render={({ field, fieldState }) => (
                        <>
                          <input
                            {...field}
                            type="text"
                            autoComplete="given-name"
                            className="block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                          <p className="mt-2 text-sm text-red-600">
                            {fieldState.error?.message}
                          </p>
                        </>
                      )}
                    />
                  </div>
                </div>
                <div className="sm:col-span-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Email address*
                  </label>
                  <div className="mt-2">
                    <Controller
                      control={control}
                      name="email"
                      render={({ field, fieldState }) => (
                        <>
                          <input
                            {...field}
                            type="email"
                            autoComplete="email"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                          <p className="mt-2 text-sm text-red-600">
                            {fieldState.error?.message}
                          </p>
                        </>
                      )}
                    />
                  </div>
                </div>
                <div className="col-span-full">
                  <label
                    htmlFor="observation"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Observations
                  </label>
                  <div className="mt-2">
                    <Controller
                      control={control}
                      name="remarks"
                      render={({ field, fieldState }) => (
                        <>
                          <textarea
                            {...field}
                            rows={3}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            defaultValue={""}
                          />
                          <p className="mt-2 text-sm text-red-600">
                            {fieldState.error?.message}
                          </p>
                        </>
                      )}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
              <button
                type="button"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Confirm
              </button>
            </div>
          </form>
        </div>

        {/* List of users */}

        <div className="mt-6">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Users
          </h2>
          <ul className="mt-2 space-y-2">
            {userList.length > 0 ? (
              userList.map((user) => (
                <li key={user.email}>
                  <p className="text-sm font-semibold leading-6 text-gray-900">
                    {user.name}
                  </p>
                  <p className="text-sm leading-6 text-gray-500">
                    {user.email}
                  </p>
                  <p className="text-sm leading-6 text-gray-500">
                    {user.remarks}
                  </p>
                </li>
              ))
            ) : (
              <li>
                <p className="text-sm leading-6 text-gray-500">No users yet</p>
              </li>
            )}
          </ul>
        </div>
      </div>
    </>
  );
}
