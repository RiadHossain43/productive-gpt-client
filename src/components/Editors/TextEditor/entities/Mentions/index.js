import Mention from "./Mention"
import { mentionStrategy } from "./mentionStrategy"
export const mentionDecorator = {
  strategy: mentionStrategy,
  component: Mention,
}