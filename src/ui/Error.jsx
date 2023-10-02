import { useNavigate, useRouteError } from "react-router-dom";
import LinkButton from "./LinkButton";

function Error() {
  // const navigate = useNavigate();
  const error = useRouteError();
  console.log(error);

  return (
    <div className="mb-[148px] mt-[100px] flex flex-col items-center justify-center gap-4 ">
      <h1>Sorry, an unexpected error has occured 😢</h1>
      <p>{error.data || error.message}</p>
      <LinkButton to="-1">&larr; Go back</LinkButton>

      {/* <button onClick={() => navigate(-1)}>&larr; Go back</button> */}
    </div>
  );
}

export default Error;
