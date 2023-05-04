import './SideDrawer.css';
import { createPortal } from 'react-dom';
import { CSSTransition } from 'react-transition-group';

const SideDrawer = ({ children, show, onClick }) => {
  const content = (
    <CSSTransition
      in={show}
      timeout={200}
      classNames="slide-in-left"
      mountOnEnter
      unmountOnExit
    >
      <aside onClick={onClick} className="side-drawer">
        {children}
      </aside>
    </CSSTransition>
  );

  return createPortal(content, document.getElementById('drawer-hook'));
};

export default SideDrawer;
