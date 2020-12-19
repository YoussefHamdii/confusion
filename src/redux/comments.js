import * as ActionTypes from './ActionTypes';

export const Comments = (state = {errMess: null, loading: false, comments:[]}, action) => {
    switch(action.type){
        case ActionTypes.ADD_COMMENTS:
            return {...state, errMess: null, comments: action.payload};

        case ActionTypes.COMMENTS_FAILED:
            return {...state, errmess: action.payload, comments: []}

        case ActionTypes.ADD_COMMENT:
            var comment = action.payload;
            return {...state, errMess: null, comments: state.comments.concat(comment)};

        default: return state;
    }
}