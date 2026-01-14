import { createContext } from 'react';
import { IWindowManagerContext } from './types';

// TODO: Create special hooks for contexts
/**
 * Window manager context.
 */
export const WindowManagerContext = createContext<IWindowManagerContext>({} as IWindowManagerContext);