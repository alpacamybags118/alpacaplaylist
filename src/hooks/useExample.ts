import { useState, useEffect } from 'react';

const useExample = (initialValue: any) => {
    const [value, setValue] = useState(initialValue);

    useEffect(() => {
        // Example side effect
        console.log('Value changed:', value);
    }, [value]);

    const updateValue = (newValue: any) => {
        setValue(newValue);
    };

    return { value, updateValue };
};

export default useExample;