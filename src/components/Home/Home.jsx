import React from 'react';
import HomeBanner from './HomeBanner';
import PopularBooks from './PopularBooks';
import AllBooks from './AllBooks';

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





        </div>
    );
};

export default Home;