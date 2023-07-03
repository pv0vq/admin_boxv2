// ** React Imports
import { createContext, useEffect, useState, ReactNode } from "react";

// ** Next Import
import { useRouter } from "next/router";

// ** Types
import {
  AuthValuesType,
  LoginParams,
  ErrCallbackType,
  UserDataType,
} from "./types";

// ** Hooks
import useSignIn, { setToken } from "src/hooks/queries/useSignIn";
import { useMutation, useQueryClient } from "react-query";
import { fetchAdminInfo } from "@/hooks/queries/useAdminInfo";

// ** Constants
import QUERY_KEYS from "@/assets/constants/queries";

// ** Third Party Import
import { Cookies } from "react-cookie";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { breadcrumbsActions, dialogsActions } from "@/store/reducers";
import fetcher from "@/utils/fetcher";
import { API_AUTH } from "@/assets/api";

// ** Defaults
const defaultProvider: AuthValuesType = {
  user: null,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  isInitialized: false,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  setIsInitialized: () => Boolean,
  refreshToken: () => null,
};

const AuthContext = createContext(defaultProvider);

type Props = {
  children: ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  const cookies = new Cookies();

  // ** States
  const [user, setUser] = useState<UserDataType | null>(defaultProvider.user);
  const [loading, setLoading] = useState<boolean>(defaultProvider.loading);
  const [isInitialized, setIsInitialized] = useState<boolean>(
    defaultProvider.isInitialized
  );
  const { mutate } = useSignIn();
  const useRefreshToken = useMutation(
    async (options: { userId: string; refreshToken: string }) =>
      await fetcher({ api: API_AUTH.REFRESH_TOKEN, options }).then(
        (data) => data.data
      )
  );

  // ** Hooks
  const router = useRouter();
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  useEffect(() => {
    initAuth();
  }, []);

  useEffect(() => {
    if (user) {
      const { pathname } = router;
      const { adminMenuList } = user;
      dispatch(
        breadcrumbsActions.setBreadCrumbs({ menuList: adminMenuList, pathname })
      );
    }
    return () => {
      dispatch(breadcrumbsActions.clear({}));
    };
  }, [user, router.route]);

  const handleLogin = (
    params: LoginParams,
    errorCallback?: ErrCallbackType
  ) => {
    mutate(params, {
      onSuccess: ({ data, status, success, message }) => {
        if (status === "OK") {
          const { accessToken, refreshToken } = data;
          const returnUrl = router.query.returnUrl;
          const redirectURL = returnUrl && returnUrl !== "/" ? returnUrl : "/";
          setToken({ accessToken, refreshToken });
          queryClient
            .fetchQuery([QUERY_KEYS.ADMIN_INFO], fetchAdminInfo)
            .then((userData) => {
              setLoading(false);
              setUser(userData);
              localStorage.setItem("userId", userData.adminId);
            })
            .catch(() => {
              setLoading(false);
            });
          router.replace(redirectURL as string);
        } else if (success === false) {
          toast.error(message, { duration: 5000 });
        } else {
          toast.error(message);
        }
      },
      onError: (error: any) => {
        toast.error(error.response.data.message, { duration: 5000 });

        if (errorCallback) {
          errorCallback(error);
        }
      },
    });
  };

  const handleLogout = () => {
    setIsInitialized(false);
    setUser(null);
    localStorage.removeItem("userId");
    cookies.remove("accessToken");
    cookies.remove("refreshToken");
    router.push("/auth/signIn");
  };

  const initAuth = async (): Promise<void> => {
    const { accessToken } = cookies.getAll();
    setIsInitialized(true);
    if (accessToken) {
      queryClient
        .fetchQuery([QUERY_KEYS.ADMIN_INFO], fetchAdminInfo)
        .then((userData) => {
          setLoading(false);
          setUser(userData);
          localStorage.setItem("userId", userData.adminId);
        })
        .catch((error: any) => {
          dispatch(dialogsActions.clear({}));
          setLoading(false);
          router.replace("/401");
        });
    } else {
      dispatch(dialogsActions.clear({}));
      setLoading(false);
      router.replace(`/auth/signIn`);
    }
  };

  const handleRefreshToken = ({
    userId,
    refreshToken,
  }: {
    userId: string;
    refreshToken: string;
  }) => {
    useRefreshToken.mutate(
      { userId, refreshToken },
      {
        onSuccess: (data) => {
          const { accessToken, refreshToken, username } = data.data;
          setToken({ accessToken, refreshToken });
          localStorage.setItem("userId", username);
          initAuth();
        },
        onError: () => {
          handleLogout();
        },
      }
    );
  };

  const values = {
    user,
    loading,
    setUser,
    setLoading,
    isInitialized,
    setIsInitialized,
    login: handleLogin,
    logout: handleLogout,
    refreshToken: handleRefreshToken,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
