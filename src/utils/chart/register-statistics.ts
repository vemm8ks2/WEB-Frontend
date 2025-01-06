import { Gender } from "@/store/admin/useCustomerStore";

import type { User } from "@/types/user";

export default ({ users }: { users: User[] }) => {
  const data = {
    area: [
      { dayOfWeek: "일", count: 0 },
      { dayOfWeek: "월", count: 0 },
      { dayOfWeek: "화", count: 0 },
      { dayOfWeek: "수", count: 0 },
      { dayOfWeek: "목", count: 0 },
      { dayOfWeek: "금", count: 0 },
      { dayOfWeek: "토", count: 0 },
    ],
    stacked: [
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
      [Gender.OTHER]: number;
      date: string;
    }[],
  };

  const result = [];
  const grouped: {
    [date: string]: {
      [Gender.FEMALE]: number;
      [Gender.MALE]: number;
      [Gender.OTHER]: number;
    };
  } = {};

  users.forEach((user) => {
    if (!user.createdAt) return;

    const createdAt = new Date(user.createdAt);
    const dayOfWeek = createdAt.getDay();

    data.area[dayOfWeek].count++;
    data.stacked[dayOfWeek][user.gender]++;

    const date = user.createdAt.toString().split("T")[0];

    if (!grouped[date]) {
      grouped[date] = {
        [Gender.FEMALE]: 0,
        [Gender.MALE]: 0,
        [Gender.OTHER]: 0,
      };
    }

    if (user.gender === Gender.FEMALE) grouped[date][Gender.FEMALE]++;
    else if (user.gender === Gender.MALE) grouped[date][Gender.MALE]++;
    else if (user.gender === Gender.OTHER) grouped[date][Gender.OTHER]++;
  });

  for (const date in grouped) {
    result.push({ date, ...grouped[date] });
  }

  data.interactive = result;

  return data;
};
