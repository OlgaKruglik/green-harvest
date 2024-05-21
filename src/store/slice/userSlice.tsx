import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { auth, signUp, singIn, signOut, signInWithGoogle } from '../../firebase';

interface UserCredentials {
email: string;
password: string;
}


interface UserType {
    uid?: string | null;
    email?: string | null;
}
export interface Seed {
    id: string;
    description: string;
    type: string;
    name: string;
    
    image: string;
    rating: string;
    }

interface UserState {
user: UserType | null;
status: 'idle' | 'loading' | 'succeeded' | 'failed';
error: string | null;
}

const initialState: UserState = {
user: null,
status: 'idle',
error: null,
};

export const register = createAsyncThunk(
    'user/register',
    async ({ email, password }: UserCredentials, { rejectWithValue }) => {
    try {
    const userCredential = await signUp(email, password);
    if (!userCredential) {
    throw new Error('User registration failed');
    }
    const userData = {
    uid: userCredential.user.uid,
    email: userCredential.user.email,
    };
    return userData;
    } catch (error: any) {
    return rejectWithValue(error.message);
    }
    }
    );

    export const login = createAsyncThunk(
        'user/login',
        async ({ email, password }: UserCredentials, { rejectWithValue }) => {
        try {
        const userCredential = await singIn(email, password);
        if (userCredential.user.uid && userCredential.user.email) {
        return { uid: userCredential.user.uid, email: userCredential.user.email };
        } else {
        throw new Error('Missing user information');
        }
        } catch (error: any) {
        if (error.code === 'auth/user-not-found') {
        return rejectWithValue('Пользователь не найден.');
        } else if (error.code === 'auth/wrong-password') {
        return rejectWithValue('Неверный пароль.');
        } else {
        return rejectWithValue(error.message);
        }
        }
        }
        );

    export const logout = createAsyncThunk(
    'user/logout',
    async (_, { rejectWithValue }) => {
    try {
    await signOut();
    return null;
    } catch (error: any) {
    return rejectWithValue(error.message);
    }
    }
    );

    export const signInWithGoogleThunk = createAsyncThunk(
        'user/signInWithGoogle',
        async (_, { rejectWithValue }) => {
        try {
        const userCredential = await signInWithGoogle();
        if (!userCredential) {
        throw new Error('Google sign-in failed');
        }
        const userData = {
        uid: userCredential.uid,
        email: userCredential.email,
        };
        return userData;
        } catch (error: any) {
        return rejectWithValue(error.message);
        }
        }
        );


const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
    setUser(state, action: PayloadAction<UserType>) {
    state.user = action.payload;
    },
    removeUser(state) {
    state.user = null;
    },
    updateUser(state, action: PayloadAction<Partial<UserType>>) {
    state.user = { ...state.user, ...action.payload };
    },
    setError(state, action: PayloadAction<string>) {
    state.error = action.payload;
    },
    clearError(state) {
    state.error = null;
    },
},
extraReducers: (builder) => {
    builder
        .addCase(register.pending, (state) => {
        state.status = 'loading';
        state.error = null;
    })
    .addCase(register.fulfilled, (state, action) => {
        state.status = 'succeeded'; 
        state.user = action.payload;
    })
    .addCase(register.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
    })
    .addCase(login.pending, (state) => {
        state.status = 'loading';
        state.error = null;
    })
    .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
    })
    .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
    })
    .addCase(logout.pending, (state) => {
        state.status = 'loading';
        state.error = null;
    })
    .addCase(logout.fulfilled, (state) => {
        state.status = 'succeeded';
        state.user = null;
    })
    .addCase(logout.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
    })
    .addCase(signInWithGoogleThunk.pending, (state) => {
        state.status = 'loading';
        state.error = null;
    })
    .addCase(signInWithGoogleThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
    })
    .addCase(signInWithGoogleThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
    });
},
});

export const { setUser, removeUser, updateUser, setError, clearError } = userSlice.actions;

export default userSlice.reducer;
