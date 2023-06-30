import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useProcessing from "../../../hooks/useProcessing";
import USER_ACTIONS from "./actions";
import * as chatheadApi from "../../../services/chatheadService";
export default function useStore(config) {
  const { processing, dispatch: _dispatch } = useProcessing(
    Object.keys(USER_ACTIONS).map((action) => {
      return { action: USER_ACTIONS[action] };
    })
  );

  return {
    processing,
  };
}
