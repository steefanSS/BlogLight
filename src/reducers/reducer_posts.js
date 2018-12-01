/*to manage the state inside of this reducer we will use lodash function
* _.mapKeys*/

import {FETCH_POSTS,FETCH_POST,DELETE_POST} from "../actions";
import _ from 'lodash'

export default function (state={},action) {
    switch (action.type) {

        //we are already returning id so all we need to do is omit post with that particular id
        //state is not copied but created with the omitted post
        case DELETE_POST:
            return _.omit(state, action.payload);

        case FETCH_POST:
            // const post = action.payload.data;
            // const newState = {...state};
            // newState[post.id]=post;
            // return newState;

            return {...state,[action.payload.data.id]: action.payload.data};

        case FETCH_POSTS:
           return _.mapKeys(action.payload.data, 'id');

        default:
           return state;
    }
}