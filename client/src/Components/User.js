import user from "../Images/user.png";
import { useSelector } from "react-redux";
import Location from "./Location.js";

const User = () => {
  const email = useSelector((state) => state.users.user.email);
  const name = useSelector((state) => state.users.user.name);
  return (
    <div>
      <img src={user} alt="" className="userImage" />
      <p>
        {name}
        <br />
        {email}
        <Location />
      </p>
    </div>
  );
};

export default User;
