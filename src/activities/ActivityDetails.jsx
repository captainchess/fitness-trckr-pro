import { useParams } from "react-router";
import { getDetails } from "../api/activities.js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export default function ActivityDetails() {
  /**
   * 1. useParams to get the activity id
   * 2. Write a function in activities.js to fetch details of activity
   * 3. Write a function here to try gettting details(activity name, description, creator name)
   * 4. Catch any errors...what kind of errors???
   * 5. Display the details on the page
   * 6. Move the delete button to this componenet
   * 7. User should be redirected back to the list after delete is clicked
   */
  const { token } = useAuth();
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const tryDelete = async () => {
    setError(null);
    try {
      await deleteActivity(token, activity.id);
      navigate("/activities");
    } catch (e) {
      setError(e.message);
    }
  };

  const { id } = useParams();
  const [details, setDetails] = useState();

  const syncDetails = async () => {
    const details = await getDetails(id);
    setDetails(details);
  };

  useEffect(() => {
    syncDetails();
  }, [id]);

  return (
    <section>
      <h2>{details.name}</h2>
      <p>{details.description}</p>
      {token && <button onClick={tryDelete}>Delete</button>}
      {error && <p role="alert">{error}</p>}
    </section>
  );
}
