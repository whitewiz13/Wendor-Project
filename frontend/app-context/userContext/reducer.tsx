export const initialState = {
    user: null,
    isLoggedIn: null
};

export function userReducer(state: any, action: any) {
    switch (action.type) {
        case "USER_LOGGED_IN":
            return { ...state, user: action.payload.user, isLoggedIn: true };
        case "USER_LOGGED_OUT":
            localStorage.removeItem("accessToken");
            return { ...state, user: null, isLoggedIn: false };
        default:
            return state;
    }
}