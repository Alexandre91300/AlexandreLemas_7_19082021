import Header from "../components/Header"
import Post from "../components/Post"

const Accueil = () => {

    let allPosts = [
        {
            user : 'Ilan',
            date : 1627473139,
            title : 'Titre 1',
            description : 'Eiusmod qui dolore enim ea labore velit proident cupidatat et non amet id ipsum ipsum.',
            image : 'ron.jpeg',
            like : 50,
            comment : 3
        },
        {
            user : 'Celine',
            date : 1627473139,
            title : 'Titre 2',
            description : 'Eiusmod qui dolore enim ea labore velit proident cupidatat et non amet id ipsum ipsum.',
            image : 'adame.jpeg',
            like : 70,
            comment : 50
        },
        {
            user : 'Elliott',
            date : 1627473139,
            title : 'Titre 3',
            description : 'Eiusmod qui dolore enim ea labore velit proident cupidatat et non amet id ipsum ipsum.',
            image : 'ron2.jpeg',
            like : 5630,
            comment : 800
        }
    ]
    return(
        <>
        <Header/>
        <section className='allPost'>
            {
                allPosts.map(e => {
                    return <Post post={e} key={e.user} />
                })
            }
        </section>
        </>
    )
}

export default Accueil