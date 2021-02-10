# Whiteboard app

It's a single page React app with only one route at the moment.

## State

### Canvas
There is [one main state](src/canvas/canvasSlice.js) for all of the items drawable on the canvas

```js
{
  lines: [], // all line drawing and erasing data done by the pen and eraser tools
  items: [], // everything else drawable to the canvas
}
```

All objects in the `items` array will have a `type` property which sets the type of item it will be drawing. (see [layerManager](src/canvas/layerManager.js))

## Drawing

Lines are always placed on the bottom most layer of the canvas like they would be on an actual whiteboard. 
You can **not** select, move, or scale existing lines, they could only be erased or undone.

Lines have a global state and a local state. Global state is stored asynchronously when drawing ends (mouse up) and is used for undo/redo purporses. Local state is use to do the actual drawing.

## Sticky Notes

### creation
- clicking on the tool will start the placement cursor which allows you to set the location of the note
- once a user has selected (by clicking) a location, a modal will appear to allow user to customize:
  - text, always bold and always centered
  - background color (see [ColorPalette](src/features/note/addNoteModal/index.js))
  - font-size (range between 32 and 128)
- on save, the note data will be moved into a temporary `newNote` state that lives in the `noteSlice`, this is to allow us to animate the note to the final location without messing with the undoable state
- when the animation is complete, the temporary state is cleared and the note data is added to the main canvas items state

### editing
When a user double-clicks on a note it will be copied into a temporary separate state called `activeNote` (see [noteSlice](src/features/note/noteSlice.js)) which will bring up the note modal and allow user to edit the selected note. Saving will update the note using id in the main canvas items state. Both Saving and cancelling will clear the `activeNote` state.

## Text
