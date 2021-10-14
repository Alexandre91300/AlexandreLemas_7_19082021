// Combien de secondes se sont écoulé depuis la création du commentaire
export const timeConvertor = (timestamp) => {

    const differenceSecond = Math.floor(Date.now() / 1000) - timestamp;
    const differenceDay = Math.floor(differenceSecond / 86400);

    // Affichage du temps écoulé depuis la publication du commentaire
    if (differenceDay === 0 && differenceSecond < 60) {

        return (`${differenceSecond} ${differenceSecond > 1 ? 'secondes' : 'seconde'}`)

    } else if (differenceDay === 0 && differenceSecond < 3600) {

        let time = Math.floor(differenceSecond / 60);

        return (`${time} ${time > 1 ? 'minutes' : 'minute'}`)

    } else if (differenceDay === 0 && differenceSecond >= 3600) {

        let time = Math.floor(differenceSecond / 3600);

        return (`${time} ${time > 1 ? 'heures' : 'heure'}`)

    } else if (differenceDay <= 7) {

        return (`${differenceDay} ${differenceDay > 1 ? 'jours' : 'jour'}`)

    } else if (differenceDay <= 30) {

        let time = Math.floor(differenceDay / 7);

        return (`${time} ${time > 1 ? 'semaines' : 'semaine'}`)

    } else if (differenceDay <= 365) {

        return (`${Math.floor(differenceDay / 30, 417)} mois`)

    } else {
        let time = Math.floor(differenceDay / 365)
        return (`${time} ${time > 1 ? 'ans' : 'an'}`)
    }

};

export const getDate = (timestamp) => {
    let date = new Date(timestamp * 1000);

    date = date.toISOString().split('T')[0].split('-').reverse().join('/')

    return date
}