import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { VoidFunctionComponent } from "react";

type Animal = {
    name: string,
    _id: number,
    breed: string,
    image: string
}
type CreateAnimal = {
    name: string,
    breed: string,
    image: string
}
type AnimalsResponse = Animal[]

const compareAnimalsByBreed = (a: Animal, b: Animal) => {
    if (a.breed < b.breed) {
        return -1;
    }
    if (a.breed > b.breed) {
        return 1;
    }
    return 0;
}

export const animalsApi = createApi({
    reducerPath: "animalsApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3006/" }),
    tagTypes: ['animals'],
    endpoints: (builder) => ({
        getAnimals: builder.query<AnimalsResponse, string>({
            query: (name) => name,
            transformResponse: (res: Animal[]) => res.sort(compareAnimalsByBreed),
            providesTags: ['animals'],
        }),
        createAnimal: builder.mutation<void, CreateAnimal>({
            query: (animal) => ({
                url: `animals/new`,
                method: 'POST',
                body: animal,
            }),
            invalidatesTags: ['animals'],
        }),
        deleteAnimal: builder.mutation<void, number>({
            query: (id) => ({
                url: `animals/delete/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['animals'],
        }),
    }),
});

export const { useGetAnimalsQuery, useCreateAnimalMutation, useDeleteAnimalMutation} = animalsApi