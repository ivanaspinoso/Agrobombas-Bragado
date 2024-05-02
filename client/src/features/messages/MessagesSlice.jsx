import { createSlice } from "@reduxjs/toolkit";

const initialMessages = {
  loading: 'idle',
  messages: [],
  queuemess: [],
  sendedmess: [],
};

export const messageSlice = createSlice({
  name: "messages",
  initialState: initialMessages,
  reducers: {
    showmessages: (state) => state,
    allmessages: (state, action) => {
      state.messages = action.payload
    },
    allmessqueued: (state, action) => {
      state.queuemess = action.payload
    },
    allmesssended: (state, action) => {
      state.sendedmess = action.payload
    },
    addmessage: (state, action) => {
      state.messages.push(action.payload);
    },
    updatemessage: (state, action) => {
      const { id, text, inmediate, senddate, sendtime, sended, sendedate, sendedtime, result } = action.payload;
      const ismessageExist = state.messages.filter((message) => message.id === id);

      if (ismessageExist) {
        ismessageExist[0].text = text;
        ismessageExist[0].inmediate = inmediate;
        ismessageExist[0].senddate = senddate;
        ismessageExist[0].sendtime = sendtime;
        ismessageExist[0].sended = sended;
        ismessageExist[0].sendedate = sendedate;
        ismessageExist[0].sendedtime = sendedtime;
        ismessageExist[0].result = result
      }
    },
    deletemessage: (state, action) => {
      const id = action.payload;
      state.messages = state.messages.filter((message) => message.id !== id);
    },
  },
});

export const { showmessages, addmessage, updatemessage, deletemessage, allmessages, allmessqueued, allmesssended } =
messageSlice.actions;

export default messageSlice.reducer;