import React, { useCallback, useEffect, useState } from 'react';
import candidate_ribbon from '../assets/candidate_ribbon.png';
import { Link } from 'techwondoe_components';
import { client } from '../client';

const CandidatesSection = () => {
    const [isNavbarLoading, setIsNavbarLoading] = useState<boolean>(false);
    const [navbarTitles, setNavbarTitles] = useState<any[]>([]);

    const cleanupNewsData = useCallback((rawData) => {
        const cleanData = rawData.map((navbar) => {
            const { sys, fields } = navbar;
            const { id } = sys;
            const navbarTitle = fields.title;
            const navbarDescription = fields.description;
            const image = fields.icon.fields.file.url;
            const updatedNavbar = {
                id,
                navbarTitle,
                navbarDescription,
                image
            };
            return updatedNavbar;
        });
        setNavbarTitles(cleanData);
    }, []);

    const getNavbarData = useCallback(async () => {
        setIsNavbarLoading(true);
        try {
            const response = await client.getEntries({
                content_type: 'candidates'
            });
            const responseData = response.items;
            if (responseData) {
                cleanupNewsData(responseData);
            } else {
                setNavbarTitles([]);
            }
            setIsNavbarLoading(false);
        } catch (error) {
            console.log(error);
            setIsNavbarLoading(false);
        }
    }, [cleanupNewsData]);

    useEffect(() => {
        getNavbarData();
    }, [getNavbarData]);
    return (
        <section className="overflow-hidden relative text-gray-600 bg-bg_gray body-font">
            <img
                className="absolute z-0 right-0 -bottom-3 hidden lg:block"
                alt="hero_ribbon"
                style={{ height: '90%' }}
                src={candidate_ribbon}
            />
            <div className="relative z-10 container px-10 lg:p-20 py-24 mx-auto flex flex-wrap">
                <div className="flex flex-wrap justify-center -m-4">
                    {navbarTitles.map((items) => {
                        return (
                            <div className="p-4 bg-white lg:w-1/3 md:w-full m-0 lg:m-4 mt-5">
                                <div className="flex px-8 py-6 flex-col justify-around">
                                    <img
                                        alt="icon"
                                        src={items.image}
                                        style={{ height: 60, width: 60 }}
                                    />
                                    <div className="flex-grow">
                                        <h2 className="text-gray-900 text-2xl title-font font-semibold mb-3 py-4">
                                            {items.navbarTitle}
                                        </h2>
                                        <p className="leading-relaxed text-sm">
                                            {items.navbarDescription}
                                        </p>
                                        <a
                                            href="www.google.com"
                                            className=" text-primary inline-flex items-center mt-6"
                                        >
                                            <Link>Learn More</Link>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default CandidatesSection;
