import { MouseEvent, useEffect, useRef } from 'react'
import { CSSTransition } from 'react-transition-group'
import ReactPortal from './ReactPortal'

function Modal({
    children,
    isOpen,
    handleClose,
}: {
    children: React.ReactNode
    isOpen: boolean
    handleClose: () => void
}) {
    const nodeRef = useRef(null)
    useEffect(() => {
        const closeOnEscapeKey = (e: { key: string }) =>
            e.key === 'Escape' ? handleClose() : null
        document.body.addEventListener('keydown', closeOnEscapeKey)
        return () => {
            document.body.removeEventListener('keydown', closeOnEscapeKey)
        }
    }, [handleClose])

    const handleClickInnerModal = (e: MouseEvent<HTMLDivElement>) => {
        // ModalWrapper로 이벤트 전파 방지
        e.stopPropagation()
    }

    return (
        <ReactPortal wrapperId="react-portal-modal-container">
            <CSSTransition
                in={isOpen}
                timeout={{ entry: 0, exit: 300 }}
                unmountOnExit
                classNames="modal"
                nodeRef={nodeRef}
            >
                <div className="modal" ref={nodeRef} onClick={handleClose}>
                    <button onClick={handleClose} className="close-btn">
                        Close
                    </button>
                    <div
                        className="modal-content"
                        onClick={handleClickInnerModal}
                    >
                        {children}
                    </div>
                </div>
            </CSSTransition>
        </ReactPortal>
    )
}
export default Modal
