import { apiClient } from "../../api/apiClient";

export const updateWhiteboard = (whiteboard) =>
  apiClient(`/whiteboard/${whiteboard.id}`, {
    method: "PUT",
    body: JSON.stringify(whiteboard),
  });
