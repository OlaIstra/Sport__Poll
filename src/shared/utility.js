export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    }
}

export const checkValidaty = (value, rules) =>  {
    let isValid = true

    if (!rules) {
        return
    }

    if (rules.required) {
        isValid = value.trim() !== '' && isValid
    }

    if (rules.minLength) {
        isValid = value.length >= rules.minLength && isValid
    }

    if (rules.isEmail) {
        const pattern = /^[.a-z0-9_-]+@[а-яА-Яa-z0-9-]+\.[а-яА-Яa-zA-Z]{2,6}$/i;
        isValid = pattern.test(value) && isValid
    }

    return isValid
}
