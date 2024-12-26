import { PaymentMethod } from "@/store/useOrderStore";

export default (paymentMethod: string) => {
  if (paymentMethod === PaymentMethod.digitalWallet) {
    return "간편 결제";
  }

  if (paymentMethod === PaymentMethod.creditOrDebitCart) {
    return "신용/체크카드 결제";
  }

  if (paymentMethod === PaymentMethod.depositWithoutPassbook) {
    return "무통장입금";
  }

  return "잘못된 결제 정보";
};
