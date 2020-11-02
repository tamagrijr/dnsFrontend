
export const JOIN_CHANNEL = 'slack/submit/JOIN_CHANNEL';

export const loadChannel = (channel) => ({ type: JOIN_CHANNEL, channel });

export const joinChannel = (channel) => async dispatch => {
  dispatch(loadChannel(channel))
  // return {
  //   type: JOIN_CHANNEL,
  //   channel
  // }
}

export default function reducer (state = [], action) {
  switch (action.type){
    case JOIN_CHANNEL: {
      return [...state, action.channel]
    };
    default: return state;
  }
}
