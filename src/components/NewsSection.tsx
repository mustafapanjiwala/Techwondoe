import React, { useState, useEffect, useCallback } from 'react';
import { Button, Link } from 'techwondoe_components';

import { client } from '../client';

const NewsSection = () => {
    const [isNewsLoading, setIsNewsLoading] = useState<boolean>(false);
    const [newsCards, setNewsCards] = useState<any[]>([]);

    const cleanupNewsData = useCallback((rawData) => {
        const cleanData = rawData.map((card) => {
            const { sys, fields } = card;
            const { id } = sys;
            const cardAuthor = fields.newsAuthor;
            const cardTitle = fields.newsTitle;
            const cardDate = fields.newsDate;
            const cardImage = fields.newsImage.fields.file.url;
            const updatedCard = {
                id,
                cardAuthor,
                cardTitle,
                cardDate,
                cardImage
            };
            return updatedCard;
        });
        setNewsCards(cleanData);
    }, []);

    const getNewsData = useCallback(async () => {
        setIsNewsLoading(true);
        try {
            const response = await client.getEntries({
                content_type: 'newsSection'
            });
            const responseData = response.items;
            if (responseData) {
                cleanupNewsData(responseData);
            } else {
                setNewsCards([]);
            }
            setIsNewsLoading(false);
        } catch (error) {
            console.log(error);
            setIsNewsLoading(false);
        }
    }, [cleanupNewsData]);

    useEffect(() => {
        getNewsData();
    }, [getNewsData]);

    return (
        <>
            <section className="text-gray-600 overflow-hidden body-font">
                <div className="container overflow-hidden px-8 py-24 lg:px-36 ">
                    <div className="flex justify-between py-8">
                        <h4 className="font-bold text-3xl text-gray-900">
                            Latest news
                        </h4>
                        <Button>View All</Button>
                    </div>
                    <div className="flex justify-between flex-wrap -m-4">
                        {newsCards.map((items) => {
                            return (
                                <div className="p-4 md:w-1/4" key={items.id}>
                                    <div className="h-full overflow-hidden">
                                        <img
                                            className="lg:h-48 md:h-36 w-full object-cover object-center"
                                            src={items.cardImage}
                                            alt="news imagesss"
                                        />
                                        <div className="py-6">
                                            <h2 className="tracking-widest text-xs title-font font-semibold mb-1">
                                                {`by ${items.cardAuthor} | ${items.cardDate}`}
                                            </h2>
                                            <h1 className="title-font text-lg font-semibold text-gray-900 mb-3">
                                                {items.cardTitle}
                                            </h1>
                                            <div className="flex items-center flex-wrap ">
                                                <a
                                                    href="www.google.com"
                                                    className="text-primary inline-flex items-center md:mb-2 lg:mb-0 mt-7"
                                                >
                                                    <Link>Read More ➜</Link>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>
        </>
    );
};

export default NewsSection;
