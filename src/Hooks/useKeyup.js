  
import {useEffect} from 'react'

export default function useKeyup(key, action) {
  useEffect(() => {
    function onKeyup(e) {
      console.log(e.key)
      if(e.key === key) action();
    };
    document.addEventListener('keyup', onKeyup);
    return () => document.removeEventListener('keyup', onKeyup);
  });
}
