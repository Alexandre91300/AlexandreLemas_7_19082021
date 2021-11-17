

const sqlRegex = new RegExp(/\;|\[|\]|\*|\(|\)|\^|\||\'|ALTER|CREATE|DELETE|DROP|EXEC|INSERT|INTO|MERGE|SELECT|UPDATE|UNION|ALL/)

const sqlInjectionFilter = (text, res) => {

    if (sqlRegex.test(text)) {
        res.status(403).json({ message: "Tentative d'injection SQL !" })
    }
}

exports.sqlInjectionFilter = sqlInjectionFilter;