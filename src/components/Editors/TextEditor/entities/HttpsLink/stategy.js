import { findWithRegex } from "../utils/findWithRegex";
const HANDLE_REGEX =
  /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
/**
 *
 * @param {*} contentBlock - draft js sends a contentBlock to handle state
 * @param {*} callback - draft js sends a callback to handle state
 * @param {*} contentState - this draft js  parameter is not utilised at the minit
 */
export function strategy(contentBlock, callback, contentState) {
  findWithRegex(HANDLE_REGEX, contentBlock, callback);
}
