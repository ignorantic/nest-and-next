import { createWrapper } from 'next-redux-wrapper';
import makeStore, { AppState } from './make-store';

// export an assembled wrapper
export const wrapper = createWrapper<AppState>(makeStore, { debug: false });
