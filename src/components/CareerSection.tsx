import React, { useCallback, useEffect, useState } from 'react';
import { Button } from 'techwondoe_components';
import { client } from '../client';

const CareerSection = () => {
    const [isNavbarLoading, setIsNavbarLoading] = useState<boolean>(false);
    const [navbarTitles, setNavbarTitles] = useState<any[]>([]);

    const cleanupNewsData = useCallback((rawData) => {
        const cleanData = rawData.map((navbar) => {
            const { sys, fields } = navbar;
            const { id } = sys;
            const navbarTitle = fields.title;
            const button = fields.button;
            const navbarDescription = fields.description;
            const updatedNavbar = {
                id,
                navbarTitle,
                button,
                navbarDescription
            };
            return updatedNavbar;
        });
        setNavbarTitles(cleanData);
    }, []);

    const getNavbarData = useCallback(async () => {
        setIsNavbarLoading(true);
        try {
            const response = await client.getEntries({
                content_type: 'career'
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
        <section className="bg-primary body-font">
            {navbarTitles.map((items) => {
                return (
                    <div
                        className="container px-5 py-24 mx-auto"
                        key={items.id}
                    >
                        <div className="text-center mb-10">
                            <h1 className="sm:text-3xl text-2xl font-medium text-center title-font text-white mb-4">
                                {items.navbarTitle}
                            </h1>
                            <p className="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto text-white">
                                {items.navbarDescription}
                            </p>
                        </div>

                        <Button type="secondary" className="flex mx-auto s">
                            {items.button}
                        </Button>
                    </div>
                );
            })}
        </section>
    );
};

export default CareerSection;
