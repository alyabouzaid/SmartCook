export const updateRange = (name, value) => {
    if (name === "Calories (kcal)") {
        return {
            type: 'CALORIES_RANGE',
            payload: value
        };
    }else if (name === "Cooking Time (min)") {
        return {
            type: 'TIME_RANGE',
            payload: value
        };
    }else{
        return null;
    }
};
