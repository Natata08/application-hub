export const buildNoteDto = (note) => ({
  noteId: note.note_id,
  applicationId: note.application_id,
  content: note.content,
  createdAt: note.created_at,
  updatedAt: note.updated_at,
})
