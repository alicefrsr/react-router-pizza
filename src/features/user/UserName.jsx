import { useSelector } from "react-redux";

function UserName() {
  const username = useSelector((state) => state.user.username);
  if (!username) return null;

  return (
    <div className="sm:text-md hidden text-base tracking-wide md:block">
      Welcome, {username}
    </div>
  );
}

export default UserName;
