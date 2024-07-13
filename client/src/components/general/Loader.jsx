import HashLoader  from "react-spinners/HashLoader";

export default function Loader({isLoading}) {
  return (
    <div className="flex justify-center items-center h-[100%] absolute top-0 left-0 w-[100%] z-100 bg-transparent">
        <HashLoader color="#E86464" size={50} loading={isLoading} />
    </div>
  )
}
