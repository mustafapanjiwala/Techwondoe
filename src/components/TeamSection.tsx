import React, { useCallback, useState, useEffect } from 'react';
import { Button, Link } from 'techwondoe_components';
import team_ribbon from '../assets/team_ribbon.png';
import { client } from '../client';

const TeamSection = () => {
    const [isNavbarLoading, setIsNavbarLoading] = useState<boolean>(false);
    const [navbarTitles, setNavbarTitles] = useState<any[]>([]);

    const cleanupNewsData = useCallback((rawData) => {
        const cleanData = rawData.map((navbar) => {
            const { sys, fields } = navbar;
            const { id } = sys;
            const navbarTitle = fields.subHeading;
            const navbarHeading = fields.heading;
            const navbarDescription = fields.description;
            const image = fields.image.fields.file.url;
            const updatedNavbar = {
                id,
                navbarTitle,
                navbarHeading,
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
                content_type: 'teamSection'
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
        <>
            {navbarTitles.map((items) => {
                return (
                    <section className="relative bg-team text-gray-600 body-font">
                        <img
                            className="absolute -top-14 hidden lg:block"
                            alt="hero_ribbon"
                            style={{ height: '90%' }}
                            src={team_ribbon}
                        />
                        <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center justify-center">
                            <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
                                <img
                                    className="object-cover object-center rounded"
                                    alt="hero"
                                    src={items.image}
                                />
                            </div>
                            <div className="lg:flex md:w-2/5 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left">
                                {/* <h4 className="text-primary font-medium"> */}
                                <Link>{items.navbarTitle}</Link>
                                {/* </h4> */}
                                <h1 className="title-font sm:text-4xl text-3xl mb-4 font-bold text-gray-900 py-3">
                                    {items.navbarHeading}
                                </h1>
                                <p className="mb-8 text-sm leading-relaxed">
                                    {items.navbarDescription}
                                </p>
                                <Button>Learn More</Button>
                            </div>
                        </div>
                    </section>
                );
            })}
        </>
    );
};

export default TeamSection;
