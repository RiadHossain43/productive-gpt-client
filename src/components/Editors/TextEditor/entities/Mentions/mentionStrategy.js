import { findWithRegex } from "../utils/findWithRegex";
const HANDLE_REGEX = /\B@\w+/g;
/**
 *
 * @param {*} contentBlock - draft js sends a contentBlock to handle state
 * @param {*} callback - draft js sends a callback to handle state
 * @param {*} contentState - this draft js  parameter is not utilised at the minit
 */
export function mentionStrategy(contentBlock, callback, contentState) {
  findWithRegex(HANDLE_REGEX, contentBlock, callback);
}
