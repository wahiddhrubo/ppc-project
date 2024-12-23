import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <div className="flex p-10 bg-white gap-2">
      <div className="w-fit ml-auto">
        <Link className="p-5" to={"/"}>
          <span className="after:hover:scale-x-100 after:scale-x-0 after:hover:transition-transform after:hover:origin-top-left after:hover:ease-in-out after:hover:duration-150 after:content-[''] relative after:absolute after:bottom-[-2px] after:w-full  after:left-0 after:h-[2px] after:bg-black  pb-2 border-black">
            Form
          </span>
        </Link>
        <Link className="p-5 " to={"/machines"}>
          <span className="after:hover:scale-x-100 after:scale-x-0 after:hover:transition-transform after:hover:origin-top-left after:hover:ease-in-out after:hover:duration-150 after:content-[''] relative after:absolute after:bottom-[-2px] after:w-full  after:left-0 after:h-[2px] after:bg-black  pb-2 border-black">
            Machines
          </span>
        </Link>
      </div>
    </div>
  );
}
