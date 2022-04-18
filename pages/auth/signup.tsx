// // import { Alert } from "@calcom/ui/Alert";
// import { asStringOrNull } from "@lib/asStringOrNull";
// import { NEXT_PUBLIC_BASE_URL } from "@lib/config/constants";
import { useLocale } from "@lib/hooks/useLocale";
import Button from "@ui/Button";
// import prisma from "@lib/prisma";
// import { inferSSRProps } from "@lib/types/inferSSRProps";
// import { IS_GOOGLE_LOGIN_ENABLED } from "@server/lib/constants";
// import { ssrInit } from "@server/lib/ssr";
// import { GetServerSidePropsContext } from "next";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

// import { HeadSeo } from "@components/seo/head-seo";
// import { isSAMLLoginEnabled } from "../../components/lib/saml";
import { EmailField, PasswordField, TextField } from "../../components/ui/form/fields";

type FormValues = {
  username: string;
  email: string;
  password: string;
  passwordcheck: string;
  apiError: string;
};

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const { t } = useLocale();
  const router = useRouter();
  const methods = useForm<FormValues>();
  const {
    register,
    formState: { isSubmitting },
  } = methods;

  methods.setValue("email", email);
  methods.setValue("username", username);
  methods.setValue("password", password);

  const signUp: SubmitHandler<FormValues> = async (data) => {
    await fetch("/api/auth/signup", {
      body: JSON.stringify({
        ...data,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    })
      .then(async (resp: Response) => {
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
    <div className="flex min-h-screen  justify-between py-12 sm:px-6 lg:px-8 mx-auto w-2/3 items-center">
      {/* <HeadSeo title={t("sign_up")} description={t("sign_up")} /> */}

      <div className=" flex flex-col w-1/3">
        <h2 className="text-black h-12 font-bold">Cal.com</h2>
        <p className="text-black font-bold text-5xl">You&apos;re one step away from simpler scheduling.</p>
        <p className="text-sm my-3">
          I love been able to use a tool that just works, and that is open source. As a developer, I love been
          empowered to contribute to a tool that i use regularly
        </p>
        <div className="flex justify-between">
          <img src="https://picsum.photos/200" className="w-1/3 h-1/3 rounded-full" />
          <div className="flex flex-col">
            <h2 className="text-sm">Cassidy Williams @cassidoo</h2>
            <p className="text-sm text-gray"> Director of Developer Experience at Netlify</p>
          </div>
        </div>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md ">
        <div className="mx-2 bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <h2 className="font-cal text-left text-2xl font-extrabold text-black-700">
              Start your 14-day free trial
            </h2>
            <p className="text-sm text-slate-500">
              <strong>No credit card required.</strong> Try all pro features for 14 days.
            </p>
            <p className="text-sm text-slate-500 ">Upgrade at any time to pro for 12/month</p>
          </div>

          <hr className=" my-5" />
          {/* TODO: Refactor as soon as /availability is live */}
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(signUp)} className="space-y-6 bg-white">
              {/* {errors.apiError && <Alert severity="error" message={errors.apiError?.message} />} */}
              <div className="space-y-2">
                <TextField
                  name=""
                  placeholder="Username"
                  value={username}
                  addOnLeading={
                    <span className="inline-flex items-center rounded-l-sm border border-r-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500">
                      cal.com/
                    </span>
                  }
                  labelProps={{ className: "block text-sm font-medium text-gray-700" }}
                  onChange={(e) => setUsername(e.target.value)}
                  className="block w-full min-w-0 flex-grow rounded-none rounded-r-sm border-gray-300 lowercase focus:border-black focus:ring-black sm:text-sm"
                  required
                />

                <EmailField
                  name=""
                  value={email}
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full rounded-md border border-gray-300 bg-gray-100 px-3 py-2 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
                />
                <PasswordField
                  labelProps={{
                    className: "block text-sm font-medium text-gray-700",
                  }}
                  name=""
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
                />
              </div>
              <div className="flex justify-center ">
                <button
                  // loading={isSubmitting}
                  className="w-full justify-center bg-slate-900 py-2 text-sm text-white hover:bg-sky"
                  color="black">
                  {t("Sign up for free")}
                </button>
              </div>
            </form>
          </FormProvider>
          <div className="py-3 px-auto bg-gray text-sm text-slate-500">
            <p>
              By signing up, you agree to our <strong>Terms and condition</strong> and{" "}
              <strong>Privacy Policy.</strong>
            </p>
            <p>Need help? Get in tourch</p>
            <Link href="/auth/login">
              <span className="flex justify-center mt-3 cursor-pointer text-center">
                click here to log in
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
// const ssr = await ssrInit(ctx);
// const token = asStringOrNull(ctx.query.token);
// if (!token) {
//   return {
//     notFound: true,
//   };
// }
// const verificationRequest = await prisma.verificationRequest.findUnique({
//   where: {
//     token,
//   },
// });

// for now, disable if no verificationRequestToken given or token expired
// if (!verificationRequest || verificationRequest.expires < new Date()) {
//   return {
//     notFound: true,
//   };
// }

// const existingUser = await prisma.user.findFirst({
//   where: {
//     AND: [
//       {
//         email: verificationRequest.identifier,
//       },
//       {
//         emailVerified: {
//           not: null,
//         },
//       },
//     ],
//   },
// });

// if (existingUser) {
//   return {
//     redirect: {
//       permanent: false,
//       destination: "/auth/login?callbackUrl=" + `${NEXT_PUBLIC_BASE_URL}/${ctx.query.callbackUrl}`,
//     },
//   };
// }

// return {
//   props: {
//     isGoogleLoginEnabled: IS_GOOGLE_LOGIN_ENABLED,
//     isSAMLLoginEnabled,
//     email: verificationRequest.identifier,
//     // trpcState: ssr.dehydrate(),
//   },
// };
// };
