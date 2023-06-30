/**
 * TODO: following piece of codes are unstable and buggy need to 
 * work on these before integration.
 */
import {
  CompositeDecorator,
  EditorState,
  Modifier,
} from "draft-js";
import { ENTITY_NAME } from "./entityNames";
const findLinkEntities = (contentBlock, callback, contentState) => {
  contentBlock.findEntityRanges((character) => {
    const entityKey = character.getEntity();
    return (
      entityKey !== null &&
      contentState.getEntity(entityKey).getType() === ENTITY_NAME.LINK
    );
  }, callback);
};
export const textLinkDecorator = {
  strategy: findLinkEntities,
  component: Link,
};
export let createTextLinkDecorator = () =>
  new CompositeDecorator([textLinkDecorator]);
export const handleCreateLink = (editorState) => {
  let link = window.prompt("Paste the link bellow:");
  if (link) {
    let linkText = window.prompt("Paste the link-text below:");
    if (linkText) {
      const currentContent = editorState.getCurrentContent();
      currentContent.createEntity(ENTITY_NAME.LINK, "MUTABLE", {
        href: link,
        linkText,
      });
      let entityKey = currentContent.getLastCreatedEntityKey();
      const selection = editorState.getSelection();
      const contentWithTextLinkEntity = Modifier.replaceText(
        currentContent,
        selection,
        linkText,
        null,
        entityKey
      );
      const newSelectionState = selection.set(
        "anchorOffset",
        selection.getAnchorOffset() + linkText.length
      );
      const editorStateWithTextLinkEntity = EditorState.set(
        editorState,
        {
          currentContent: contentWithTextLinkEntity,
        },
        "create-entity"
      );
      const editorStateWithNewSelection = EditorState.forceSelection(
        editorStateWithTextLinkEntity,
        newSelectionState
      );
      // console.log(
      //   newSelectionState.getAnchorOffset(),
      //   "editor selection anchor offset after link insert:",
      //   editorStateWithNewSelection.getSelection().getAnchorOffset()
      // );
      return editorStateWithNewSelection;
    }
  }
};
export default function Link(props) {
  let data = props.contentState.getEntity(props.entityKey).getData();
  if (!!data.href) {
    return (
      <a
        href={data.href}
        title={data.linkText}
        target="_blank"
        rel="noreferrer"
      >
        {data.linkText || data.href}
      </a>
    );
  }
  return null;
}
