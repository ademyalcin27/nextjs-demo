
import connectMongo from '../../util/mongoDbConntection';
import { ObjectId } from 'mongodb';

import MeetupDetail from '../../components/meetups/MeetupDetail';


function MeetupDetails({meetup}) {

    return <MeetupDetail image={meetup.image} title={meetup.title} address={meetup.address} description={meetup.description}/>
}

export async function getServerSideProps(context) {
    const meetupId  = context.params.meetupId;
    const {client , meetupsCollection} = await connectMongo();
    console.log(meetupId)
    const meetup = await meetupsCollection.findOne({_id: ObjectId(meetupId)})
    client.close();
    return {
        props: {
           meetup: {
               title: meetup.title,
               address: meetup.address,
               image: meetup.image,
               description:meetup.description,
           },
        }
    }
}

export default MeetupDetails;