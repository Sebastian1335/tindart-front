import { Tldraw } from 'tldraw'
import 'tldraw/tldraw.css'
import './Whiteboard.css'

export const Whiteboard = () => {
  return (
    <div className="whiteboard-container">
      <h1 className="watermark">Made with TLDRAW</h1>

      <div className="tldraw-wrapper">
        <Tldraw />
      </div>
    </div>
  )
}