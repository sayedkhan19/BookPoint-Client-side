import React from 'react';
import HomeBanner from './HomeBanner';
import PopularBooks from './PopularBooks';
import AllBooks from './AllBooks';
import WhyChooseUs from './WhyChooseUs';
import HomeCategories from './HomeCategories';
import Newsletter from './Newsletter';

const Home = () => {
    return (
        <div>
            <section>
                <HomeBanner></HomeBanner>
            </section>

            <section>
                <PopularBooks></PopularBooks>
            </section>

            <section>
                <AllBooks></AllBooks>
            </section>

            <section>
                <WhyChooseUs></WhyChooseUs>
            </section>

            <section>
                <HomeCategories></HomeCategories>
            </section>

            <section>
                <Newsletter></Newsletter>
            </section>





        </div>
    );
};

export default Home;