import { Gender } from "@/store/admin/useCustomerStore";

export default (gender: string) => {
  if (gender === Gender.FEMALE) return "여성";
  if (gender === Gender.MALE) return "남성";
  if (gender === Gender.OTHER) return "기타";

  return "잘못된 성별 정보";
};
