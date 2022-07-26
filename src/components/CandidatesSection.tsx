import React, { useCallback, useEffect, useState } from 'react';
import candidate_ribbon from '../assets/candidate_ribbon.png';
import { Link } from 'techwondoe_components';
import { client } from '../client';

const CandidatesSection = () => {
  const [isNavbarLoading, setIsNavbarLoading] = useState<boolean>(false);
  const [navbarTitles, setNavbarTitles] = useState<any[]>([]);
  const [showModal, setShowModal] = React.useState<boolean>(false);
  const [username, setUserName] = React.useState<string>('');
  const [email, setEmail] = React.useState<string>('');
  const [candidateData, setCandidateData] = React.useState<Object[]>(
    JSON.parse(localStorage.getItem('candidateData') || '[]')
  );

  const submitCandidateForm = (event) => {
    localStorage.setItem(
      'candidateData',
      JSON.stringify([...candidateData, { username, email }])
    );
    console.log(localStorage.getItem('candidateData'));
    setCandidateData((currentData) => [...currentData, { username, email }]);
    setUserName('');
    setEmail('');
    setShowModal(false);
    event.preventDefault();
  };

  const cleanupNewsData = useCallback((rawData) => {
    const cleanData = rawData.map((navbar) => {
      const { sys, fields } = navbar;
      const { id } = sys;
      const navbarTitle = fields.title;
      const navbarDescription = fields.description;
      const image = fields.icon.fields.file.url;
      const show = fields.title === 'Candidates';
      const updatedNavbar = {
        id,
        navbarTitle,
        navbarDescription,
        image,
        show
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
              <div
                className="p-4 bg-white lg:w-1/3 md:w-full m-0 lg:m-4 mt-5"
                key={items.id}
              >
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
                    {items.show && (
                      <div className="flex items-center mb-5">
                        <button
                          className="bg-primary text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-10 mb-1 ease-linear transition-all duration-150"
                          type="button"
                          onClick={() => setShowModal(true)}
                        >
                          Form
                        </button>
                        <h1 className="font-bold uppercase">
                          candidate count : {candidateData.length}
                        </h1>
                      </div>
                    )}
                    {showModal ? (
                      <>
                        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                          <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                              {/*header*/}
                              <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                <h3 className="text-3xl font-semibold">Form</h3>

                                <button
                                  className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                  onClick={() => setShowModal(false)}
                                ></button>
                              </div>
                              {/*body*/}
                              <div className="relative p-6 flex-auto ">
                                <form onSubmit={submitCandidateForm}>
                                  <label htmlFor="email">email :</label>
                                  <input
                                    className="shadow appearance-none border rounded mx-5 mb-5 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    type="text"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                  />
                                  <label htmlFor="username">Username :</label>
                                  <input
                                    className="shadow appearance-none border rounded ml-5 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    type="text"
                                    id="username"
                                    value={username}
                                    onChange={(e) =>
                                      setUserName(e.target.value)
                                    }
                                  />
                                  <button
                                    className="bg-primary text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 my-5 ease-linear transition-all duration-150"
                                    type="submit"
                                  >
                                    Save Changes
                                  </button>
                                  <button
                                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                  >
                                    Close
                                  </button>
                                </form>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                      </>
                    ) : null}

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
