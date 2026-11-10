import { toast } from "react-toastify";
import CustomToast from "../components/common/CustomToast";

export const citeToast = ({
  title,
  message,
  image,
  type = "info",
}) => {
  return toast(
  ({ closeToast }) => (
      <CustomToast
        title={title}
        message={message}
        image={image}
        type={type}
        closeToast={closeToast}
      />
    ),
    {
      autoClose: 5000,
      closeButton: false,
      hideProgressBar: true,
    }
  );
};