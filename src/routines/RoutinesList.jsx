import { Link } from "react-router";

export default function RoutinesList({ routines }) {
  return (
    <ul>
      {routines.map((routine) => (
        <RoutineItem key={routine.id} routine={routine} />
      ))}
    </ul>
  );
}

function RoutineItem({ routine }) {
  return (
    <li>
      <Link to={`/routines/${routine.id}`}>{routine.name}</Link>
    </li>
  );
}
