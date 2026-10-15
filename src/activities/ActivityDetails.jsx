import { useParams } from "react-router";
import { getDetails } from "../api/activities.js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../auth/AuthContext.jsx";
import { deleteActivity } from "../api/activities.js";

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
  const { id } = useParams();
  const { token } = useAuth();
  const [error, setError] = useState(null);
  const [details, setDetails] = useState(id);
  const navigate = useNavigate();

  const tryDelete = async () => {
    setError(null);
    try {
      await deleteActivity(token, id);
      navigate("/activities");
    } catch (e) {
      setError(e.message);
    }
  };

  const syncDetails = async (id) => {
      const details = await getDetails(id);
      setDetails(details);
    };

  useEffect(() => {
    syncDetails(id);
  }, [id]);

  return (
    <section>
      <p><h4>Activity:</h4> {details.name}</p>
      <p><h4>Name:</h4> {details.creatorName}</p>
      <p><h4>Details:</h4> {details.description}</p>
      {token && <button onClick={tryDelete}>Delete</button>}
      {error && <p role="alert">{error}</p>}
    </section>
  );
}
