import { useNavigate } from "react-router-dom";
import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import axios from "@/api/axios";
import { BaseResponse } from "@/types/BaseResponse";
import { UserEmailType, UserSendEmailType } from "@/types/users";

export function useGetUserEmailListQuery() {
  const navigate = useNavigate();
  return useQuery({
    queryKey: ["project-list"],
    queryFn: async () => {
      const res = await axios.get<BaseResponse<UserEmailType[]>>(`/api/email/get-email`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.status !== 200) {
        localStorage.removeItem("token");
        navigate("/");
        return false;
      }
      return res.data;
    },
  });
}

export function useSendEmailUser(
  data: UserSendEmailType,
  { onSuccess, onError }: { onSuccess: () => void; onError: () => void }
) {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async () => {
      const res = await axios.post<BaseResponse<UserSendEmailType>>("/api/email/send-email", data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.status !== 200) {
        localStorage.removeItem("token");
        navigate("/");
        return false;
      }
      return res.data;
    },
    onSuccess: onSuccess,
    onError: onError,
  });
}
