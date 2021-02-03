import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import {  } from 'canvas/canvasSlice';

function useNotes() {
 

  const notesMouseDown = (e) => {};

  const notesMouseMove = (e) => {};

  const notesMouseUp = (e) => {};

  return {
    notesMouseDown,
    notesMouseMove,
    notesMouseUp,
  };
}

export default useNotes;
