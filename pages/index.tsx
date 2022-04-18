import { GetServerSidePropsContext } from "next";
import { getCsrfToken, signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

import { getSession } from "@helpers/auth";

import { EmailField, PasswordField, TextField } from "../components/ui/form/fields";

interface ServerSideProps {
  csrfToken: string;
}

type FormValues = {
  email: string;
  password: string;
  apiError: string;
};

export default function Login({ csrfToken }: ServerSideProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const methods = useForm<FormValues>();

  methods.setValue("email", email);
  methods.setValue("password", password);

  const callbackUrl = typeof router.query?.callbackUrl === "string" ? router.query.callbackUrl : "/private";

  const login: SubmitHandler<FormValues> = async (data) => {
    await fetch("/api/auth/login", {
      body: JSON.stringify({
        ...data,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    })
      .then(async (resp) => {
        if (!resp.ok) {
          const err = await resp.json();
          throw new Error(err.message);
        }
        const data = await resp.json();

        router.push(`/bookings/${data.user.id}`);
      })
      .catch((err) => {
        methods.setError("apiError", { message: err.message });
      });
  };

  return (
    <div className="flex flex-col justify-center items-center border min-h-screen">
      <div className="mt-8 sm:mx-auto  sm:w-full sm:max-w-md  ">
        <div className="flex flex-col  items-center sm:mx-auto sm:w-full sm:max-w-md  my-5">
          <h2 className="font-cal text-left text-2xl font-medium text-black-700 my-3">Cal.com</h2>
          <p className=" text-black my-3 text-3xl font-black">Sign in to your account</p>
        </div>
        <div className="mx-2 bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10 ">
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(login)} className="space-y-6 bg-white">
              {/* {errors.apiError && <Alert severity="error" message={errors.apiError?.message} />} */}
              <div className="space-y-2">
                <EmailField
                  name="Email Address"
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full rounded-md border border-gray-300 bg-gray-100 px-3 py-2 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
                />
                <PasswordField
                  labelProps={{
                    className: "block text-sm font-medium text-gray-700",
                  }}
                  name="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
                />
              </div>
              <div className="flex justify-center ">
                <button
                  // loading={isSubmitting}
                  className="w-full justify-center bg-slate-900 py-2 text-sm text-white hover:bg-sky"
                  color="black">
                  Sign In
                </button>
              </div>
            </form>
          </FormProvider>
          <div className="py-3 px-auto bg-gray text-sm text-slate-500">
            <p>
              Dont have an account?
              <Link href="/auth/signup">
                <strong className="cursor-pointer"> Create an Account</strong>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { req } = context;
  const session = await getSession({ req });

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}
