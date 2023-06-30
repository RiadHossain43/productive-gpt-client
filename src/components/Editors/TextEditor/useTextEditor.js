import React, { useState, useEffect, useRef } from "react";
import {
  EditorState,
  RichUtils,
  AtomicBlockUtils,
  convertToRaw,
  convertFromRaw,
  ContentState,
  CompositeDecorator,
  Modifier,
  SelectionState,
} from "draft-js";
import { ELEMENT_TYPES } from "./elementTypes";
import { ENTITY_NAME } from "./entities/entityNames";
import { mentionDecorator } from "./entities/Mentions";
import { httpsLinkDecorator } from "./entities/HttpsLink";
import { textLinkDecorator, handleCreateLink } from "./entities/Link";
const compositeDecorator = new CompositeDecorator([
  mentionDecorator,
  httpsLinkDecorator,
  textLinkDecorator,
]);
export const EDIT_MODES = {
  DRAFT_EDITOR: "draft-editor",
  AI_ASSISTANT: "ai-assitant",
};
export default function useTextEditor(config) {
  const editorRef = useRef(null);
  const [editMode, setEditMode] = useState(EDIT_MODES.DRAFT_EDITOR);
  const switchEditMode = (mode) => setEditMode(mode);
  const [editorState, setEditorState] = useState(
    EditorState.createEmpty(compositeDecorator)
  );
  const [aiassistantActive, setAiAssistantActive] = useState(false);
  const [focusedForEditing, setFocusedForEditing] = useState(false);
  const [
    computedPosForMentionSuggestions,
    setComputedPosForMentionSuggestions,
  ] = useState({ display: "none" });
  const updateComputedPosForMentionSuggestions = (position) =>
    setComputedPosForMentionSuggestions(position);
  const activateAiAssistant = () => setAiAssistantActive(true);
  const deactivateAiAssistant = () => setAiAssistantActive(false);
  const toggleAiAssistant = () => setAiAssistantActive((c) => !c);
  const activateEditor = () => setFocusedForEditing(true);
  const deactivateEditor = () => setFocusedForEditing(true);
  /**
   * the following effect block handles if the component is being
   * controlled by outside values.
   */
  useEffect(() => {
    let currentContent;
    try {
      if (typeof config.value === "string") {
        currentContent = JSON.parse(config.value);
      }
      if (typeof config.value === "object") {
        currentContent = config.value;
      }
    } catch (err) {
      console.log(err);
      /**
       * here we are handling if the content parsing failes because if preexisting
       * plain text, we are converting that into a draft data structure for future
       * this is usefull for handling legacy data or automatic migration to draft data
       * structure
       */
      if (typeof config.value === "string")
        return handleEditorStateChange(
          EditorState.createWithContent(
            ContentState.createFromText(config.value)
          )
        );
    }
    if (config.value || currentContent) {
      // EditorState.set(editorState, {
      //   currentContent: convertFromRaw(currentContent),
      //   /**
      //    * following solution is implemented to get the direction map for the editor
      //    * with current content. Draftjs has got an issue with direction map.
      //    * see issue : https://github.com/facebook/draft-js/issues/1820
      //    */
      //   directionMap: EditorState.createWithContent(
      //     convertFromRaw(currentContent)
      //   ).getDirectionMap(),
      // })
      return handleEditorStateChange(
        EditorState.push(
          editorState,
          convertFromRaw(currentContent),
          "change-block-data"
        )
      );
    }
    return handleEditorStateChange(EditorState.createEmpty(compositeDecorator));
  }, []);
  useEffect(() => {
    // console.log(config.value);
    if (!config.value) {
      // console.log("reset", config.value);
      handleEditorStateChange(EditorState.createEmpty(compositeDecorator));
    }
  }, [config.value]);
  const fileInput = useRef(null);
  const _openFilePrompt = () => fileInput.current.click();
  const _createAtomicBlockEntity = (command, data) => {
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      command,
      "IMMUTABLE",
      { ...data }
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(
      editorState,
      { currentContent: contentStateWithEntity },
      "create-entity"
    );
    handleEditorStateChange(
      AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, " ")
    );
  };
  /**
   * this function allows this component user to define own link generator.
   * usefull if someone wants to preprocess a file through a backend before
   * using as am image src or achor href
   * @param {*} metaData
   * @returns {Promise}
   */
  const generateLink = async (metaData) => {
    if (!config.linkGeneratorFn || typeof config.linkGeneratorFn !== "function")
      return null;
    return config.linkGeneratorFn(metaData);
  };
  /**
   * this function updates editors state for the current instance of the component
   * @param {EditorState} editorState
   */
  const handleEditorStateChange = (editorState) => {
    const contentState = editorState.getCurrentContent();
    setEditorState(editorState);
    // console.log(JSON.stringify(convertToRaw(contentState)));
    // check if contentState has text or entity or block data to decide if we should send data to parent component or not to avoid unnecessary re-rendering
    config.onDataStructureChange(JSON.stringify(convertToRaw(contentState)));
  };
  const handleKeyCommand = (command, editorState) => {
    let newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      handleEditorStateChange(newState);
      return "handled";
    }
    return "not-handled";
  };
  const _handleFiles = async (files) => {
    if (!config.handleUpload)
      return console.log("Uploader function not specified");
    let areImages = files.every((file) => file.type.split("/")[0] === "image");
    /** todo: check file size here */
    if (!areImages) return console.log("All files has to be images");
    try {
      let storageInformations = await Promise.all(
        files.map((file) => config.handleUpload(file))
      );
      if (!storageInformations.every((storageInfo) => storageInfo))
        console.log("one or mutiple files don't have storage info");
      storageInformations.map((storageInfo) =>
        _createAtomicBlockEntity(ENTITY_NAME.IMAGE, {
          storageInfo,
        })
      );
    } catch (err) {
      return console.log(err);
    }
  };
  const _handleFileInputChange = (e) => {
    e.preventDefault();
    let files = e.target.files;
    _handleFiles(Array.from(files));
  };
  const getFileInputProps = () => ({
    ref: fileInput,
    onChange: _handleFileInputChange,
  });
  const _atomicEntityController = {
    [ENTITY_NAME.IMAGE]: _openFilePrompt,
    [ENTITY_NAME.LINK]: () =>
      handleEditorStateChange(handleCreateLink(editorState)),
    [ENTITY_NAME.DIVIDER]: () =>
      _createAtomicBlockEntity(ENTITY_NAME.DIVIDER, {}),
    [ENTITY_NAME.AI_ASSISTANT]: () => {
      _createAtomicBlockEntity(ENTITY_NAME.AI_ASSISTANT, {});
    },
    [ENTITY_NAME.CHECKLIST]: () => {
      _createAtomicBlockEntity(ENTITY_NAME.CHECKLIST, {});
    },
  };
  const _buttonHandlers = {
    [ELEMENT_TYPES.INLINE_DEFAULT]: (command) =>
      handleEditorStateChange(
        RichUtils.toggleInlineStyle(editorState, command)
      ),
    [ELEMENT_TYPES.BLOCK_DEFAULT]: (command) =>
      handleEditorStateChange(RichUtils.toggleBlockType(editorState, command)),
    [ELEMENT_TYPES.ATOMIC_ENTITY]: (command) => {
      _atomicEntityController[command]();
    },
  };
  const handleToolClick = (tool, e) => {
    e.preventDefault();
    if (!editorState.getSelection().getHasFocus()) return null;
    if (!tool?.element) return null;
    _buttonHandlers[tool.element](tool.style);
  };
  const handleDroppedFiles = (selection, files) => _handleFiles(files);
  const handlePastedFiles = (files) => _handleFiles(files);
  const handleMentionSelect = (
    contentState,
    blockKey,
    position,
    mentionData
  ) => {
    let selectionState = SelectionState.createEmpty(blockKey);
    let newContentState = contentState.createEntity(
      ENTITY_NAME.MENTION,
      "IMMUTABLE",
      {
        ...mentionData,
      }
    );
    let entityKey = newContentState.getLastCreatedEntityKey();
    newContentState = Modifier.replaceText(
      contentState,
      selectionState.merge({
        // The starting position of the range to be replaced.
        anchorOffset: position.start,
        // The end position of the range to be replaced.
        focusOffset: position.end,
      }),
      mentionData.mention,
      editorState.getCurrentInlineStyle(),
      entityKey
    );
    handleEditorStateChange(
      /**
       * in following solution we had to use moveFocusToEnd() and the force the
       * selecion back to replaced text from  new content through forceSelection().
       * This creates an effect that the cursor is at the end of mentioend name.
       * Draftjs has got an issue with cursor positioning with entity and modifier.
       * see issue : https://github.com/facebook/draft-js/issues/627
       *
       * otherwise expected behaviour is to only do an EditorState.set() to put the
       * mentioned entity in the editor in the identified selection state starting with @.
       */
      EditorState.forceSelection(
        EditorState.moveFocusToEnd(
          EditorState.set(editorState, { currentContent: newContentState })
        ),
        newContentState.getSelectionAfter()
      )
    );
  };
  const forceFocusEditorEnd = (e) => {
    e?.preventDefault && e.preventDefault();
    editorRef.current.editor?.focus();
    handleEditorStateChange(EditorState.moveFocusToEnd(editorState));
  };
  const isToolActive = (tool) => {
    return (
      editorState.getCurrentInlineStyle().has(tool?.style) ||
      editorState
        ?.getCurrentContent()
        .getBlockForKey(editorState?.getSelection().getStartKey())
        .getType() === tool?.style
    );
  };
  return {
    editMode,
    editorRef,
    editorState,
    aiassistantActive,
    computedPosForMentionSuggestions,
    focusedForEditing,
    switchEditMode,
    getFileInputProps,
    generateLink,
    handleDroppedFiles,
    handlePastedFiles,
    handleEditorStateChange,
    handleKeyCommand,
    handleToolClick,
    forceFocusEditorEnd,
    updateComputedPosForMentionSuggestions,
    handleMentionSelect,
    activateEditor,
    deactivateEditor,
    isToolActive,
  };
}
