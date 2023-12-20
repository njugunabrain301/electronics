import xmasBanner from "@/assets/images/xmas-banner.gif";
import xmasHat from "@/assets/images/xmas-hat.gif";
import xmasTree from "@/assets/images/xmas-tree.gif";

export const getHoliday = () => {
  return {
    name: "christmas",
    sideBanner: xmasTree,
    centerBanner: xmasBanner,
    cardCorner: xmasHat,
  };
};
