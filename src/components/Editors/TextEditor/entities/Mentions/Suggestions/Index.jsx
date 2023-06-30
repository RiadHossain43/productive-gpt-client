import { TextEditorContext } from "../../../Context";
import { useContext } from "react";
import Entry from "./Entry";
export default function MentionSuggestions({ suggestions, ...rest }) {
  let { computedPosForMentionSuggestions } = useContext(TextEditorContext);
  return (
    <>
      {suggestions.length ? (
        <div
          className="mention-suggestions position-absolute mt-4 p-2 shadow-md"
          style={{ ...computedPosForMentionSuggestions }}
        >
          {suggestions.map((suggestion, index) => {
            return (
              <Entry key={suggestion.name + index} {...suggestion} {...rest} />
            );
          })}
        </div>
      ) : null}
    </>
  );
}
