// components/organizers/OrganizerDetails.tsx
import { useParams } from "react-router-dom";
import { useAuthFetch } from "../../hooks/useAuthFetch";
import BackButton from "../utils/BackButton";
import Layout from "../Layout";

interface Organizer {
  orgainizer_id: number;
  name: string;
  description: string;
  contact_info: string;
}   

// interface OrganizerDetailsProps {
//   organizer_id: number;
// }

const OrganizerDetails: React.FC = () => {

  const organizer_id = useParams().id;

  const { data: organizer, loading, error } = useAuthFetch<Organizer>(
    `http://localhost:3001/api/organizer/${organizer_id}`
  );
  

  console.log('orggggise id',organizer_id)

  if (loading) return <p>Loading...</p>;
  if (error || !organizer) return <p>Error loading organizer details</p>;

  return (
    <Layout>
    <div>
     
      <BackButton />
      <h2>{organizer.name}</h2>
      <p>{organizer.description}</p>
      <p>Contact: {organizer.contact_info}</p>
    </div>
    </Layout>
  );
};

export default OrganizerDetails;
