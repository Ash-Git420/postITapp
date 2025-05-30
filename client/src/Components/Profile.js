import user from "../Images/user.png";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Profile = () => {
  const email = useSelector((state) => state.users.user.email);
  const name = useSelector((state) => state.users.user.name);

  const navigate = useNavigate();

  useEffect(() => {
    if (!email) {
      navigate("/login");
    }
  }, [email]);

  return (
    <div>
      <h1>Profile</h1>
      <img src={user} className="userImage" />
      <p>
        <b>{name}</b>
        <br />
        {email}
      </p>
    </div>
  );
};

export default Profile;
