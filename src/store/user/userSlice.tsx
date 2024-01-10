import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"

export interface User {
    id: number,
    name: string,
    username: string,
    email: string,
    address: {
        street: string,
        suite: string,
        city: string,
        zipcode: string,
        geo: {
            lat: string,
            lng: string
        }
    },
    phone: string,
    website: string,
    company: {
        name: string,
        catchPhrase: string,
        bs: string


    }
}

interface UserState {
    users: User[]

}

const initialState: UserState = {
    users: []
}

export const fetchUser = createAsyncThunk("users/fetch", async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/users", {
        method: "GET"
    })
    const data = response.json();
    return data;
})

export const { reducer: userReducer, actions: userActions } = createSlice({
    name: "user",
    initialState,
    reducers: {
        addUsers: (state, action: PayloadAction<User[]>) => {
            state.users = [...state.users, ...action.payload]
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUser.fulfilled, (state, action) => {
            console.log("action.payload", action.payload);

            state.users = action.payload
        })

    },

})


