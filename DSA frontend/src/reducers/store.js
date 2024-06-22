import { combineReducers } from "@reduxjs/toolkit";
import { Authreducer, DepartmentAuthreducer } from "./reducer";
import { configureStore } from "@reduxjs/toolkit";


const allreducers = combineReducers({
        Authdetails : Authreducer,
        AuthDepartmentdetails : DepartmentAuthreducer
})

export const store = configureStore({
    reducer : allreducers
})