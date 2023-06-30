import { useEffect, useContext, useCallback, useRef } from "react";
import { TextEditorContext } from "../../Context";
import MentionSuggestions from "./Suggestions/Index";
export default function Mention(props) {
  let mentionInputRef = useRef(null);
  let {
    editorRef,
    mentionSuggestions,
    updateComputedPosForMentionSuggestions,
    handleMentionSelect,
  } = useContext(TextEditorContext);
  const computeStylePos = useCallback(() => {
    const editorRect = editorRef.current?.editor?.getBoundingClientRect();
    let leftSpace =
      editorRect.width - mentionInputRef.current.offsetLeft < 240
        ? mentionInputRef.current.offsetLeft - 230
        : mentionInputRef.current.offsetLeft;
    return {
      left: leftSpace,
      top: mentionInputRef.current.offsetTop,
      display: "block",
    };
  }, []);
  const hideSuggestions = useCallback(() => {
    return {
      display: "none",
    };
  }, []);
  useEffect(() => {
    if (mentionInputRef.current)
      updateComputedPosForMentionSuggestions(computeStylePos());
  }, []);
  function retriveEntityData() {
    if (!props.entityKey) return null;
    const entity = props.contentState.getEntity(props.entityKey);
    return { ...entity?.getData() };
  }
  return (
    <>
      {retriveEntityData() ? (
        <a
          href={"/admin/users/" + retriveEntityData()._id}
          className="text-primary"
        >
          {retriveEntityData().name}
        </a>
      ) : (
        <span ref={mentionInputRef} className="">
          {props.children}
        </span>
      )}
      <MentionSuggestions
        suggestions={mentionSuggestions.filter((item) =>
          item.name
            .toLowerCase()
            .includes(
              props.decoratedText
                .slice(1, props?.decoratedText?.length)
                .toLowerCase()
            )
        )}
        onSelect={({ name, profileImageSrc, _id }) => {
          let userName = "@" + name.split(" ").join("_");
          handleMentionSelect(
            props.contentState,
            props.blockKey,
            { start: props.start, end: props.end },
            { mention: userName + " ", profileImageSrc, _id, name } // adding a trailing whitespace to create a smooth experience
          );
          updateComputedPosForMentionSuggestions(hideSuggestions());
        }}
      />
    </>
  );
}
