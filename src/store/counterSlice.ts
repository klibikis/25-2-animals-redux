import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Animal = {
    breed: string;
};

type Animals = {
    animals: Animal[];
};

let animalsFromLocalStorage = [];
if (localStorage.animals) {
    animalsFromLocalStorage = JSON.parse(localStorage.animals);
} else {
    animalsFromLocalStorage = [];
    localStorage.setItem("animals", JSON.stringify([]));
}

const initialState: Animals = {
    animals: animalsFromLocalStorage,
};

const animalSlice = createSlice({
    name: "animals",
    initialState,
    reducers: {
        addAnimal: (state, action: PayloadAction<string>) => {
            state.animals = [...state.animals, { breed: action.payload }];
        },
        deleteAnimal: (state, action: PayloadAction<string>) => {
            state.animals = state.animals.filter(
                (animal) => animal.breed !== action.payload
            );
        },
        // Use the PayloadAction type to declare the contents of `action.payload`
        saveAnimalsInLocalStorage: (state) => {
            localStorage.setItem("animals", JSON.stringify(state.animals));
        },
        sortAnimals: (state) => {
            function compare(a: Animal, b: Animal) {
                if (a.breed < b.breed) {
                    return -1;
                }
                if (a.breed > b.breed) {
                    return 1;
                }
                return 0;
            }
            state.animals.sort(compare);
        },
    },
});

export const { addAnimal, deleteAnimal, saveAnimalsInLocalStorage, sortAnimals } =
    animalSlice.actions;

export default animalSlice.reducer;
