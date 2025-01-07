import { Gender } from "@/store/admin/useCustomerStore";

import type { Order } from "@/types/order";

export default ({ orders }: { orders: Order[] }) => {
  return {
    line: setLineChart(orders),
  };
};

const setLineChart = (orders: Order[]) => {
  const result = {
    label: [
      { dayOfWeek: "일", count: 0 },
      { dayOfWeek: "월", count: 0 },
      { dayOfWeek: "화", count: 0 },
      { dayOfWeek: "수", count: 0 },
      { dayOfWeek: "목", count: 0 },
      { dayOfWeek: "금", count: 0 },
      { dayOfWeek: "토", count: 0 },
    ],
    multiple: [
      {
        dayOfWeek: "일",
        [Gender.MALE]: 0,
        [Gender.FEMALE]: 0,
        [Gender.OTHER]: 0,
      },
      {
        dayOfWeek: "월",
        [Gender.MALE]: 0,
        [Gender.FEMALE]: 0,
        [Gender.OTHER]: 0,
      },
      {
        dayOfWeek: "화",
        [Gender.MALE]: 0,
        [Gender.FEMALE]: 0,
        [Gender.OTHER]: 0,
      },
      {
        dayOfWeek: "수",
        [Gender.MALE]: 0,
        [Gender.FEMALE]: 0,
        [Gender.OTHER]: 0,
      },
      {
        dayOfWeek: "목",
        [Gender.MALE]: 0,
        [Gender.FEMALE]: 0,
        [Gender.OTHER]: 0,
      },
      {
        dayOfWeek: "금",
        [Gender.MALE]: 0,
        [Gender.FEMALE]: 0,
        [Gender.OTHER]: 0,
      },
      {
        dayOfWeek: "토",
        [Gender.MALE]: 0,
        [Gender.FEMALE]: 0,
        [Gender.OTHER]: 0,
      },
    ],
    interactive: [] as {
      [Gender.FEMALE]: number;
      [Gender.MALE]: number;
      date: string;
    }[],
  };

  const interactive = [];
  const grouped: {
    [date: string]: {
      [Gender.FEMALE]: number;
      [Gender.MALE]: number;
    };
  } = {};

  orders.forEach((order) => {
    if (!order.deliveredAt) return;

    const deliveredAt = new Date(order.deliveredAt);
    const dayOfWeek = deliveredAt.getDay();

    result.label[dayOfWeek].count++;
    result.multiple[dayOfWeek][order.user.gender]++;

    const date = `${deliveredAt.getFullYear()}-${String(
      deliveredAt.getMonth() + 1
    ).padStart(2, "0")}`;

    if (!grouped[date]) {
      grouped[date] = { [Gender.FEMALE]: 0, [Gender.MALE]: 0 };
    }

    if (order.user.gender === Gender.FEMALE) grouped[date][Gender.FEMALE]++;
    else if (order.user.gender === Gender.MALE) grouped[date][Gender.MALE]++;
  });

  for (const date in grouped) {
    interactive.push({ date: `${date}-01`, ...grouped[date] });
  }

  result.interactive = interactive;

  return result;
};
