import { Gender } from "@/store/admin/useCustomerStore";

import type { User } from "@/types/user";

export const enum AgeGroup {
  CHILD = "0세 ~ 18세",
  YOUNG_ADULT = "19세 ~ 29세",
  ADULT = "30세 ~ 39세",
  MIDDLE_AGED = "40세 ~ 59세",
  SENIOR = "60세 ~",
}

export default ({ users }: { users: User[] }) => {
  return {
    ...setAreaChart(users),
    bar: setBarChart(users),
    radial: setRadialChart(users),
  };
};

const setAreaChart = (users: User[]) => {
  const result = {
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

  const interactive = [];
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

    result.area[dayOfWeek].count++;
    result.stacked[dayOfWeek][user.gender]++;

    // const date = user.createdAt.toString().split("T")[0];
    const date = `${createdAt.getFullYear()}-${String(
      createdAt.getMonth() + 1
    ).padStart(2, "0")}`;

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
    interactive.push({ date: `${date}-01`, ...grouped[date] });
  }

  result.interactive = interactive;

  return result;
};

const setBarChart = (users: User[]) => {
  const result = {
    label: [
      { group: AgeGroup.CHILD, count: 0 },
      { group: AgeGroup.YOUNG_ADULT, count: 0 },
      { group: AgeGroup.ADULT, count: 0 },
      { group: AgeGroup.MIDDLE_AGED, count: 0 },
      { group: AgeGroup.SENIOR, count: 0 },
    ],
    multiple: [
      { group: AgeGroup.CHILD, [Gender.FEMALE]: 0, [Gender.MALE]: 0 },
      { group: AgeGroup.YOUNG_ADULT, [Gender.FEMALE]: 0, [Gender.MALE]: 0 },
      { group: AgeGroup.ADULT, [Gender.FEMALE]: 0, [Gender.MALE]: 0 },
      { group: AgeGroup.MIDDLE_AGED, [Gender.FEMALE]: 0, [Gender.MALE]: 0 },
      { group: AgeGroup.SENIOR, [Gender.FEMALE]: 0, [Gender.MALE]: 0 },
    ],
    negative: [],
    interactive: [] as {
      [Gender.FEMALE]: number;
      [Gender.MALE]: number;
      birth: string;
    }[],
  };

  const label: { group: AgeGroup; count: number }[] = [];
  const groupingByAge: { [group in AgeGroup]: number } = {
    "0세 ~ 18세": 0,
    "19세 ~ 29세": 0,
    "30세 ~ 39세": 0,
    "40세 ~ 59세": 0,
    "60세 ~": 0,
  };

  const multiple: {
    group: AgeGroup;
    [Gender.FEMALE]: number;
    [Gender.MALE]: number;
  }[] = [];
  const groupingByGender: {
    [group in AgeGroup]: { [Gender.FEMALE]: number; [Gender.MALE]: number };
  } = {
    "0세 ~ 18세": { FEMALE: 0, MALE: 0 },
    "19세 ~ 29세": { FEMALE: 0, MALE: 0 },
    "30세 ~ 39세": { FEMALE: 0, MALE: 0 },
    "40세 ~ 59세": { FEMALE: 0, MALE: 0 },
    "60세 ~": { FEMALE: 0, MALE: 0 },
  };

  const interactive: {
    [Gender.FEMALE]: number;
    [Gender.MALE]: number;
    birth: string;
  }[] = [];
  const groupingByBirth: {
    [birth: string]: {
      [Gender.FEMALE]: number;
      [Gender.MALE]: number;
    };
  } = {};

  users.forEach((user) => {
    if (!user.birthDate) return;

    const curr = new Date();
    const birth = new Date(user.birthDate);

    let age = curr.getFullYear() - birth.getFullYear();
    const monthDifference = curr.getMonth() - birth.getMonth();

    if (
      monthDifference < 0 ||
      (monthDifference === 0 && curr.getDate() < birth.getDate())
    ) {
      age--;
    }

    if (age >= 0 && age <= 18) {
      groupingByAge[AgeGroup.CHILD]++;

      if (user.gender !== Gender.OTHER) {
        groupingByGender[AgeGroup.CHILD][user.gender]++;
      }
    }

    if (age >= 19 && age <= 29) {
      groupingByAge[AgeGroup.YOUNG_ADULT]++;

      if (user.gender !== Gender.OTHER) {
        groupingByGender[AgeGroup.YOUNG_ADULT][user.gender]++;
      }
    }

    if (age >= 30 && age <= 39) {
      groupingByAge[AgeGroup.ADULT]++;

      if (user.gender !== Gender.OTHER) {
        groupingByGender[AgeGroup.ADULT][user.gender]++;
      }
    }

    if (age >= 40 && age <= 59) {
      groupingByAge[AgeGroup.MIDDLE_AGED]++;

      if (user.gender !== Gender.OTHER) {
        groupingByGender[AgeGroup.MIDDLE_AGED][user.gender]++;
      }
    }

    if (age >= 60) {
      groupingByAge[AgeGroup.SENIOR]++;

      if (user.gender !== Gender.OTHER) {
        groupingByGender[AgeGroup.SENIOR][user.gender]++;
      }
    }

    if (!groupingByBirth[birth.getFullYear()]) {
      groupingByBirth[birth.getFullYear()] = {
        [Gender.FEMALE]: 0,
        [Gender.MALE]: 0,
      };
    }

    if (user.gender === Gender.FEMALE)
      groupingByBirth[birth.getFullYear()][Gender.FEMALE]++;
    if (user.gender === Gender.MALE)
      groupingByBirth[birth.getFullYear()][Gender.MALE]++;
  });

  for (const grouped in groupingByAge) {
    const group = grouped as AgeGroup;
    label.push({ group, count: groupingByAge[group] });
  }

  for (const grouped in groupingByGender) {
    const group = grouped as AgeGroup;
    multiple.push({
      group,
      FEMALE: groupingByGender[group][Gender.FEMALE],
      MALE: groupingByGender[group][Gender.MALE],
    });
  }

  for (const birth in groupingByBirth) {
    interactive.push({ birth, ...groupingByBirth[birth] });
  }

  result.label = label;
  result.multiple = multiple;
  result.interactive = interactive;

  return result;
};

const setRadialChart = (users: User[]) => {
  const result = {
    text: [
      { gender: Gender.FEMALE, count: 0 },
      { gender: Gender.MALE, count: 0 },
      { gender: Gender.OTHER, count: 0 },
    ],
    stacked: [{ [Gender.FEMALE]: 0, [Gender.MALE]: 0 }],
  };

  users.forEach((user) => {
    if (user.gender === Gender.FEMALE) result.text[0].count++;
    if (user.gender === Gender.MALE) result.text[1].count++;
    if (user.gender === Gender.OTHER) result.text[2].count++;
  });

  result.stacked[0][Gender.FEMALE] = result.text[0].count;
  result.stacked[0][Gender.MALE] = result.text[1].count;

  console.log(result);

  return result;
};
