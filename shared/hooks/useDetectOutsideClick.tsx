import { useEffect, useRef, useState } from 'react';

const useDetectOutsideClick = (initState: boolean, closeWhenUsed: boolean = false) => {
  const toggleRef = useRef<any>(null); // optional
  const nodeRef = useRef<any>(null); // required
  const secondNodeRef = useRef<any>(null); // optional

  const [show, setShow] = useState(initState);

  const handleClickOutside = (event: any) => {
    //if modal is open and click is outside modal, close it
    if (nodeRef.current &&
      !nodeRef.current.contains(event.target) &&
      (!secondNodeRef.current || !secondNodeRef.current.contains(event.target)) &&
      (!toggleRef.current || !toggleRef.current.contains(event.target))
    ) {
      return setShow(false);
    }
  };

  const handleClickToggle = (event: any) => {
    //if click is on trigger element, toggle modal
    if (toggleRef.current && toggleRef.current.contains(event.target) || nodeRef.current && nodeRef.current.contains(event.target) && closeWhenUsed) {
      return setShow(!show);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside, true);
    document.addEventListener('click', handleClickToggle, true);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside, true);
      document.removeEventListener('click', handleClickToggle, true);
    };
  });

  return {
    toggleRef,
    nodeRef,
    secondNodeRef,
    show,
    setShow
  };
};

export default useDetectOutsideClick;
