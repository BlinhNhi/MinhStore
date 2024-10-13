import Banner from "../../../components/Banner/Banner";
import Comment from "../../../components/Comment/Comment";
import Products from "../../../components/Products/Products";
import SliderPage from "../../../components/Slider/Slider";
import TopProduct from "../../../components/TopProduct/TopProduct";

function Home() {
    return (
        <div className="bg-gray-100 dark:bg-gray-900 dark:text-white duration-200">
            <SliderPage></SliderPage>
            <Products></Products>
            <TopProduct></TopProduct>
            <Banner></Banner>
            <Comment></Comment>
        </div>
    );
}

export default Home;