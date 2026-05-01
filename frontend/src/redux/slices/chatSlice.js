import { createSlice } from '@reduxjs/toolkit';

const chatChannel = new BroadcastChannel('vanguard_chat');

// Helper to get storage key for the current user
const getStorageKey = () => {
  try {
    const auth = JSON.parse(localStorage.getItem('vanguard_auth'));
    const userId = auth?.user?.id || 'guest';
    return `vanguard_messages_${userId}`;
  } catch {
    return 'vanguard_messages_guest';
  }
};

const loadMessages = () => {
  try {
    return JSON.parse(localStorage.getItem(getStorageKey())) || [];
  } catch {
    return [];
  }
};

const initialState = {
  messages: loadMessages()
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addMessage: (state, action) => {
      state.messages.push(action.payload);
      localStorage.setItem(getStorageKey(), JSON.stringify(state.messages));
      chatChannel.postMessage({ type: 'NEW_MESSAGE', payload: action.payload });
    },
    syncMessages: (state, action) => {
      const exists = state.messages.find(m => m.id === action.payload.id);
      if (!exists) {
        state.messages.push(action.payload);
        localStorage.setItem(getStorageKey(), JSON.stringify(state.messages));
      }
    },
    rehydrateChat: (state) => {
      state.messages = loadMessages();
    },
    clearMessages: (state) => {
      state.messages = [];
      localStorage.setItem(getStorageKey(), JSON.stringify([]));
      // WE DO NOT BROADCAST CHAT_CLEARED ANYMORE
      // This ensures the action is local to the current user's dashboard only.
    }
  }
});

export const { addMessage, syncMessages, rehydrateChat, clearMessages } = chatSlice.actions;
export default chatSlice.reducer;
