import React, { useState, useEffect } from 'react';

export default function useFilterWideRange(initialValue) {
  const {
    practiceAll,
    practiceSections,
    practiceTags,
    quizAll,
    quizSections,
    quizTags,
  } = initialValue;

  //   For changing tabs between practice & quiz
  const [tab, setTab] = useState(0);
  //   For changing between dropdown items eg:popular trending etc..
  const [tagId, setTagId] = useState(0);
  //   For getting data for respective tabs eg: Data under practice tab
  const [sectionData, setSectionData] = useState([]);
  //   data for dropdown
  const [tagData, setTagData] = useState([]);
  //   Which section name is selected eg: SSC  test is selected under practice tab
  const [sectionName, setSectionName] = useState('All');

  //   How many cards will be shown at last, after filtering
  const [cardData, setCardData] = useState([]);

  //--------------------------------------------------------------

  //   When Tabs practice/quiz are changing, then respective section data, dropdown data & the cards data are getting populated
  useEffect(() => {
    if (
      practiceAll !== undefined &&
      practiceSections !== undefined &&
      practiceTags !== undefined &&
      quizAll !== undefined &&
      quizSections !== undefined &&
      quizTags !== undefined
    ) {
      setSectionName('All');
      setTagId(0);
      if (tab === 0) {
        setSectionData(practiceSections);
        setTagData(practiceTags);
        setCardData(practiceAll);
      }
      if (tab === 1) {
        setSectionData(quizSections);
        setTagData(quizTags);
        setCardData(quizAll);
      }
    }
  }, [tab]);

  //---------------------------------------------------------------

  // This useEffect is for changing sections under particular tabs, eg: selecting All under practice tab or Test  or SSC etc.. and then populating with ultimate card data we are getting
  useEffect(() => {
    if (
      practiceAll !== undefined &&
      practiceSections !== undefined &&
      practiceTags !== undefined &&
      quizAll !== undefined &&
      quizSections !== undefined &&
      quizTags !== undefined
    ) {
      if (sectionName === 'All' && tab === 0) {
        return setCardData(practiceAll);
      }

      if (sectionName === 'All' && tab === 1) {
        return setCardData(quizAll);
      }

      let findData =
        sectionData.length === 0
          ? practiceSections.find((el) => el.sectionName === sectionName)
          : sectionData.find((el) => el.sectionName === sectionName);
      setCardData(
        findData.home_page_wide_range_practice_lists
          ? findData.home_page_wide_range_practice_lists
          : findData.home_page_wide_range_quiz_lists
      );
    }
  }, [sectionName, sectionData]);

  //-----------------------------------------------------------------

  //   This useEffect is for changing Dropdown tags, on inital render if the tag array is empty then directly we are setting TagId from parameter -- PracticeTag, else we are populating the TagId from tag data if it got loaded
  useEffect(() => {
    if (practiceTags !== undefined) {
      if (!tagId) {
        if (!tagData.length) {
          return setTagId(practiceTags[0].practiceTagId);
        }
        setTagId(
          tagData[0].practiceTagId
            ? tagData[0].practiceTagId
            : tagData[0].quizTagId
        );
      }
    }
  }, [tagId, tagData, practiceTags]);

  //--------------------------------------------------------------------

  // This useffect is for final filtering, suppose All is selected from section data, and then from dropdown we select Trending, then it finnaly populate the card Data
  useEffect(() => {
    if (
      practiceAll !== undefined &&
      quizAll !== undefined &&
      practiceSections !== undefined &&
      quizSections !== undefined
    ) {
      // When first tab --Practice-- is selected and under All is also selected, the  we are filtering from parameter directly --practiceAll--
      if (tab === 0 && sectionName === 'All') {
        let find = practiceAll.filter(
          (el) => el.practiceTagId === parseInt(tagId)
        );
        setCardData(find);
      }

      //   Similarly when second Tab --Quiz-- is selected and under All is selected we are direcly filtering from Parameter --QuizAll--
      if (tab === 1 && sectionName === 'All') {
        let find = quizAll.filter((el) => el.quizTagId === parseInt(tagId));
        setCardData(find);
      }

      // Just vice verca, 1st Tab but not All, then we are finding the section name, and populating the card Data
      if (tab === 0 && sectionName !== 'All') {
        let find = practiceSections.find(
          (el) => el.sectionName === sectionName
        );

        let find2 =
          find !== undefined &&
          find.home_page_wide_range_practice_lists.filter(
            (el) => el.practiceTagId === parseInt(tagId)
          );
        setCardData(find2);
      }

      // Just vice verca, 2nd Tab but not All, then we are finding the section name, and populating the card Data
      if (tab === 1 && sectionName !== 'All') {
        let find = quizSections.find((el) => el.sectionName === sectionName);

        let find2 =
          find !== undefined &&
          find.home_page_wide_range_quiz_lists.filter(
            (el) => el.quizTagId === parseInt(tagId)
          );
        setCardData(find2);
      }
    }
  }, [
    sectionName,
    tab,
    tagId,
    practiceAll,
    quizAll,
    practiceSections,
    quizSections,
  ]);

  //   Finnaly we are returning some properties from our custom hook
  return {
    tab,
    setTab,
    tagId,
    setTagId,
    setSectionName,
    sectionData,
    tagData,
    cardData,
  };
}
