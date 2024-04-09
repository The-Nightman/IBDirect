import { createContext, useContext, useEffect, useState } from "react";
import { StaffDetails } from "../interfaces/StaffDetails";
import { useAuth } from "./AuthContext";
import { userStaffDetails } from "../api/getStaffUserDetails";

interface UserDetailsContextInterface {
  userDetails: StaffDetails | null;
}

interface UserDetailsProviderProps {
  children: React.ReactNode;
}

const UserDetailsContext = createContext<
  UserDetailsContextInterface | undefined
>(undefined);

export const UserDetailsProvider = ({ children }: UserDetailsProviderProps) => {
  const { user } = useAuth();
  const [userDetails, setUserDetails] = useState<StaffDetails | null>(null);

  useEffect(() => {
    if (user.userID && user.role) {
      if ([2, 3, 4, 5].includes(Number(user.role))) {
        userStaffDetails(user.userID)
          .then((res) => {
            setUserDetails(res.data);
          })
          .catch((err) => {
            throw new Error(err);
          });
      }
    }
  }, [user]);

  return (
    <UserDetailsContext.Provider value={{ userDetails }}>
      {children}
    </UserDetailsContext.Provider>
  );
};

export const useUserDetails = () => {
  return useContext(UserDetailsContext) as UserDetailsContextInterface;
};
