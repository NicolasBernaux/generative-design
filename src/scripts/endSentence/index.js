import { sentences } from "../../utils/sentences";

export const endSentence = (score) => {
  if (score >= 0) {
    const { venom } = sentences;
    if (score < 3) {
      return venom.low;
    } else if ((score >= 3) & (score < 6)) {
      return venom.medium;
    } else {
      return venom.ultra;
    }
  } else {
    const { carnage } = sentences;
    if (score > -3) {
      return carnage.low;
    } else if ((score <= -3) & (score >= -6)) {
      return carnage.medium;
    } else {
      return carnage.ultra;
    }
  }
};
