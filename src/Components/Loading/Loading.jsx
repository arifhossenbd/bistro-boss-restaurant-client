import { images } from "../../Constant";

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-screen mx-auto">
      <img src={images.loading} alt="" />
    </div>
  );
};

export default Loading;