"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { handleRegisterFormAction } from "./RegisterAction";
import { FormDataSchema, FormDataType } from "@/dtos/ticket.dto";

export function RegisterForm() {
  const { control, handleSubmit, formState, reset } = useForm<FormDataType>({
    defaultValues: {
      name: "",
      email: "",
      remarks: "",
    },
    resolver: zodResolver(FormDataSchema),
  });
  const isSubmitting = formState.isSubmitting;

  const onSubmit = handleSubmit(async (data, e) => {
    e?.preventDefault();

    try {
      // console.log(data);
      await handleRegisterFormAction(data);
    } catch (error) {
      alert("Something went wrong");
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
                disabled={isSubmitting}
                className="text-sm font-semibold leading-6 text-gray-900"
                onClick={() => reset()}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {isSubmitting ? (
                  <div className="text-center">
                    <div role="status">
                      <svg
                        aria-hidden="true"
                        className="mr-2 inline h-4 w-4 animate-spin fill-white text-gray-200 dark:text-gray-600"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill"
                        />
                      </svg>
                      <span className="sr-only">Loading...</span>
                    </div>
                  </div>
                ) : (
                  "Submit"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
