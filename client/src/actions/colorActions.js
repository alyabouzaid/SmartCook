export const changeColor = (isDark) => {
    return {
        type: 'COLOR_MODE',
        payload: isDark
    };
};