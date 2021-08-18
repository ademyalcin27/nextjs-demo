
import connectMongo from '../util/mongoDbConntection';
import MeetupList from '../components/meetups/MeetupList'
import { DUMMY_MEETUP } from '../constant/dummyData'

function HomePage(props) {
    return <MeetupList meetups={props.meetups}/>
}
// export async function getServerSideProps(context) {
//     const {req, res}  = context;
//     return {
//         props: {
//             meetups: DUMMY_MEETUP
//         }
//     }
// }

export async function getStaticProps() {
    const {client , meetupsCollection} = await connectMongo();
    const meetups = await meetupsCollection.find().toArray();
    client.close();
    return {
        props: {
            meetups: meetups.map(meetup => ({
                title: meetup.title,
                address: meetup.address,
                image: meetup.image,
                id: meetup._id.toString(),
            }))
        },
        revalidate: 1
    }
}

export default HomePage;