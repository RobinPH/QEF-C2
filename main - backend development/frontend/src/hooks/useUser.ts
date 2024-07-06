import { User } from "@types";
import { useEffect, useState } from "react";
import { useBackend } from "./useBackend";

export const useUser = (id?: string | null) => {
  const { user: userService } = useBackend();

  const [isLoading, setIsLoading] = useState(true);

  const [user, setUser] = useState<User>();

  useEffect(() => {
    (async () => {
      setIsLoading(true);

      if (!id) {
        setIsLoading(false);
        return;
      }

      const user = await userService.get(id);

      if (!user) {
        setIsLoading(false);
        return;
      }

      setUser(user);

      setIsLoading(false);
    })();
  }, [id, userService]);

  return { isLoading, user };
};
