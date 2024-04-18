import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import axios from "./axios";

export function useLogoutMutation() {
  const { toast } = useToast();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async () => {
      const res = await axios.post("/api/user/auth/logout", null, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.status !== 200) throw new Error(res.request);
      return res;
    },
    onSuccess: () => {
      toast({
        title: "Logout berhasil",
      });
      localStorage.removeItem("token");
      navigate("/");
    },
    onError: () => {
      toast({
        title: "Logout gagal",
        variant: "destructive",
      });
    },
  });
}
