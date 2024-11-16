import Banner from "../components/Home/Banner";
import FeatureProducts from "../components/Home/FeatureProducts";
import UserReview from "../components/Home/UserReview";
import Accordion from "../components/Home/Accordion";

const Home = () => {
  return (
    <div>
      <Banner />
      <div className="container mx-auto">
        <div className="my-24">
          <h1 className="mb-16 font-semibold text-center">Feature Products</h1>
          <FeatureProducts />
        </div>
        <div className="my-24">
          <h1 className="mb-16 font-semibold text-center">User Review</h1>
          <UserReview />
        </div>
        <div className="my-24">
          <h1 className="mb-16 font-semibold text-center">
            Frequently Asked Question
          </h1>
          <Accordion />
        </div>
      </div>
    </div>
  );
};

export default Home;
