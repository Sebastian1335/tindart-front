import { useAuthStore } from "../../../../Auth/store/authStore"
import { useWhiteboardStore } from "../../../store/whiteBoardStore"

export const SettingsPopOver = () => {
  const logout = useAuthStore((state) => state.logout)
  const selectWhiteBoard = useWhiteboardStore((state) => state.selectWhiteBoard)
  return (
    <div className="settings-popover">
      <button
        className="logout-btn"
        onClick={() => {
          logout()
          selectWhiteBoard(null)
        }}
      >
        Cerrar sesión
      </button>
    </div>
  )
}
