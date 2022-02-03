import { useEffect, useState } from "react";

export default function useAnimationByStateTransition(newAnimationState: boolean|undefined): boolean {
  const [currentAnimationState, setCurrentAnimationState] = useState<boolean|undefined>(newAnimationState);

  const [stateTransition, setStateTransition] = useState<boolean>(false);

  const transitionExists = (): boolean => {
    return (currentAnimationState !== undefined && 
    newAnimationState !== undefined && 
    currentAnimationState !== newAnimationState)
  }

  useEffect(() => {
    if(newAnimationState || transitionExists()) {
        setStateTransition(true);
    }
    setCurrentAnimationState(newAnimationState);

  }, [currentAnimationState, newAnimationState])

  return stateTransition
}