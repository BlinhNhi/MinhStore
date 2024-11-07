import Banner from "../../../components/Banner/Banner";
import Comment from "../../../components/Comment/Comment";
import Products from "../../../components/Products/Products";
import SliderPage from "../../../components/Slider/Slider";
import TopProduct from "../../../components/TopProduct/TopProduct";
import { dataAdidas } from "../../../utils/data/dataBanner";
import { dataNike } from "../../../utils/data/dataBanner";


import BannerImg from '../../../assets/women/women2.jpg'

function Home() {

    return (
        <div className="bg-gray-100 dark:bg-gray-900 dark:text-white duration-200">
            <SliderPage></SliderPage>
            <Products></Products>
            <TopProduct></TopProduct>
            <Banner dataAdidas={dataAdidas} ></Banner>
            <Banner dataNike={dataNike}></Banner>

            <Comment></Comment>
        </div>
    );
}

export default Home;