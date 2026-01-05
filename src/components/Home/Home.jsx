import React from 'react';
import HomeBanner from './HomeBanner';
import PopularBooks from './PopularBooks';

const Home = () => {
    return (
        <div>
            <section>
                <HomeBanner></HomeBanner>
            </section>

            <section>
                <PopularBooks></PopularBooks>
            </section>





        </div>
    );
};

export default Home;