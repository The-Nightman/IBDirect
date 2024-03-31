import { useEffect, useRef, useState } from "react";

type NotesBase = {
  notes: string;
};

type NotesData<T extends NotesBase> = T;

interface NotesProps<T extends NotesBase> {
  parentData: NotesData<T>;
  setParentData: React.Dispatch<React.SetStateAction<NotesData<T>>>;
  ariaLabel: string;
  ariaDescription: string;
  editControls: boolean;
}

const Notes = <T extends NotesBase>({
  parentData,
  setParentData,
  ariaLabel,
  ariaDescription,
  editControls,
}: NotesProps<T>) => {
  const [notes, setNotes] = useState<string>("");
  const [editNotes, setEditNotes] = useState<boolean>(false);
  const notesAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setNotes(parentData.notes);
  }, [parentData.notes]);

  useEffect(() => {
    const notesAreaResize = () => {
      if (notesAreaRef.current) {
        notesAreaRef.current.style.height = "auto";
        notesAreaRef.current.style.height =
          notesAreaRef.current.scrollHeight + "px";
      }
    };

    notesAreaResize();
    notesAreaRef.current?.addEventListener("input", notesAreaResize);

    return () => {
      notesAreaRef.current?.removeEventListener("input", notesAreaResize);
    };
  }, [notes]);

  const handleEditNotes = () => {
    if (editNotes) {
      setNotes(parentData.notes);
    }
    setEditNotes(!editNotes);
  };

  const handleSaveNotes = () => {
    setParentData({ ...parentData, notes: notes });
    setEditNotes(false);
  };

  return (
    <>
      {editControls && (
        <div className="flex justify-between mb-1">
          <button
            className={`rounded-sm px-1 ${
              !editNotes
                ? "bg-zinc-400 hover:bg-zinc-700 active:bg-zinc-500"
                : "bg-red-400 hover:bg-red-700 active:bg-red-500"
            } hover:text-white`}
            onClick={handleEditNotes}
          >
            {editNotes ? "Cancel Edit" : "Edit Notes"}
          </button>
          {editNotes && (
            <button
              className="rounded-sm px-1 bg-blue-400 hover:bg-sky-700 active:bg-sky-500 hover:text-white"
              onClick={handleSaveNotes}
            >
              Save Notes
            </button>
          )}
        </div>
      )}
      <textarea
        disabled={!editNotes}
        aria-label={ariaLabel}
        aria-description={ariaDescription}
        className="w-full resize-none overflow-hidden"
        value={notes}
        ref={notesAreaRef}
        onChange={(e) => setNotes(e.target.value)}
      />
    </>
  );
};

export default Notes;
