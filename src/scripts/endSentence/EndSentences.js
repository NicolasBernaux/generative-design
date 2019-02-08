import { sentences } from "../../utils/sentences";

/**
 * @return {string}
 */
export default function EndSentence(score, venomVideo, carnageVideo) {
  let result = {};
  if (score >= 0) {
    const { venom } = sentences;
    if (score < 3) {
      result.text = venom.low;
      result.video =  venomVideo;
    } else if ((score >= 3) & (score < 6)) {
      result.text = venom.medium;
      result.video =  venomVideo;
    } else {
      result.text = venom.ultra;
      result.video =  venomVideo;
    }
    result.shareResult = "We are Venom";
  } else {
    const { carnage } = sentences;
    if (score > -3) {
      result.text = carnage.low;
      result.video = carnageVideo;
    } else if ((score <= -3) & (score >= -6)) {
      result.text = carnage.medium;
      result.video = carnageVideo;
    } else {
      result.text = carnage.ultra;
      result.video = carnageVideo;
    }
    result.shareResult = "I am Carnage";
  }
  return result;
};
