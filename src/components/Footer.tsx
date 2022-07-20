import React, { useCallback, useEffect, useState } from 'react';
import { client } from '../client';

const Footer = () => {
    const [isNavbarLoading, setIsNavbarLoading] = useState<boolean>(false);
    const [navbarTitles, setNavbarTitles] = useState<any[]>([]);

    const cleanupNewsData = useCallback((rawData) => {
        const cleanData = rawData.map((navbar) => {
            const { sys, fields } = navbar;
            const { id } = sys;
            const nav1 = fields.nav1;
            const nav2 = fields.nav2;
            const nav3 = fields.nav3;
            const nav4 = fields.nav4;
            const image = fields.icon.fields.file.url;
            const updatedNavbar = {
                id,
                nav1,
                nav2,
                nav3,
                nav4,
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
                content_type: 'footer'
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
        <footer className="text-gray-600 body-font">
            <div className="container px-10 py-24 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
                {navbarTitles.map((items) => {
                    return (
                        <div className=" flex-shrink-0 md:mx-0 mx-auto text-center md:text-left">
                            <span className="inline-flex lg:ml-10 sm:ml-auto sm:mt-0 mt-2 justify-center sm:justify-start">
                                <a
                                    href="www.google.com"
                                    className="text-gray-500"
                                >
                                    <img src={items.image} alt="icons" />
                                </a>
                            </span>
                        </div>
                    );
                })}

                <div className="flex-grow flex flex-wrap md:pl-20 -mb-10 md:mt-0 mt-10 md:text-left text-center">
                    <div className="lg:w-1/4 md:w-1/2 w-full px-4 flex flex-col justify-between items-center">
                        {navbarTitles.map((items) => {
                            return (
                                <nav className="list-none mb-10">
                                    <li>
                                        <a
                                            href="www.google.com"
                                            className=" hover:text-gray-800"
                                        >
                                            {items.nav1}
                                        </a>
                                    </li>
                                </nav>
                            );
                        })}
                    </div>

                    <div className="lg:w-1/4 md:w-1/2 w-full px-4">
                        {navbarTitles.map((items) => {
                            return (
                                <nav className="list-none mb-10">
                                    <li>
                                        <a
                                            href="www.google.com"
                                            className="text-gray-600 hover:text-gray-800"
                                        >
                                            {items.nav2}
                                        </a>
                                    </li>
                                </nav>
                            );
                        })}
                    </div>

                    <div className="lg:w-1/4 md:w-1/2 w-full px-4">
                        {navbarTitles.map((items) => {
                            return (
                                <nav className="list-none mb-10">
                                    <li>
                                        <a
                                            href="www.google.com"
                                            className="text-gray-600 hover:text-gray-800 underline"
                                        >
                                            {items.nav3}
                                        </a>
                                    </li>
                                </nav>
                            );
                        })}
                    </div>

                    <div className="lg:w-1/4 md:w-1/2 w-full px-4">
                        {navbarTitles.map((items) => {
                            return (
                                <nav className="list-none mb-10">
                                    <li className="text-gray-600 hover:text-gray-800">
                                        {items.nav4}
                                    </li>
                                </nav>
                            );
                        })}
                    </div>
                </div>
            </div>
            <div className="bg-gray-100">
                <div className="container mx-auto py-4 px-5 flex justify-center flex-wrap flex-col sm:flex-row">
                    <p className="text-sm text-center sm:text-left">
                        Copyright © 2021 - Beyond Ltd.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
