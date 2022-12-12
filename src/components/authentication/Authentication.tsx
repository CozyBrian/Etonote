import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { motion } from "framer-motion";
import {
  afterRedirect,
  getError,
  loginUser,
  loginWithGoogle,
  registerUser,
} from "../../services/authentication";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { action } from "../../redux";
import { Oval } from "react-loader-spinner";
import { getUsername, setUserData } from "../../services/database";

import google from "../../assets/images/google-icon.png";

type Inputs = {
  email: string;
  password: string;
  username?: string;
};

const Authentication = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [fireError, setFireError] = useState<null | string>();
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("persistantState");
    if (user.user_id !== null) {
      if (isRegister) {
        navigate("/newUser");
      } else {
        navigate("/");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    afterRedirect().then((result) => {
      if (result !== null) {
        const user = result.user;
        dispatch(
          action.user.setActiveUser({
            userName: user.displayName,
            userEmail: user.email,
            user_id: user.uid,
          })
        );
      }
    });
  }, [dispatch]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (user) => {
    setIsLoading(true);
    if (isRegister) {
      registerUser(user.email, user.password)
        .then((data) => {
          dispatch(
            action.user.setActiveUser({
              userName: user.username,
              userEmail: data.user.email,
              user_id: data.user.uid,
            })
          );
          setUserData(data.user.uid, data.user.email, user.username);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error.message);
          setIsLoading(false);
        });
    } else {
      loginUser(user.email, user.password)
        .then((data) => {
          getUsername(data.user.uid).then((name) => {
            dispatch(
              action.user.setActiveUser({
                userName: name,
                userEmail: data.user.email,
                user_id: data.user.uid,
              })
            );
          });

          setIsLoading(false);
        })
        .catch((error) => {
          setFireError(getError(error.code));
          setIsLoading(false);
        });
    }
  };

  const handleWithGoogle = () => {
    loginWithGoogle().then((result) => {});
  };

  const handleOnChange = () => {
    setFireError("");
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="w-screen h-full flex justify-center items-center bg-slate-300 dark:bg-zinc-900"
      >
        <motion.div
          exit={{ opacity: 0 }}
          className="flex flex-col w-[500px] py-16 items-center bg-white shadow-xl rounded-2xl p-8 font-['VarelaRound'] duration-100"
        >
          <h1 className="text-4xl mb-2">{isRegister ? "Sign Up" : "Login"}</h1>
          <p className="text-slate-300">
            {isRegister ? "Sign Up" : "Login"} to Etonote.
          </p>
          <form
            onSubmit={handleSubmit(onSubmit)}
            onChange={handleOnChange}
            className="flex flex-col gap-4 my-8"
          >
            {isRegister && (
              <div className="flex flex-col ">
                <label className="font-['VarelaRound']">Username</label>
                <input
                  className="relative border border-slate-300 w-72 outline-none focus:outline focus:outline-slate-400 p-2 rounded-lg font-['Montserrat'] duration-200"
                  placeholder="Username"
                  id="username"
                  accept="text"
                  {...register("username", { required: true })}
                />
                {errors.username && (
                  <span className="text-red-600 text-sm">
                    Username is required{errors.username.message}
                  </span>
                )}
              </div>
            )}
            <div className="flex flex-col ">
              <label className="font-['VarelaRound']">Email</label>
              <input
                className="relative border border-slate-300 w-72 outline-none focus:outline focus:outline-slate-400 p-2 rounded-lg font-['Montserrat'] duration-200"
                placeholder="Email"
                id="email"
                accept="email"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <span className="text-red-600 text-sm">
                  Email is required{errors.email.message}
                </span>
              )}
            </div>
            <div className="flex flex-col">
              <label className="font-['VarelaRound']">Password</label>
              <input
                className="relative border border-slate-300 w-72 outline-none focus:outline focus:outline-slate-400 p-2 rounded-lg font-['Montserrat'] duration-200"
                placeholder="Password"
                id="pass"
                type="password"
                {...register("password", { required: true, minLength: 6 })}
              />
              {errors.password && (
                <span className="text-red-600 text-sm">
                  {errors.password?.message}
                </span>
              )}
              {!isRegister && (
                <div
                  onClick={() => {
                    isRegister ? navigate("/newUser") : navigate("/home");
                  }}
                  className="flex flex-row justify-between items-center"
                >
                  <button className="text-sky-500 active:text-sky-600 text-xs mt-2">
                    Forgot Password?
                  </button>
                  {fireError && (
                    <span className="text-red-600 text-sm">{fireError}</span>
                  )}
                </div>
              )}
            </div>
            <div className="mt-4">
              <button
                className="flex items-center justify-center w-full bg-sky-500 active:bg-sky-600 p-2 text-white font-bold rounded-lg duration-100"
                type="submit"
              >
                {isLoading ? (
                  <Oval
                    height={20}
                    width={20}
                    strokeWidth={3}
                    color="rgba(255, 255, 255, 1)"
                    secondaryColor="rgba(255, 255, 255, 0.49)"
                  />
                ) : isRegister ? (
                  "Sign Up"
                ) : (
                  "Login"
                )}
              </button>
            </div>
          </form>
          <div className="w-72 m-4">
            <button
              onClick={handleWithGoogle}
              className="flex flex-row items-center justify-center w-full border-2 border-black/30 active:border-black p-2 font-bold rounded-3xl duration-100"
            >
              <img className="h-5 px-2" src={google} alt="google" />
              {isRegister ? "Sign Up" : "Login"} with Google
            </button>
          </div>
          <div className="">
            <button
              onClick={() => setIsRegister(!isRegister)}
              className="text-xs mt-2 active:opacity-75"
            >
              {isRegister
                ? "Already have an account? "
                : "Don't have an account? "}
              <span className="text-sky-500 underline">
                {isRegister ? "Log In" : "Sign Up"}
              </span>
            </button>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
};

export default Authentication;
