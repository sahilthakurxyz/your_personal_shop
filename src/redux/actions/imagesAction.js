import { attachTokenToRequests, axiosInstance } from "../../constants";
import {
  imageRequest,
  imageSuccess,
  imageFail,
  getImageRequest,
  getImageSuccess,
  getImageFail,
} from "../reducers/imagesReducer";

export const getImages = () => async (dispatch) => {
  try {
    dispatch(getImageRequest());
    const { data } = await axiosInstance.get(
      `/api/ecommerce/v1/background/images`
    );
    dispatch(getImageSuccess(data?.images));
  } catch (error) {
    dispatch(getImageFail(error.respons?.data.message));
  }
};
export const createImages = (imageData) => async (dispatch) => {
  try {
    attachTokenToRequests();
    dispatch(imageRequest());
    const { data } = await axiosInstance.post(
      `/api/ecommerce/v1/admin/background/images/create/new`,
      imageData
    );
    dispatch(imageSuccess(data && data));
  } catch (error) {
    dispatch(imageFail(error.response?.data.message));
  }
};
