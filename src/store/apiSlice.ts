import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type Animal = {
    name: string,
    id: number,
    breed: string
}
type AnimalsResponse = Animal[]

export const animalsApi = createApi({
    reducerPath: "animalsApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3006/" }),
    endpoints: (builder) => ({
        getAnimals: builder.query<AnimalsResponse, string>({
            query: (name) => name,
            // providesTags: [animals]
        }),
    }),
});

export const { useGetAnimalsQuery } = animalsApi