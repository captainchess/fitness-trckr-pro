import { useEffect } from "react";
import { useParams } from "react-router";
import { useState } from "react";
import { getRoutine } from "../api/activities";

export default function RoutinesDetails() {
  // Get the id from useParams
  const { id } = useParams();

  const [ routine, setRoutine ] = useState();

  // fetch the routine from the api using the id as a param
  const syncRoutine = async (id) => {
    const details = await getRoutine(id);
    setRoutine(details);
  };

  useEffect(() => {
    syncRoutine(id);
  }, [id]);

  if (!routine) return <p>Loading...</p>;

  return (
    <>
      <p>Hello Details {routine.name}</p>
      <ul>
        <p>List</p>
        
        {routine.sets.map((set) => (
           <Sets key={set.id} set={set} />
        ))}
      </ul>
    </>
  );
}

function Sets({ set }) {
    return <li>{set.name}</li>
}

/**
 * [
  {
    "id": 85,
    "name": "Chest Day",
    "goal": "to beef up the chest and triceps!",
    "creatorId": 1,
    "creatorName": "Albert",
    "sets": [
      {
        "name": "Incline Dumbbell Hammer Curl",
        "description": "Lie down face up on an incline bench and lift the barbells slowly upward toward chest",
        "activityId": 1,
        "routineId": 85,
        "count": 8,
        "id": 29
      }
    ]
  }
]
 */
