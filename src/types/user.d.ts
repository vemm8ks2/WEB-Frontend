import { Gender } from "@/store/useAuthStore";

enum Role {
  "ADMIN" = "ROLE_ADMIN",
  "USER" = "ROLE_USER",
}

interface Authority {
  authority: Role;
}

export interface User {
  accountNonExpired: boolean;
  accountNonLocked: boolean;
  authorities: Authority[];
  birthDate: Date | null;
  createdAt: Date;
  credentialsNonExpired: boolean;
  enabled: boolean;
  gender: Gender;
  id: number;
  password: string;
  role: keyof typeof Role;
  username: string;
}
