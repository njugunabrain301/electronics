import xmasBanner from "@/assets/images/xmas-banner.gif";
import xmasHat from "@/assets/images/xmas-hat.gif";
import xmasTree from "@/assets/images/xmas-tree.gif";

import fireworks from "@/assets/images/fireworks.gif";
import newYear from "@/assets/images/new-year.gif";

export const getHoliday = () => {
  let date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;

  let holidays = {
    christmas: {
      name: "christmas",
      sideBanner: xmasTree,
      centerBanner: xmasBanner,
      cardCorner: xmasHat,
    },
    newYear: {
      name: "Happy New Year",
      sideBanner: fireworks,
      centerBanner: newYear,
    },
  };

  let holiday = null;

  if (month === 12 && day >= 23 && day <= 28) holiday = holidays["christmas"];
  else if ((month === 12 && day >= 30) || (month === 1 && day <= 3))
    holiday = holidays["newYear"];

  return holiday;
};
