import Layout from "./Layout";
import { ImageGalaryContextProvider } from "./store";

const ImageGalary = ({}) => {
  return (
    <ImageGalaryContextProvider>
      <Layout />
    </ImageGalaryContextProvider>
  );
};

export default ImageGalary;
