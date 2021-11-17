

const sqlRegex = new RegExp(/\;|\[|\]|\*|\(|\)|\^|\||\'|ALTER|CREATE|DELETE|DROP|EXEC|INSERT|INTO|MERGE|SELECT|UPDATE|UNION|ALL/)

export const sqlInjectionFilter = (text) => {
    return !sqlRegex.test(text)
}