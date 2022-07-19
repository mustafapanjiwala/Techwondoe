import React, { useState, useEffect, useCallback } from 'react';
import { Card } from 'techwondoe_components';
import { client } from '../client';

const WhyChooseUs = () => {
    const [isCardLoading, setIsCardLoading] = useState<boolean>(false);
    const [cardTitles, setCardTitles] = useState<any[]>([]);

    const cleanupCardData = useCallback((rawData) => {
        const cleanData = rawData.map((title) => {
            const { sys, fields } = title;
            const { id } = sys;
            const cardTitle = fields.title;
            const cardDescription = fields.description;
            const updatedCard = {
                id,
                cardTitle,
                cardDescription
            };
            return updatedCard;
        });
        setCardTitles(cleanData);
    }, []);
    const getCardData = useCallback(async () => {
        setIsCardLoading(true);
        try {
            const response = await client.getEntries({
                content_type: 'whyChooseUs'
            });
            const responseData = response.items;
            if (responseData) {
                cleanupCardData(responseData);
            } else {
                setCardTitles([]);
            }
            setIsCardLoading(false);
        } catch (error) {
            console.log(error);
            setIsCardLoading(false);
        }
    }, [cleanupCardData]);

    useEffect(() => {
        getCardData();
    }, [getCardData]);

    return (
        <section className="text-gray-600 body-font">
            <div className="container px-5 py-24 mx-auto">
                <h1 className="sm:text-3xl text-2xl font-medium title-font text-center text-gray-900">
                    Why choose us?
                </h1>
                <h3 className="lg:text-lg lg:w-1/2  mt-5 mx-auto sm:text-3xl font-sm title-font text-center text-gray-900 mb-20">
                    We have decades of experience, having successfully recruited
                    across the globle for many years.
                </h3>
                <div className="flex flex-wrap justify-center lg:px-30 md:px-20 sm:-m-4 -mx-4 -mb-10 -mt-4 md:space-y-0 space-y-6">
                    {cardTitles.map((items) => {
                        return (
                            <div className="p-4 md:w-1/3 flex" key={items.id}>
                                <Card paragraph="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Enim vulputate aliquam arcu .">
                                    {items.cardTitle}
                                </Card>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;
